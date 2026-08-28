import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function ScheduleExamPage() {
  async function submitAction() {
    "use server";
    redirect("/examinations");
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <Link href="/examinations" className="text-secondary hover:text-primary transition-colors flex items-center text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Examinations
        </Link>
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-primary tracking-tight">Schedule Exam</h1>
        <p className="text-sm text-secondary">Create a new assessment and assign it to a program.</p>
      </div>

      <div className="bg-surface border border-border rounded-lg shadow-sm">
        <form action={submitAction} className="p-6 space-y-6">
          
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-primary">Assessment Title</label>
            <Input id="title" name="title" required placeholder="e.g., Mid-Term Mathematics" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="programId" className="text-sm font-medium text-primary">Target Program</label>
              <select id="programId" name="programId" required className="flex h-10 w-full rounded-[10px] border border-border bg-white px-3 py-2 text-sm text-primary ring-offset-canvas file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 transition-all duration-200">
                <option value="">Select program...</option>
                <option value="p1">B.Tech Computer Science (Year 1)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-primary">Subject / Course Code</label>
              <Input id="subject" name="subject" required placeholder="e.g., CS101" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="examDate" className="text-sm font-medium text-primary">Exam Date</label>
              <Input id="examDate" name="examDate" type="date" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="examTime" className="text-sm font-medium text-primary">Time (Duration)</label>
              <Input id="examTime" name="examTime" type="time" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="room" className="text-sm font-medium text-primary">Assigned Room / Hall</label>
            <Input id="room" name="room" placeholder="e.g., Main Hall A" />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-border mt-8">
            <Link href="/examinations">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Schedule Assessment</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
