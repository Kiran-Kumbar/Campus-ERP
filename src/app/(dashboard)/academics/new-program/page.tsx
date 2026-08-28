import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/server/db";
import { campuses } from "@/server/db/schema";
import { createProgramAction } from "@/server/actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewProgramPage() {
  const allCampuses = await db.select().from(campuses);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      
      <div className="flex items-center gap-2">
        <Link href="/academics" className="text-secondary hover:text-primary transition-colors flex items-center text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Academics
        </Link>
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-primary tracking-tight">Add Academic Program</h1>
        <p className="text-sm text-secondary">Define a new course, degree, or grade level.</p>
      </div>

      <div className="bg-surface border border-border rounded-lg shadow-sm">
        <form action={createProgramAction} className="p-6 space-y-6">
          
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-primary">Program Name</label>
            <Input id="name" name="name" required placeholder="e.g., B.Tech Artificial Intelligence" />
          </div>

          <div className="space-y-2">
            <label htmlFor="campusId" className="text-sm font-medium text-primary">Associated Campus</label>
            <select id="campusId" name="campusId" required className="flex h-10 w-full rounded-[10px] border border-border bg-white px-3 py-2 text-sm text-primary ring-offset-canvas file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200">
              <option value="">Select campus...</option>
              {allCampuses.map(campus => (
                <option key={campus.id} value={campus.id}>{campus.name}</option>
              ))}
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-border mt-8">
            <Link href="/academics">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Create Program</Button>
          </div>

        </form>
      </div>
    </div>
  );
}
