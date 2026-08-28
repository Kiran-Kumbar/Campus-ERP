"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/data-table";
import { Search, Plus, Calendar as CalendarIcon, BookOpen, Clock, X, CheckCircle2, User, FileText, Layers } from "lucide-react";

interface Program {
  id: string;
  name: string;
  department: string;
  hod: string;
  status: "Active" | "Inactive";
  sectionsCount: number;
  totalStudents: number;
  subjects: string[];
}

const INITIAL_PROGRAMS: Program[] = [
  { id: "PRG-01", name: "B.Tech Computer Science", department: "Engineering", hod: "Dr. R. Sharma", status: "Active", sectionsCount: 4, totalStudents: 240, subjects: ["Data Structures", "Operating Systems", "DBMS", "Computer Networks"] },
  { id: "PRG-02", name: "BBA (Marketing)", department: "Business", hod: "Prof. N. Patel", status: "Active", sectionsCount: 2, totalStudents: 120, subjects: ["Principles of Mgmt", "Consumer Behavior", "Digital Marketing", "Business Stats"] },
  { id: "PRG-03", name: "Grade 10 (ICSE)", department: "High School", hod: "Ms. A. Iyer", status: "Active", sectionsCount: 3, totalStudents: 110, subjects: ["Mathematics", "Physics", "Chemistry", "English Literature"] },
  { id: "PRG-04", name: "Grade 11 (Science)", department: "Senior Secondary", hod: "Dr. V. Malhotra", status: "Active", sectionsCount: 2, totalStudents: 90, subjects: ["Physics", "Chemistry", "Mathematics", "Computer Science"] },
  { id: "PRG-05", name: "M.Sc Data Science", department: "Postgraduate", hod: "Dr. S. Kulkarni", status: "Active", sectionsCount: 1, totalStudents: 45, subjects: ["Machine Learning", "Python for Data Analytics", "Big Data Architecture"] }
];

