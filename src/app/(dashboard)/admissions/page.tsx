"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/data-table";
import { Search, Filter, Download, Plus } from "lucide-react";

const allApplications = [
  { id: "APP-2026-001", name: "Aarav Mehta", email: "aarav@example.com", program: "B.Tech Computer Science", date: "Aug 26, 2026", status: "Under Review", badge: "warning" as const, action: "Review" },
  { id: "APP-2026-002", name: "Riya Nair", email: "riya.n@example.com", program: "BBA (Marketing)", date: "Aug 25, 2026", status: "Docs Missing", badge: "danger" as const, action: "Review" },
  { id: "APP-2026-003", name: "Kabir Malhotra", email: "kabir.m@example.com", program: "Grade 10", date: "Aug 24, 2026", status: "Offer Accepted", badge: "success" as const, action: "Convert to Student", actionColor: "text-brand" },
  { id: "APP-2026-004", name: "Ananya Sharma", email: "ananya.s@example.com", program: "Grade 9", date: "Aug 22, 2026", status: "Interview Scheduled", badge: "secondary" as const, action: "Review" },
  { id: "APP-2026-005", name: "Vikram Singh", email: "vikram@example.com", program: "B.Tech Computer Science", date: "Aug 20, 2026", status: "Waitlisted", badge: "secondary" as const, action: "Review" }
];

export default function AdmissionsPage() {
  const [filter, setFilter] = useState<"All Applicants" | "Under Review" | "Waitlisted">("All Applicants");

  const filteredApps = allApplications.filter(app => {
    if (filter === "Under Review") return app.status === "Under Review";
    if (filter === "Waitlisted") return app.status === "Waitlisted";
    return true;
  });

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
          {(["All Applicants", "Under Review", "Waitlisted"] as const).map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                filter === f 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-secondary hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
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
            {filteredApps.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-secondary">No applications found.</TableCell>
              </TableRow>
            ) : (
              filteredApps.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium text-muted">{app.id}</TableCell>
                  <TableCell>
                    <div className="font-medium text-primary">{app.name}</div>
                    <div className="text-xs text-secondary">{app.email}</div>
                  </TableCell>
                  <TableCell>{app.program}</TableCell>
                  <TableCell>{app.date}</TableCell>
                  <TableCell><Badge variant={app.badge}>{app.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className={`font-medium ${app.actionColor || ""}`}>
                      {app.action}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
