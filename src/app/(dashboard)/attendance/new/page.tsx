"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Users, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MOCK_STUDENTS = [
  { id: "1", name: "Aarav Sharma", rollNo: "CS-2026-01" },
  { id: "2", name: "Priya Patel", rollNo: "CS-2026-02" },
  { id: "3", name: "Rohan Gupta", rollNo: "CS-2026-03" },
  { id: "4", name: "Meera Singh", rollNo: "CS-2026-04" },
  { id: "5", name: "Kabir Malhotra", rollNo: "CS-2026-05" },
];

export default function TakeAttendancePage() {
  const router = useRouter();
  const [attendance, setAttendance] = useState<Record<string, boolean>>(
    // Default everyone to present (true)
    MOCK_STUDENTS.reduce((acc, student) => ({ ...acc, [student.id]: true }), {})
  );

  const toggleAttendance = (id: string) => {
    setAttendance((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => router.push("/attendance"), 500);
  };

  const presentCount = Object.values(attendance).filter(Boolean).length;
  const absentCount = MOCK_STUDENTS.length - presentCount;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2">
        <Link href="/attendance" className="text-secondary hover:text-primary transition-colors flex items-center text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Attendance
        </Link>
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-primary tracking-tight">Smart Roster</h1>
        <p className="text-sm text-secondary">Tap a student's card to mark them absent. Defaults to all present.</p>
      </div>

      <div className="bg-surface border border-border rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium text-primary">Date</label>
              <Input id="date" name="date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="space-y-2">
              <label htmlFor="programId" className="text-sm font-medium text-primary">Class / Program</label>
              <select id="programId" name="programId" required className="flex h-10 w-full rounded-[10px] border border-border bg-white px-3 py-2 text-sm text-primary ring-offset-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 transition-all">
                <option value="">Select class...</option>
                <option value="p1">B.Tech Computer Science (Year 1)</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 border-b border-border pb-4 gap-4">
              <h2 className="text-lg font-semibold text-primary">Attendance Grid</h2>
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{presentCount} Present</span>
                </div>
                <div className="flex items-center gap-2 text-danger">
                  <XCircle className="w-4 h-4" />
                  <span>{absentCount} Absent</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {MOCK_STUDENTS.map((student) => {
                const isPresent = attendance[student.id];
                return (
                  <button
                    key={student.id}
                    type="button"
                    onClick={() => toggleAttendance(student.id)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 shadow-sm",
                      isPresent 
                        ? "bg-[#F0FDF4] border-[#86EFAC] hover:bg-[#DCFCE7]" 
                        : "bg-[#FEF2F2] border-[#FCA5A5] hover:bg-[#FEE2E2]"
                    )}
                  >
                    <div>
                      <p className={cn("font-bold text-sm", isPresent ? "text-[#166534]" : "text-[#991B1B]")}>
                        {student.name}
                      </p>
                      <p className={cn("text-xs mt-0.5", isPresent ? "text-[#15803D]" : "text-[#B91C1C]")}>
                        {student.rollNo}
                      </p>
                    </div>
                    {isPresent ? (
                      <CheckCircle2 className="w-6 h-6 text-[#22C55E]" />
                    ) : (
                      <XCircle className="w-6 h-6 text-[#EF4444]" />
                    )}
                  </button>
                );
              })}
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
