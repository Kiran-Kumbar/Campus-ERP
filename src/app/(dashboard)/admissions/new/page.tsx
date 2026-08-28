import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function NewApplicationPage() {
  async function submitAction() {
    "use server";
    redirect("/admissions");
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2">
        <Link href="/admissions" className="text-secondary hover:text-primary transition-colors flex items-center text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Admissions
        </Link>
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-primary tracking-tight">New Application</h1>
        <p className="text-sm text-secondary">Start a new enrollment application for a prospective student.</p>
      </div>

      <div className="bg-surface border border-border rounded-lg shadow-sm">
        <form action={submitAction} className="p-6 space-y-8">
          
          <div>
            <h2 className="text-lg font-semibold text-primary mb-4 border-b border-border pb-2">Applicant Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-primary">First Name</label>
                <Input id="firstName" name="firstName" required placeholder="e.g., Sarah" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-primary">Last Name</label>
                <Input id="lastName" name="lastName" required placeholder="e.g., Connor" />
              </div>
              <div className="space-y-2">
                <label htmlFor="previousSchool" className="text-sm font-medium text-primary">Previous School</label>
                <Input id="previousSchool" name="previousSchool" placeholder="e.g., Westside High" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary mb-4 border-b border-border pb-2">Application Target</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="programId" className="text-sm font-medium text-primary">Target Program</label>
                <select id="programId" name="programId" required className="flex h-10 w-full rounded-[10px] border border-border bg-white px-3 py-2 text-sm text-primary ring-offset-canvas file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 transition-all duration-200">
                  <option value="">Select program...</option>
                  <option value="p1">B.Tech Computer Science</option>
                  <option value="p2">BBA Business Analytics</option>
                  <option value="p3">Grade 11 Science</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-border mt-8">
            <Link href="/admissions">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Submit Application</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
