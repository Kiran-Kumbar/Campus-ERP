"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/data-table";
import { 
  Search, Filter, Download, UserPlus, FileUp, X, CheckCircle2, 
  Mail, Phone, GraduationCap, Calendar, DollarSign, BookOpen 
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  section: string;
  attendance: number;
  status: "Active" | "Graduated" | "Withdrawn";
  feeBalance: string;
  guardianName: string;
  guardianPhone: string;
}

const INITIAL_STUDENTS: Student[] = [
  { id: "STU-10482", name: "Kabir Malhotra", email: "kabir.m@student.edu", phone: "+91 98765 11111", program: "Grade 10", section: "10-A", attendance: 94, status: "Active", feeBalance: "₹0 (Paid)", guardianName: "Rajesh Malhotra", guardianPhone: "+91 98765 00000" },
  { id: "STU-10483", name: "Sneha Verma", email: "sneha.v@student.edu", phone: "+91 98765 22222", program: "B.Tech CS", section: "CSE-2", attendance: 78, status: "Active", feeBalance: "₹12,500 Due", guardianName: "Anita Verma", guardianPhone: "+91 98765 00001" },
  { id: "STU-10484", name: "Rohan Patel", email: "rohan.p@student.edu", phone: "+91 98765 33333", program: "Grade 11", section: "11-Sci", attendance: 62, status: "Active", feeBalance: "₹25,000 Due", guardianName: "Suresh Patel", guardianPhone: "+91 98765 00002" },
  { id: "STU-10485", name: "Meera Singh", email: "meera.s@student.edu", phone: "+91 98765 44444", program: "Grade 9", section: "9-B", attendance: 88, status: "Active", feeBalance: "₹0 (Paid)", guardianName: "Sunita Singh", guardianPhone: "+91 98765 00003" },
  { id: "STU-10486", name: "Aarav Mehta", email: "aarav.m@student.edu", phone: "+91 98765 55555", program: "BBA (Marketing)", section: "BBA-1", attendance: 96, status: "Active", feeBalance: "₹0 (Paid)", guardianName: "Vikram Mehta", guardianPhone: "+91 98765 00004" }
];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("All Programs");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  // Modals & Drawers
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "Grade 10",
    section: "10-A",
    guardianName: "",
    guardianPhone: ""
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newStudent: Student = {
      id: `STU-${10480 + students.length + 1}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "+91 98000 00000",
      program: formData.program,
      section: formData.section || "A",
      attendance: 100,
      status: "Active",
      feeBalance: "₹0 (Paid)",
      guardianName: formData.guardianName || "Parent",
      guardianPhone: formData.guardianPhone || "+91 98000 00001"
    };

    setStudents([newStudent, ...students]);
    setFormData({ name: "", email: "", phone: "", program: "Grade 10", section: "10-A", guardianName: "", guardianPhone: "" });
    setIsAddModalOpen(false);
  };

  const filteredStudents = students.filter((stu) => {
    const matchesSearch = stu.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          stu.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          stu.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProgram = selectedProgram === "All Programs" || stu.program === selectedProgram;
    const matchesStatus = selectedStatus === "All Statuses" || stu.status === selectedStatus;
    return matchesSearch && matchesProgram && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Student Directory</h1>
          <p className="text-sm text-secondary">View and manage enrolled students across all campuses.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-xs h-9 gap-1.5"><Download className="w-4 h-4" /> Export</Button>
          <Button onClick={() => setIsAddModalOpen(true)} className="text-xs h-9 gap-1.5 bg-brand text-white hover:bg-brand-hover">
            <UserPlus className="w-4 h-4" /> Add Student
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-surface border border-border rounded-[14px] p-4 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex space-x-2">
          <select 
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="h-9 rounded-md border border-border bg-canvas px-3 py-1 text-xs font-semibold text-primary focus:border-brand focus:outline-none"
          >
            <option value="All Programs">All Programs</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="B.Tech CS">B.Tech CS</option>
            <option value="BBA (Marketing)">BBA (Marketing)</option>
          </select>

          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-9 rounded-md border border-border bg-canvas px-3 py-1 text-xs font-semibold text-primary focus:border-brand focus:outline-none"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Graduated">Graduated</option>
            <option value="Withdrawn">Withdrawn</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted" />
            <Input 
              type="search" 
              placeholder="Search by name, ID, or phone..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs" 
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface border border-border rounded-[14px] shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-canvas border-b border-border">
              <TableHead className="text-xs font-semibold uppercase">Student ID</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Student Profile</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Program & Section</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Attendance</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Fee Balance</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-secondary text-xs">
                  No matching student records found.
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((stu) => (
                <TableRow 
                  key={stu.id} 
                  className="hover:bg-canvas/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedStudent(stu)}
                >
                  <TableCell className="font-bold text-muted text-xs">{stu.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-xs font-bold text-brand shrink-0">
                        {stu.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-bold text-primary text-xs">{stu.name}</div>
                        <div className="text-[11px] text-secondary">{stu.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-primary">
                    {stu.program} ({stu.section})
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${stu.attendance >= 85 ? "bg-emerald-600" : stu.attendance >= 75 ? "bg-amber-500" : "bg-rose-500"}`} 
                          style={{ width: `${stu.attendance}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-primary">{stu.attendance}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-primary">{stu.feeBalance}</TableCell>
                  <TableCell><Badge variant="success" className="text-[10px]">{stu.status}</Badge></TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedStudent(stu)}
                      className="font-semibold text-brand text-xs h-7 px-2 hover:text-brand-hover"
                    >
                      View Student 360
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ADD STUDENT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-[18px] max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-brand" /> Add New Student
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-muted hover:text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-primary block mb-1">Student Full Name *</label>
                <Input 
                  required 
                  placeholder="e.g. Yash Malhotra" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-9 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-primary block mb-1">Email *</label>
                  <Input 
                    required 
                    type="email"
                    placeholder="yash@student.edu" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-primary block mb-1">Phone</label>
                  <Input 
                    placeholder="+91 98000 00000" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-primary block mb-1">Program</label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full h-9 rounded-md border border-border bg-canvas text-xs px-3 font-medium text-primary focus:outline-none focus:border-brand"
                  >
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="B.Tech CS">B.Tech CS</option>
                    <option value="BBA (Marketing)">BBA (Marketing)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-primary block mb-1">Section</label>
                  <Input 
                    placeholder="10-A" 
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-primary block mb-1">Guardian Name</label>
                  <Input 
                    placeholder="Parent Name" 
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-primary block mb-1">Guardian Phone</label>
                  <Input 
                    placeholder="+91 98000 00001" 
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)} className="h-8 text-xs">
                  Cancel
                </Button>
                <Button type="submit" className="h-8 text-xs bg-brand text-white hover:bg-brand-hover">
                  Enrol Student
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STUDENT 360 SLIDE-OVER DRAWER */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="bg-surface border-l border-border w-full max-w-md h-full p-6 shadow-2xl overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand text-white flex items-center justify-center font-bold text-sm">
                    {selectedStudent.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-muted">{selectedStudent.id}</span>
                    <h2 className="text-lg font-bold text-primary">{selectedStudent.name}</h2>
                  </div>
                </div>
                <button onClick={() => setSelectedStudent(null)} className="text-muted hover:text-primary">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Student 360 Quick Cards */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-canvas border border-border rounded-xl">
                  <span className="text-muted block text-[10px] uppercase font-bold">Attendance</span>
                  <span className="text-lg font-bold text-primary">{selectedStudent.attendance}%</span>
                </div>
                <div className="p-3 bg-canvas border border-border rounded-xl">
                  <span className="text-muted block text-[10px] uppercase font-bold">Fee Status</span>
                  <span className="text-sm font-bold text-emerald-700">{selectedStudent.feeBalance}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-bold text-primary block uppercase tracking-wider">Academic Profile:</span>
                <div className="p-3 bg-canvas border border-border rounded-xl space-y-2">
                  <p className="flex items-center text-primary gap-2 font-medium">
                    <GraduationCap className="h-4 w-4 text-brand" /> Program: {selectedStudent.program} ({selectedStudent.section})
                  </p>
                  <p className="flex items-center text-primary gap-2 font-medium">
                    <Mail className="h-4 w-4 text-brand" /> Email: {selectedStudent.email}
                  </p>
                  <p className="flex items-center text-primary gap-2 font-medium">
                    <Phone className="h-4 w-4 text-brand" /> Student Phone: {selectedStudent.phone}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-bold text-primary block uppercase tracking-wider">Guardian Details:</span>
                <div className="p-3 bg-canvas border border-border rounded-xl space-y-2">
                  <p className="text-primary font-bold">{selectedStudent.guardianName}</p>
                  <p className="flex items-center text-secondary gap-2">
                    <Phone className="h-3.5 w-3.5 text-muted" /> {selectedStudent.guardianPhone}
                  </p>
                </div>
              </div>

            </div>

            <Button variant="ghost" onClick={() => setSelectedStudent(null)} className="w-full text-xs text-secondary">
              Close Student 360
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
