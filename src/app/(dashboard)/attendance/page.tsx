import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/data-table";
import { Search, Plus, CheckCircle, XCircle, Clock } from "lucide-react";

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-primary tracking-tight">Attendance Tracking</h1>
          <p className="text-sm text-secondary">Monitor student and staff daily attendance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><CheckCircle className="w-4 h-4 mr-2" /> Mark All Present</Button>
          <Link href="/attendance/new">
            <Button><Plus className="w-4 h-4 mr-2" /> Take Attendance</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border p-5 rounded-[12px] shadow-sm">
          <p className="text-sm font-medium text-secondary">Today's Overall</p>
          <p className="text-3xl font-semibold text-primary mt-3">93.8%</p>
          <p className="text-xs text-danger mt-2 font-medium">-1.2% from yesterday</p>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[12px] shadow-sm">
          <p className="text-sm font-medium text-secondary">Present</p>
          <p className="text-3xl font-semibold text-success mt-3">1,728</p>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[12px] shadow-sm">
          <p className="text-sm font-medium text-secondary">Absent</p>
          <p className="text-3xl font-semibold text-danger mt-3">82</p>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[12px] shadow-sm">
          <p className="text-sm font-medium text-secondary">Late Arrivals</p>
          <p className="text-3xl font-semibold text-warning mt-3">32</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg shadow-sm">
        <div className="p-4 border-b border-border flex justify-between items-center bg-surface-subtle rounded-t-lg">
          <h2 className="text-lg font-semibold text-primary flex items-center">Attendance Logs - Aug 27, 2026</h2>
          <div className="flex space-x-2">
            <select className="h-9 rounded-md border border-border bg-white px-3 py-1 text-sm text-primary shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand">
              <option>All Programs</option>
              <option>Grade 10</option>
              <option>B.Tech CS</option>
            </select>
            <div className="relative w-48">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted" />
              <Input type="search" placeholder="Search students..." className="pl-9 h-9" />
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Status Today</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium text-primary">Kabir Malhotra</div>
                <div className="text-xs text-secondary">STU-10482</div>
              </TableCell>
              <TableCell>Grade 10</TableCell>
              <TableCell><Badge variant="success">Present</Badge></TableCell>
              <TableCell className="text-secondary text-sm">08:15 AM</TableCell>
              <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium text-primary">Aarav Mehta</div>
                <div className="text-xs text-secondary">STU-10991</div>
              </TableCell>
              <TableCell>B.Tech CS</TableCell>
              <TableCell><Badge variant="danger">Absent</Badge></TableCell>
              <TableCell className="text-secondary text-sm">--</TableCell>
              <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium text-primary">Riya Nair</div>
                <div className="text-xs text-secondary">STU-10311</div>
              </TableCell>
              <TableCell>BBA (Marketing)</TableCell>
              <TableCell><Badge variant="warning">Late</Badge></TableCell>
              <TableCell className="text-secondary text-sm">09:30 AM</TableCell>
              <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

    </div>
  );
}
