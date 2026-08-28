import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/data-table";
import { Search, Filter, Download, Plus, MoreHorizontal } from "lucide-react";

export default function AdmissionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-primary tracking-tight">Admissions Pipeline</h1>
          <p className="text-sm text-secondary">Manage the 2026-27 student intake process.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
          <Link href="/admissions/new">
            <Button><Plus className="w-4 h-4 mr-2" /> New Application</Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border p-5 rounded-[12px] shadow-sm">
          <p className="text-sm font-medium text-secondary">Total Applications</p>
          <p className="text-3xl font-semibold text-primary mt-3">412</p>
          <p className="text-xs text-success mt-2 font-medium">+12% from last year</p>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[12px] shadow-sm">
          <p className="text-sm font-medium text-secondary">Under Review</p>
          <p className="text-3xl font-semibold text-primary mt-3">84</p>
          <p className="text-xs text-muted mt-2 font-medium">12 pending document verification</p>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[12px] shadow-sm">
          <p className="text-sm font-medium text-secondary">Interviews Scheduled</p>
          <p className="text-3xl font-semibold text-primary mt-3">28</p>
          <p className="text-xs text-brand mt-2 font-medium">Next: Today at 2:00 PM</p>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[12px] shadow-sm">
          <p className="text-sm font-medium text-secondary">Offers Accepted</p>
          <p className="text-3xl font-semibold text-primary mt-3">145</p>
          <p className="text-xs text-muted mt-2 font-medium">Target: 300 enrollments</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-surface border border-border rounded-lg p-4 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex space-x-1 bg-[#F1F1EC] p-1 rounded-lg">
          <button className="px-4 py-1.5 text-sm font-medium bg-white text-primary rounded-md shadow-sm">All Applicants</button>
          <button className="px-4 py-1.5 text-sm font-medium text-secondary hover:text-primary">Under Review</button>
          <button className="px-4 py-1.5 text-sm font-medium text-secondary hover:text-primary">Waitlisted</button>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted" />
            <Input type="search" placeholder="Search by name or ID..." className="pl-9 h-9" />
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface border border-border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application ID</TableHead>
              <TableHead>Applicant Name</TableHead>
              <TableHead>Applied For</TableHead>
              <TableHead>Submitted Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-muted">APP-2026-001</TableCell>
              <TableCell>
                <div className="font-medium text-primary">Aarav Mehta</div>
                <div className="text-xs text-secondary">aarav@example.com</div>
              </TableCell>
              <TableCell>B.Tech Computer Science</TableCell>
              <TableCell>Aug 26, 2026</TableCell>
              <TableCell><Badge variant="warning">Under Review</Badge></TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="font-medium">Review</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-muted">APP-2026-002</TableCell>
              <TableCell>
                <div className="font-medium text-primary">Riya Nair</div>
                <div className="text-xs text-secondary">riya.n@example.com</div>
              </TableCell>
              <TableCell>BBA (Marketing)</TableCell>
              <TableCell>Aug 25, 2026</TableCell>
              <TableCell><Badge variant="danger">Docs Missing</Badge></TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="font-medium">Review</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-muted">APP-2026-003</TableCell>
              <TableCell>
                <div className="font-medium text-primary">Kabir Malhotra</div>
                <div className="text-xs text-secondary">kabir.m@example.com</div>
              </TableCell>
              <TableCell>Grade 10</TableCell>
              <TableCell>Aug 24, 2026</TableCell>
              <TableCell><Badge variant="success">Offer Accepted</Badge></TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="font-medium text-brand">Convert to Student</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-muted">APP-2026-004</TableCell>
              <TableCell>
                <div className="font-medium text-primary">Ananya Sharma</div>
                <div className="text-xs text-secondary">ananya.s@example.com</div>
              </TableCell>
              <TableCell>Grade 9</TableCell>
              <TableCell>Aug 22, 2026</TableCell>
              <TableCell><Badge variant="secondary">Interview Scheduled</Badge></TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="font-medium">Review</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
