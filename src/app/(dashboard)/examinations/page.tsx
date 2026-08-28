import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/data-table";
import { Search, Plus, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export default function ExaminationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-primary tracking-tight">Examinations</h1>
          <p className="text-sm text-secondary">Manage grading, report cards, and exam scheduling.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><FileText className="w-4 h-4 mr-2" /> Generate Reports</Button>
          <Link href="/examinations/new">
            <Button><Plus className="w-4 h-4 mr-2" /> Schedule Exam</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border border-border p-5 rounded-[12px] shadow-sm flex items-start space-x-4">
          <div className="p-3 bg-brand/10 text-brand rounded-lg"><FileText className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-secondary">Upcoming Exams</p>
            <p className="text-2xl font-semibold text-primary mt-1">12</p>
          </div>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[12px] shadow-sm flex items-start space-x-4">
          <div className="p-3 bg-warning/10 text-warning rounded-lg"><AlertCircle className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-secondary">Grades Pending</p>
            <p className="text-2xl font-semibold text-primary mt-1">4 Batches</p>
          </div>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[12px] shadow-sm flex items-start space-x-4">
          <div className="p-3 bg-success/10 text-success rounded-lg"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-secondary">Results Published</p>
            <p className="text-2xl font-semibold text-primary mt-1">8</p>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg shadow-sm">
        <div className="p-4 border-b border-border flex justify-between items-center bg-surface-subtle rounded-t-lg">
          <h2 className="text-lg font-semibold text-primary flex items-center">Recent & Upcoming Assessments</h2>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted" />
            <Input type="search" placeholder="Search assessments..." className="pl-9 h-9" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assessment Name</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-primary">Mid-Term: Mathematics</TableCell>
              <TableCell>Grade 10 (ICSE)</TableCell>
              <TableCell>Oct 15, 2026</TableCell>
              <TableCell><Badge variant="secondary">Scheduled</Badge></TableCell>
              <TableCell className="text-right"><Button variant="ghost" size="sm">Manage</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-primary">Final Project Defense</TableCell>
              <TableCell>B.Tech Computer Science</TableCell>
              <TableCell>Nov 02, 2026</TableCell>
              <TableCell><Badge variant="secondary">Scheduled</Badge></TableCell>
              <TableCell className="text-right"><Button variant="ghost" size="sm">Manage</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-primary">Unit Test 1: Physics</TableCell>
              <TableCell>Grade 10 (ICSE)</TableCell>
              <TableCell>Aug 20, 2026</TableCell>
              <TableCell><Badge variant="warning">Grading</Badge></TableCell>
              <TableCell className="text-right"><Button variant="ghost" size="sm" className="text-brand">Enter Grades</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-primary">Term 1: Marketing</TableCell>
              <TableCell>BBA (Marketing)</TableCell>
              <TableCell>Jul 30, 2026</TableCell>
              <TableCell><Badge variant="success">Published</Badge></TableCell>
              <TableCell className="text-right"><Button variant="ghost" size="sm">View Results</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

    </div>
  );
}
