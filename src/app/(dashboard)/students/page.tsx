import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/data-table";
import { Search, Filter, Download, UserPlus, FileUp } from "lucide-react";

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-primary tracking-tight">Student Directory</h1>
          <p className="text-sm text-secondary">View and manage enrolled students across all campuses.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><FileUp className="w-4 h-4 mr-2" /> Import</Button>
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
          <Link href="/students/new">
            <Button><UserPlus className="w-4 h-4 mr-2" /> Add Student</Button>
          </Link>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-surface border border-border rounded-lg p-4 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex space-x-2">
           <select className="h-9 rounded-md border border-border bg-white px-3 py-1 text-sm text-primary shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand">
             <option>All Programs</option>
             <option>Grade 10</option>
             <option>Grade 12</option>
             <option>B.Tech CS</option>
           </select>
           <select className="h-9 rounded-md border border-border bg-white px-3 py-1 text-sm text-primary shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand">
             <option>All Statuses</option>
             <option>Active</option>
             <option>Graduated</option>
             <option>Withdrawn</option>
           </select>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted" />
            <Input type="search" placeholder="Search by name, ID, or phone..." className="pl-9 h-9" />
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface border border-border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Student Profile</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-muted">STU-10482</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-canvas border border-border flex items-center justify-center text-xs font-bold text-primary">KM</div>
                  <div>
                    <div className="font-medium text-primary">Kabir Malhotra</div>
                    <div className="text-xs text-secondary">kabir.m@student.edu</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>Grade 10</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div className="h-full bg-success w-[94%]"></div>
                  </div>
                  <span className="text-xs font-medium text-primary">94%</span>
                </div>
              </TableCell>
              <TableCell><Badge variant="success">Active</Badge></TableCell>
              <TableCell className="text-right">
                <Link href="/students/STU-10482">
                  <Button variant="ghost" size="sm" className="font-medium text-brand">View 360</Button>
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-muted">STU-10483</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-canvas border border-border flex items-center justify-center text-xs font-bold text-primary">SV</div>
                  <div>
                    <div className="font-medium text-primary">Sneha Verma</div>
                    <div className="text-xs text-secondary">sneha.v@student.edu</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>B.Tech CS (Year 2)</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div className="h-full bg-warning w-[78%]"></div>
                  </div>
                  <span className="text-xs font-medium text-primary">78%</span>
                </div>
              </TableCell>
              <TableCell><Badge variant="success">Active</Badge></TableCell>
              <TableCell className="text-right">
                <Link href="/students/STU-10483">
                  <Button variant="ghost" size="sm" className="font-medium text-brand">View 360</Button>
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
