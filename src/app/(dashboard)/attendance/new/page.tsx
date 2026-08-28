import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function TakeAttendancePage() {
  async function submitAction() {
    "use server";
    redirect("/attendance");
  }

  // Dummy students for UI
  const students = [
    { id: "1", name: "Aarav Sharma", rollNo: "CS-2026-01" },
    { id: "2", name: "Priya Patel", rollNo: "CS-2026-02" },
    { id: "3", name: "Rohan Gupta", rollNo: "CS-2026-03" },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2">
        <Link href="/attendance" className="text-secondary hover:text-primary transition-colors flex items-center text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Attendance
        </Link>
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-primary tracking-tight">Record Attendance</h1>
        <p className="text-sm text-secondary">Mark daily attendance for a specific class or section.</p>
      </div>

      <div className="bg-surface border border-border rounded-lg shadow-sm">
        <form action={submitAction} className="p-6 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium text-primary">Date</label>
              <Input id="date" name="date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="space-y-2">
              <label htmlFor="programId" className="text-sm font-medium text-primary">Class / Program</label>
              <select id="programId" name="programId" required className="flex h-10 w-full rounded-[10px] border border-border bg-white px-3 py-2 text-sm text-primary ring-offset-canvas file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 transition-all duration-200">
                <option value="">Select class...</option>
                <option value="p1">B.Tech Computer Science (Year 1)</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
              <h2 className="text-lg font-semibold text-primary">Student Roster</h2>
              <span className="text-sm text-muted flex items-center"><Users className="w-4 h-4 mr-1"/> 3 Students</span>
            </div>
            
            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-canvas">
                  <div>
                    <p className="font-medium text-primary text-sm">{student.name}</p>
                    <p className="text-xs text-muted">{student.rollNo}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name={`attendance_${student.id}`} value="present" defaultChecked className="text-brand focus:ring-brand" />
                      <span className="text-sm font-medium text-primary">Present</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name={`attendance_${student.id}`} value="absent" className="text-danger focus:ring-danger" />
                      <span className="text-sm font-medium text-primary">Absent</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-border mt-8">
            <Link href="/attendance">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Submit Attendance</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
