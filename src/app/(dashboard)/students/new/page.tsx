import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/server/db";
import { campuses, programs } from "@/server/db/schema";
import { createStudentAction } from "@/server/actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewStudentPage() {
  const allCampuses = await db.select().from(campuses);
  const allPrograms = await db.select().from(programs);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      <div className="flex items-center gap-2">
        <Link href="/students" className="text-secondary hover:text-primary transition-colors flex items-center text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Directory
        </Link>
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-primary tracking-tight">Add New Student</h1>
        <p className="text-sm text-secondary">Create a student record and automatically provision their portal access.</p>
      </div>

      <div className="bg-surface border border-border rounded-lg shadow-sm">
        <form action={createStudentAction} className="p-6 space-y-8">
          
          {/* Section 1: Personal Details */}
          <div>
            <h2 className="text-lg font-semibold text-primary mb-4 border-b border-border pb-2">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-primary">First Name</label>
                <Input id="firstName" name="firstName" required placeholder="e.g., Kabir" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-primary">Last Name</label>
                <Input id="lastName" name="lastName" required placeholder="e.g., Malhotra" />
              </div>
              <div className="space-y-2">
                <label htmlFor="dateOfBirth" className="text-sm font-medium text-primary">Date of Birth</label>
                <Input id="dateOfBirth" name="dateOfBirth" type="date" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="gender" className="text-sm font-medium text-primary">Gender</label>
                <select id="gender" name="gender" required className="flex h-10 w-full rounded-[10px] border border-border bg-white px-3 py-2 text-sm text-primary ring-offset-canvas file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200">
                  <option value="">Select gender...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Account & Contact */}
          <div>
            <h2 className="text-lg font-semibold text-primary mb-4 border-b border-border pb-2">Account Setup</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-primary">Student Email</label>
                <Input id="email" name="email" type="email" required placeholder="e.g., student@riverview.edu" />
                <p className="text-xs text-muted">A temporary password will be emailed.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Academic Placement */}
          <div>
            <h2 className="text-lg font-semibold text-primary mb-4 border-b border-border pb-2">Academic Placement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="campusId" className="text-sm font-medium text-primary">Campus</label>
                <select id="campusId" name="campusId" required className="flex h-10 w-full rounded-[10px] border border-border bg-white px-3 py-2 text-sm text-primary ring-offset-canvas file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200">
                  <option value="">Select campus...</option>
                  {allCampuses.map(campus => (
                    <option key={campus.id} value={campus.id}>{campus.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="programId" className="text-sm font-medium text-primary">Program / Grade</label>
                <select id="programId" name="programId" required className="flex h-10 w-full rounded-[10px] border border-border bg-white px-3 py-2 text-sm text-primary ring-offset-canvas file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200">
                  <option value="">Select program...</option>
                  {allPrograms.map(program => (
                    <option key={program.id} value={program.id}>{program.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-border mt-8">
            <Link href="/students">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Create Student</Button>
          </div>

        </form>
      </div>
    </div>
  );
}
