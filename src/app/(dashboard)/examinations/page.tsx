"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/data-table";
import { Search, Plus, FileText, CheckCircle2, AlertCircle, X, Award, Printer } from "lucide-react";

interface Assessment {
  id: string;
  name: string;
  program: string;
  date: string;
  status: "Scheduled" | "Grading" | "Published";
  maxMarks: number;
  avgScore: string;
}

const INITIAL_ASSESSMENTS: Assessment[] = [
  { id: "EXM-101", name: "Mid-Term: Mathematics", program: "Grade 10", date: "Oct 15, 2026", status: "Scheduled", maxMarks: 100, avgScore: "--" },
  { id: "EXM-102", name: "Final Project Defense", program: "B.Tech Computer Science", date: "Nov 02, 2026", status: "Scheduled", maxMarks: 100, avgScore: "--" },
  { id: "EXM-103", name: "Unit Test 1: Physics", program: "Grade 10", date: "Aug 20, 2026", status: "Grading", maxMarks: 50, avgScore: "38.5 / 50" },
  { id: "EXM-104", name: "Term 1: Marketing Principles", program: "BBA (Marketing)", date: "Jul 30, 2026", status: "Published", maxMarks: 100, avgScore: "84.2 / 100" },
  { id: "EXM-105", name: "Data Structures Practical Exam", program: "B.Tech Computer Science", date: "Jul 15, 2026", status: "Published", maxMarks: 50, avgScore: "42.0 / 50" }
];

export default function ExaminationsPage() {
  const [assessments, setAssessments] = useState<Assessment[]>(INITIAL_ASSESSMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    program: "Grade 10",
    date: "2026-10-20",
    maxMarks: "100"
  });

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newExm: Assessment = {
      id: `EXM-10${assessments.length + 1}`,
      name: formData.name,
      program: formData.program,
      date: formData.date || "Oct 20, 2026",
      status: "Scheduled",
      maxMarks: parseInt(formData.maxMarks) || 100,
      avgScore: "--"
    };

    setAssessments([newExm, ...assessments]);
    setFormData({ name: "", program: "Grade 10", date: "2026-10-20", maxMarks: "100" });
    setIsScheduleModalOpen(false);
  };

  const handlePublishResults = (id: string) => {
    setAssessments(prev => prev.map(a => a.id === id ? { ...a, status: "Published", avgScore: "86.5 / 100" } : a));
    if (selectedAssessment && selectedAssessment.id === id) {
      setSelectedAssessment(prev => prev ? { ...prev, status: "Published", avgScore: "86.5 / 100" } : null);
    }
  };

  const filteredAssessments = assessments.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Examinations & Grading</h1>
          <p className="text-sm text-secondary">Schedule exams, enter grades, publish results, and generate report cards.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-xs h-9 gap-1.5"><Printer className="w-4 h-4" /> Bulk Report Cards</Button>
          <Button onClick={() => setIsScheduleModalOpen(true)} className="text-xs h-9 gap-1.5 bg-brand text-white hover:bg-brand-hover">
            <Plus className="w-4 h-4" /> Schedule Exam
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border border-border p-5 rounded-[14px] shadow-sm flex items-start space-x-4">
          <div className="p-3 bg-brand/10 text-brand rounded-xl"><FileText className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Upcoming Exams</p>
            <p className="text-2xl font-bold text-primary mt-1">
              {assessments.filter(a => a.status === "Scheduled").length} Scheduled
            </p>
          </div>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[14px] shadow-sm flex items-start space-x-4">
          <div className="p-3 bg-amber-100 text-amber-700 rounded-xl"><AlertCircle className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Grades Pending Entry</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">
              {assessments.filter(a => a.status === "Grading").length} Batches
            </p>
          </div>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[14px] shadow-sm flex items-start space-x-4">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Results Published</p>
            <p className="text-2xl font-bold text-emerald-700 mt-1">
              {assessments.filter(a => a.status === "Published").length} Assessments
            </p>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface border border-border rounded-[14px] shadow-sm overflow-hidden space-y-3">
        <div className="p-4 border-b border-border flex justify-between items-center bg-canvas">
          <h2 className="text-sm font-bold text-primary flex items-center gap-2">
            <Award className="w-4 h-4 text-brand" /> Assessment Schedule & Grade Records
          </h2>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted" />
            <Input 
              type="search" 
              placeholder="Search assessment name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-8 text-xs" 
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-canvas border-b border-border">
              <TableHead className="text-xs font-semibold uppercase">ID & Assessment Name</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Program</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Date Scheduled</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Max Marks</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssessments.map((a) => (
              <TableRow key={a.id} className="hover:bg-canvas/50 transition-colors">
                <TableCell>
                  <div className="font-bold text-primary text-xs">{a.name}</div>
                  <div className="text-[10px] text-muted">{a.id}</div>
                </TableCell>
                <TableCell className="text-xs text-secondary font-medium">{a.program}</TableCell>
                <TableCell className="text-xs text-secondary">{a.date}</TableCell>
                <TableCell className="text-xs font-semibold text-primary">{a.maxMarks} Marks</TableCell>
                <TableCell>
                  <Badge variant={a.status === "Published" ? "success" : a.status === "Grading" ? "warning" : "secondary"} className="text-[10px]">
                    {a.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {a.status === "Grading" && (
                    <Button 
                      size="sm" 
                      onClick={() => handlePublishResults(a.id)}
                      className="bg-brand text-white hover:bg-brand-hover text-xs h-7 px-2.5"
                    >
                      Publish Results
                    </Button>
                  )}
                  {a.status === "Scheduled" && (
                    <Button variant="outline" size="sm" className="text-xs h-7 px-2.5">
                      Manage Exam
                    </Button>
                  )}
                  {a.status === "Published" && (
                    <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-emerald-700 font-semibold">
                      View Results
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* SCHEDULE EXAM MODAL */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-[18px] max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <FileText className="h-5 w-5 text-brand" /> Schedule New Examination
              </h2>
              <button onClick={() => setIsScheduleModalOpen(false)} className="text-muted hover:text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-primary block mb-1">Assessment Name *</label>
                <Input 
                  required 
                  placeholder="e.g. End-Term: Operating Systems" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-9 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-primary block mb-1">Target Program</label>
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full h-9 rounded-md border border-border bg-canvas text-xs px-3 font-medium text-primary focus:outline-none focus:border-brand"
                >
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                  <option value="BBA (Marketing)">BBA (Marketing)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-primary block mb-1">Exam Date</label>
                  <Input 
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-primary block mb-1">Max Marks</label>
                  <Input 
                    placeholder="100" 
                    value={formData.maxMarks}
                    onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setIsScheduleModalOpen(false)} className="h-8 text-xs">
                  Cancel
                </Button>
                <Button type="submit" className="h-8 text-xs bg-brand text-white hover:bg-brand-hover">
                  Schedule Assessment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