export default function AcademicsPage() {
  const [programs, setPrograms] = useState<Program[]>(INITIAL_PROGRAMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    department: "Engineering",
    hod: "",
    subjects: ""
  });

  const handleAddProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.hod) return;

    const newProg: Program = {
      id: `PRG-0${programs.length + 1}`,
      name: formData.name,
      department: formData.department,
      hod: formData.hod,
      status: "Active",
      sectionsCount: 2,
      totalStudents: 60,
      subjects: formData.subjects ? formData.subjects.split(",").map(s => s.trim()) : ["Core Subject 1", "Core Subject 2"]
    };

    setPrograms([newProg, ...programs]);
    setFormData({ name: "", department: "Engineering", hod: "", subjects: "" });
    setIsAddModalOpen(false);
  };

  const filteredPrograms = programs.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.hod.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Academics & Curriculum</h1>
          <p className="text-sm text-secondary">Manage academic degree programs, departments, syllabi, and section allocations.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-xs h-9 gap-1.5"><CalendarIcon className="w-4 h-4" /> Master Timetable</Button>
          <Button onClick={() => setIsAddModalOpen(true)} className="text-xs h-9 gap-1.5 bg-brand text-white hover:bg-brand-hover">
            <Plus className="w-4 h-4" /> Add Program
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Programs List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-surface border border-border rounded-[14px] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border flex justify-between items-center bg-canvas">
              <h2 className="text-sm font-bold text-primary flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand" /> Academic Programs Directory
              </h2>
              <div className="relative w-48">
                <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted" />
                <Input 
                  type="search" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-8 text-xs" 
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="bg-canvas border-b border-border">
                  <TableHead className="text-xs font-semibold uppercase">Program Name</TableHead>
                  <TableHead className="text-xs font-semibold uppercase">Department</TableHead>
                  <TableHead className="text-xs font-semibold uppercase">HOD</TableHead>
                  <TableHead className="text-xs font-semibold uppercase">Status</TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrograms.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-xs text-secondary">No programs found.</TableCell>
                  </TableRow>
                ) : (
                  filteredPrograms.map((prog) => (
                    <TableRow 
                      key={prog.id}
                      className="hover:bg-canvas/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedProgram(prog)}
                    >
                      <TableCell className="font-bold text-primary text-xs">
                        {prog.name}
                        <div className="text-[10px] text-muted font-normal">{prog.sectionsCount} Sections · {prog.totalStudents} Students</div>
                      </TableCell>
                      <TableCell className="text-xs text-secondary">{prog.department}</TableCell>
                      <TableCell className="text-xs font-medium text-primary">{prog.hod}</TableCell>
                      <TableCell><Badge variant="success" className="text-[10px]">{prog.status}</Badge></TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSelectedProgram(prog)}
                          className="text-xs text-brand font-semibold h-7 px-2"
                        >
                          Manage Program
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Right Col: Timetable Quick View */}
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-[14px] shadow-sm p-5 space-y-4">
            <h2 className="text-sm font-bold text-primary flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand" /> Today's Lecture Schedule
            </h2>
            
            <div className="space-y-3">
              <div className="p-3 rounded-xl border border-border bg-canvas/60 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-brand">09:00 AM - 10:30 AM</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">Ongoing</span>
                </div>
                <p className="text-xs font-bold text-primary">Data Structures & Algorithms</p>
                <p className="text-[11px] text-secondary">Room 402 — B.Tech Computer Science (Sec A)</p>
              </div>

              <div className="p-3 rounded-xl border border-border bg-canvas/60 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-secondary">11:30 AM - 01:00 PM</span>
                  <span className="text-[10px] bg-canvas text-secondary border border-border px-2 py-0.5 rounded font-medium">Upcoming</span>
                </div>
                <p className="text-xs font-bold text-primary">Consumer Behavior & Marketing</p>
                <p className="text-[11px] text-secondary">Room 105 — BBA (Marketing)</p>
              </div>

              <div className="p-3 rounded-xl border border-border bg-canvas/60 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-secondary">02:00 PM - 03:30 PM</span>
                  <span className="text-[10px] bg-canvas text-secondary border border-border px-2 py-0.5 rounded font-medium">Upcoming</span>
                </div>
                <p className="text-xs font-bold text-primary">Physics Lab — Batch B</p>
                <p className="text-[11px] text-secondary">Physics Lab 2 — Grade 11 (Sci)</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ADD PROGRAM MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-[18px] max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Layers className="h-5 w-5 text-brand" /> Add Academic Program
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-muted hover:text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddProgram} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-primary block mb-1">Program Title *</label>
                <Input 
                  required 
                  placeholder="e.g. M.Tech Artificial Intelligence" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-9 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-primary block mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full h-9 rounded-md border border-border bg-canvas text-xs px-3 font-medium text-primary focus:outline-none focus:border-brand"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                    <option value="High School">High School</option>
                    <option value="Senior Secondary">Senior Secondary</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-primary block mb-1">Head of Department *</label>
                  <Input 
                    required 
                    placeholder="e.g. Dr. A. Sen" 
                    value={formData.hod}
                    onChange={(e) => setFormData({ ...formData, hod: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-primary block mb-1">Core Subjects (Comma Separated)</label>
                <Input 
                  placeholder="Neural Networks, Computer Vision, ML Ops" 
                  value={formData.subjects}
                  onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                  className="h-9 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)} className="h-8 text-xs">
                  Cancel
                </Button>
                <Button type="submit" className="h-8 text-xs bg-brand text-white hover:bg-brand-hover">
                  Create Program
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROGRAM DETAIL SLIDE-OVER DRAWER */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="bg-surface border-l border-border w-full max-w-md h-full p-6 shadow-2xl overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted">{selectedProgram.id}</span>
                  <h2 className="text-lg font-bold text-primary">{selectedProgram.name}</h2>
                </div>
                <button onClick={() => setSelectedProgram(null)} className="text-muted hover:text-primary">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-canvas border border-border rounded-xl">
                  <span className="text-muted block text-[10px] uppercase font-bold">Total Enrolled</span>
                  <span className="text-lg font-bold text-primary">{selectedProgram.totalStudents} Students</span>
                </div>
                <div className="p-3 bg-canvas border border-border rounded-xl">
                  <span className="text-muted block text-[10px] uppercase font-bold">Sections</span>
                  <span className="text-lg font-bold text-brand">{selectedProgram.sectionsCount} Active</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-bold text-primary block uppercase tracking-wider">Department HOD:</span>
                <p className="p-3 bg-canvas border border-border rounded-xl text-primary font-bold">
                  {selectedProgram.hod} ({selectedProgram.department})
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-bold text-primary block uppercase tracking-wider">Curriculum & Subjects:</span>
                <div className="p-3 bg-canvas border border-border rounded-xl space-y-1.5">
                  {selectedProgram.subjects.map((sub, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-primary font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand" /> {sub}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <Button variant="ghost" onClick={() => setSelectedProgram(null)} className="w-full text-xs text-secondary">
              Close Program Drawer
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
