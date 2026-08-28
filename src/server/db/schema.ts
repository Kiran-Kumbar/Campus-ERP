import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { randomUUID } from "crypto";

// -----------------------------------------------------------------------------
// CORE DOMAIN: INSTITUTION & ROLES
// -----------------------------------------------------------------------------
export const institutions = sqliteTable("institutions", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  name: text("name").notNull(),
  establishedYear: integer("established_year"),
  status: text("status", { enum: ["active", "inactive"] }).default("active").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

export const campuses = sqliteTable("campuses", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  institutionId: text("institution_id").notNull().references(() => institutions.id),
  name: text("name").notNull(),
  address: text("address"),
  status: text("status", { enum: ["active", "inactive"] }).default("active").notNull(),
});

export const roles = sqliteTable("roles", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  name: text("name").notNull(), // e.g., "Super Admin", "Principal", "Teacher", "Student"
  description: text("description"),
});

export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  roleId: text("role_id").notNull().references(() => roles.id),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  status: text("status", { enum: ["active", "inactive", "suspended"] }).default("active").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

// -----------------------------------------------------------------------------
// CORE DOMAIN: STUDENTS
// -----------------------------------------------------------------------------
export const students = sqliteTable("students", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()), // Student ID / Enrollment Number
  userId: text("user_id").notNull().references(() => users.id),
  campusId: text("campus_id").notNull().references(() => campuses.id),
  dateOfBirth: integer("date_of_birth", { mode: "timestamp" }).notNull(),
  gender: text("gender", { enum: ["male", "female", "other"] }).notNull(),
  status: text("status", { enum: ["Active", "Inactive", "Transferred", "Graduated", "Withdrawn"] }).default("Active").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

export const programs = sqliteTable("programs", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  campusId: text("campus_id").notNull().references(() => campuses.id),
  name: text("name").notNull(), // e.g., "B.Tech Computer Science", "Grade 10"
});

export const studentEnrollments = sqliteTable("student_enrollments", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  studentId: text("student_id").notNull().references(() => students.id),
  programId: text("program_id").notNull().references(() => programs.id),
  academicYear: text("academic_year").notNull(), // e.g., "2026-27"
  status: text("status", { enum: ["active", "completed", "dropped"] }).default("active").notNull(),
  enrolledAt: integer("enrolled_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});
