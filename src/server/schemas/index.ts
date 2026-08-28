import { z } from "zod";

export const institutionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  establishedYear: z.number().int().min(1800).max(new Date().getFullYear()).optional(),
  status: z.enum(["active", "inactive"]).default("active"),
});

export const userSchema = z.object({
  email: z.string().email("Invalid email format"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  roleId: z.string(),
});

export const studentSchema = z.object({
  id: z.string().min(1, "Student ID is required"),
  dateOfBirth: z.date(),
  gender: z.enum(["male", "female", "other"]),
  status: z.enum(["Active", "Inactive", "Transferred", "Graduated", "Withdrawn"]).default("Active"),
  campusId: z.string(),
});
