import { db } from "./index";
import { institutions, campuses, roles, users, students } from "./schema";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("🌱 Seeding database...");

  // 1. Create Institution
  const [institution] = await db.insert(institutions).values({
    name: "Riverview International Academy",
    establishedYear: 1998,
  }).returning();
  console.log(`Created Institution: ${institution.name}`);

  // 2. Create Campus
  const [campus] = await db.insert(campuses).values({
    institutionId: institution.id,
    name: "Main Campus",
    address: "123 Education Blvd",
  }).returning();
  console.log(`Created Campus: ${campus.name}`);

  // 3. Create Roles
  const [adminRole] = await db.insert(roles).values({ name: "Admin" }).returning();
  const [teacherRole] = await db.insert(roles).values({ name: "Teacher" }).returning();
  console.log(`Created Roles: Admin & Teacher`);

  // 4. Create Users (Admin)
  await db.insert(users).values({
    email: "admin@riverview.edu",
    passwordHash: "mock-hash", // In real world use bcrypt
    firstName: "System",
    lastName: "Admin",
    roleId: adminRole.id,
  });
  console.log(`Created Admin User`);

  // 5. Seed Students (Generating 10 dummy students for now)
  const [studentRole] = await db.insert(roles).values({ name: "Student" }).returning();
  
  const dummyStudents = [];
  
  for (let i = 0; i < 10; i++) {
    const [studentUser] = await db.insert(users).values({
      email: `student${i+1}@riverview.edu`,
      passwordHash: "mock-hash",
      firstName: `Student${i + 1}`,
      lastName: "Doe",
      roleId: studentRole.id,
    }).returning();

    dummyStudents.push({
      userId: studentUser.id,
      campusId: campus.id,
      dateOfBirth: new Date(2010, 0, i + 1), // Jan 2010
      gender: (i % 2 === 0 ? "male" : "female") as "male" | "female",
      status: "Active" as const,
    });
  }
  
  await db.insert(students).values(dummyStudents);
  console.log(`Created 10 Students`);

  console.log("✅ Seeding complete!");
}

seed().catch((e) => {
  console.error("❌ Seeding failed!");
  console.error(e);
  process.exit(1);
});
