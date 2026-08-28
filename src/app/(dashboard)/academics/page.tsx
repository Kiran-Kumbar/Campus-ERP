import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/data-table";
import { Search, Plus, Calendar as CalendarIcon, BookOpen, Clock } from "lucide-react";

export default function AcademicsPage() {
  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-primary tracking-tight">Academics</h1>
          <p className="text-sm text-secondary">Manage curriculum, programs, subjects, and timetables.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><CalendarIcon className="w-4 h-4 mr-2" /> View Master Timetable</Button>
          <Link href="/academics/new-program">
            <Button><Plus className="w-4 h-4 mr-2" /> Add Program</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Programs List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-border rounded-lg shadow-sm">
            <div className="p-4 border-b border-border flex justify-between items-center bg-surface-subtle rounded-t-lg">
              <h2 className="text-lg font-semibold text-primary flex items-center"><BookOpen className="w-5 h-5 mr-2 text-secondary" /> Academic Programs</h2>
              <div className="relative w-48">
                <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted" />
                <Input type="search" placeholder="Search..." className="pl-9 h-8 text-xs" />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Program Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Head of Dept</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-primary">B.Tech Computer Science</TableCell>
                  <TableCell>Engineering</TableCell>
                  <TableCell>Dr. R. Sharma</TableCell>
                  <TableCell><Badge variant="success">Active</Badge></TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="sm">Manage</Button></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-primary">BBA (Marketing)</TableCell>
                  <TableCell>Business</TableCell>
                  <TableCell>Prof. N. Patel</TableCell>
                  <TableCell><Badge variant="success">Active</Badge></TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="sm">Manage</Button></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-primary">Grade 10 (ICSE)</TableCell>
                  <TableCell>High School</TableCell>
                  <TableCell>Ms. A. Iyer</TableCell>
                  <TableCell><Badge variant="success">Active</Badge></TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="sm">Manage</Button></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Right Col: Timetable Quick View */}
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-primary mb-4 flex items-center"><Clock className="w-5 h-5 mr-2 text-secondary" /> Today's Schedule</h2>
            
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#E2E8F0] before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-brand text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded border border-border bg-canvas shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-primary text-sm">09:00 AM</div>
                  </div>
                  <div className="text-xs text-primary font-medium">Data Structures</div>
                  <div className="text-[10px] text-secondary">Room 402 - B.Tech CS</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-border bg-surface-subtle text-secondary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                </div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded border border-border bg-canvas shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-primary text-sm">11:30 AM</div>
                  </div>
                  <div className="text-xs text-primary font-medium">Marketing Principles</div>
                  <div className="text-[10px] text-secondary">Room 105 - BBA</div>
                </div>
              </div>
              
            </div>
            
            <Button className="w-full mt-6" variant="outline">Schedule Resource</Button>
          </div>
        </div>

      </div>
    </div>
  );
}
