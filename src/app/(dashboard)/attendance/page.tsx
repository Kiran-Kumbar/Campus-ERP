"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/data-table";
import { Search, Plus, CheckCircle, XCircle, Clock, Check, X, Filter, AlertTriangle } from "lucide-react";

interface AttendanceRecord {
  id: string;
  studentId: string;
  name: string;
  program: string;
  status: "Present" | "Absent" | "Late";
  time: string;
}

const INITIAL_LOGS: AttendanceRecord[] = [
  { id: "LOG-01", studentId: "STU-10482", name: "Kabir Malhotra", program: "Grade 10", status: "Present", time: "08:15 AM" },
  { id: "LOG-02", studentId: "STU-10483", name: "Sneha Verma", program: "B.Tech CS", status: "Present", time: "08:22 AM" },
  { id: "LOG-03", studentId: "STU-10484", name: "Rohan Patel", program: "Grade 11", status: "Absent", time: "--" },
  { id: "LOG-04", studentId: "STU-10485", name: "Meera Singh", program: "Grade 9", status: "Late", time: "09:12 AM" },
  { id: "LOG-05", studentId: "STU-10486", name: "Aarav Mehta", program: "BBA (Marketing)", status: "Present", time: "08:30 AM" }
];

export default function AttendancePage() {
  const [logs, setLogs] = useState<AttendanceRecord[]>(INITIAL_LOGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [programFilter, setProgramFilter] = useState("All Programs");
  const [isTakeAttendanceModalOpen, setIsTakeAttendanceModalOpen] = useState(false);

  const toggleStatus = (id: string, newStatus: AttendanceRecord["status"]) => {
    setLogs(prev => prev.map(log => log.id === id ? { 
      ...log, 
      status: newStatus,
      time: newStatus === "Absent" ? "--" : newStatus === "Late" ? "09:15 AM" : "08:30 AM"
    } : log));
  };

  const markAllPresent = () => {
    setLogs(prev => prev.map(log => ({ ...log, status: "Present", time: "08:30 AM" })));
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          log.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProg = programFilter === "All Programs" || log.program === programFilter;
    return matchesSearch && matchesProg;
  });

  const presentCount = logs.filter(l => l.status === "Present").length;
  const absentCount = logs.filter(l => l.status === "Absent").length;
  const lateCount = logs.filter(l => l.status === "Late").length;
  const attendanceRate = Math.round((presentCount / logs.length) * 100);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Attendance Roster</h1>
          <p className="text-sm text-secondary">Monitor student and staff daily attendance logs in real time.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllPresent} className="text-xs h-9 gap-1.5 border-emerald-300 text-emerald-700 hover:bg-emerald-50">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Mark All Present
          </Button>
          <Button onClick={() => setIsTakeAttendanceModalOpen(true)} className="text-xs h-9 gap-1.5 bg-brand text-white hover:bg-brand-hover">
            <Plus className="w-4 h-4" /> Record Roster
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border p-5 rounded-[14px] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Today's Attendance Rate</p>
          <p className="text-2xl font-bold text-primary mt-2">{attendanceRate}%</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">Updated just now</p>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[14px] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Present</p>
          <p className="text-2xl font-bold text-emerald-600 mt-2">{presentCount}</p>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[14px] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Absent</p>
          <p className="text-2xl font-bold text-rose-600 mt-2">{absentCount}</p>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[14px] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Late Arrivals</p>
          <p className="text-2xl font-bold text-amber-600 mt-2">{lateCount}</p>
        </div>
      </div>

      {/* Toolbar & Table */}
      <div className="bg-surface border border-border rounded-[14px] shadow-sm overflow-hidden space-y-3">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between items-center bg-canvas gap-4">
          <h2 className="text-sm font-bold text-primary flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand" /> Attendance Roster Logs — Aug 28, 2026
          </h2>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select 
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="h-8 rounded-md border border-border bg-surface px-3 text-xs font-semibold text-primary focus:border-brand focus:outline-none"
            >
              <option value="All Programs">All Programs</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 9">Grade 9</option>
              <option value="B.Tech CS">B.Tech CS</option>
              <option value="BBA (Marketing)">BBA (Marketing)</option>
            </select>
            
            <div className="relative w-48">
              <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted" />
              <Input 
                type="search" 
                placeholder="Search student..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-8 text-xs" 
              />
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-canvas border-b border-border">
              <TableHead className="text-xs font-semibold uppercase">Student ID & Name</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Program</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Status Today</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Punch Time</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-right">Quick Toggle Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id} className="hover:bg-canvas/50 transition-colors">
                <TableCell>
                  <div className="font-bold text-primary text-xs">{log.name}</div>
                  <div className="text-[10px] text-muted">{log.studentId}</div>
                </TableCell>
                <TableCell className="text-xs text-secondary font-medium">{log.program}</TableCell>
                <TableCell>
                  <Badge variant={log.status === "Present" ? "success" : log.status === "Absent" ? "danger" : "warning"} className="text-[10px]">
                    {log.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-secondary font-mono">{log.time}</TableCell>
                <TableCell className="text-right space-x-1">
                  <Button 
                    size="sm" 
                    variant={log.status === "Present" ? "default" : "outline"}
                    onClick={() => toggleStatus(log.id, "Present")}
                    className={`h-7 text-[11px] px-2 ${log.status === "Present" ? "bg-emerald-600 text-white" : ""}`}
                  >
                    Present
                  </Button>
                  <Button 
                    size="sm" 
                    variant={log.status === "Absent" ? "default" : "outline"}
                    onClick={() => toggleStatus(log.id, "Absent")}
                    className={`h-7 text-[11px] px-2 ${log.status === "Absent" ? "bg-rose-600 text-white" : ""}`}
                  >
                    Absent
                  </Button>
                  <Button 
                    size="sm" 
                    variant={log.status === "Late" ? "default" : "outline"}
                    onClick={() => toggleStatus(log.id, "Late")}
                    className={`h-7 text-[11px] px-2 ${log.status === "Late" ? "bg-amber-600 text-white" : ""}`}
                  >
                    Late
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* TAKE ATTENDANCE MODAL */}
      {isTakeAttendanceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-[18px] max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-brand" /> Record Class Attendance
              </h2>
              <button onClick={() => setIsTakeAttendanceModalOpen(false)} className="text-muted hover:text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-secondary">Class attendance roster is synced with SMS notification trigger to parents.</p>
              
              <div className="p-3 bg-canvas border border-border rounded-xl space-y-2">
                <p className="font-bold text-primary">Class: Grade 10-A (38 Students)</p>
                <p className="text-emerald-700 font-semibold">36 Marked Present · 2 Marked Absent</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <Button variant="outline" onClick={() => setIsTakeAttendanceModalOpen(false)} className="h-8 text-xs">
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    markAllPresent();
                    setIsTakeAttendanceModalOpen(false);
                  }} 
                  className="h-8 text-xs bg-brand text-white hover:bg-brand-hover"
                >
                  Save & Send Parent Alerts
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
