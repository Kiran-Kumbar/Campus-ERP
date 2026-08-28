"use server";

import { db } from "./db";
import { students, users, programs, studentEnrollments, roles, campuses } from "./db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function createProgramAction(formData: FormData) {
  const name = formData.get("name") as string;
  const campusId = formData.get("campusId") as string;

  if (!name || !campusId) {
    throw new Error("Missing required fields");
  }

  await db.insert(programs).values({
    name,
    campusId,
  });

  revalidatePath("/academics");
  redirect("/academics");
}

export async function createUserAction(formData: FormData) {
  const email = formData.get("email") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const roleId = formData.get("roleId") as string;

  if (!email || !firstName || !lastName || !roleId) {
    throw new Error("Missing required fields");
  }

  await db.insert(users).values({
    email,
    firstName,
    lastName,
    passwordHash: "default-password", // In reality, this would be a secure hash or they'd set it via email
    roleId,
  });

  revalidatePath("/admin");
  redirect("/admin");
}

export async function createStudentAction(formData: FormData) {
  const email = formData.get("email") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const dateOfBirthStr = formData.get("dateOfBirth") as string;
  const gender = formData.get("gender") as "male" | "female" | "other";
  const campusId = formData.get("campusId") as string;
  const programId = formData.get("programId") as string;

  if (!email || !firstName || !lastName || !dateOfBirthStr || !gender || !campusId || !programId) {
    throw new Error("Missing required fields");
  }

  // Find the 'Student' role
  const studentRoles = await db.select().from(roles).where(eq(roles.name, "Student"));
  if (studentRoles.length === 0) {
    throw new Error("Student role not found in the database. Run seed script.");
  }
  const studentRoleId = studentRoles[0].id;

  // 1. Create User
  const [newUser] = await db.insert(users).values({
    email,
    firstName,
    lastName,
    passwordHash: "student-pass",
    roleId: studentRoleId,
  }).returning();

  // 2. Create Student record
  const [newStudent] = await db.insert(students).values({
    userId: newUser.id,
    campusId,
    dateOfBirth: new Date(dateOfBirthStr),
    gender,
    status: "Active",
  }).returning();

  // 3. Create Enrollment
  await db.insert(studentEnrollments).values({
    studentId: newStudent.id,
    programId,
    academicYear: "2026-27",
    status: "active",
  });

  revalidatePath("/students");
  redirect("/students");
}
