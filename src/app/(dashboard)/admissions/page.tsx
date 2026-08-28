"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/data-table";
import { Search, Filter, Download, Plus, X, CheckCircle2, User, FileText, Calendar, Mail, Phone, GraduationCap } from "lucide-react";

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  date: string;
  status: "Under Review" | "Docs Missing" | "Interview Scheduled" | "Offer Extended" | "Offer Accepted" | "Waitlisted";
  gpa: string;
  notes: string;
}

const INITIAL_APPLICATIONS: Application[] = [
  { id: "APP-2026-001", name: "Aarav Mehta", email: "aarav@example.com", phone: "+91 98765 43210", program: "B.Tech Computer Science", date: "Aug 26, 2026", status: "Under Review", gpa: "9.2 / 10", notes: "Strong math background, waiting for physics transcript." },
  { id: "APP-2026-002", name: "Riya Nair", email: "riya.n@example.com", phone: "+91 98123 45678", program: "BBA (Marketing)", date: "Aug 25, 2026", status: "Docs Missing", gpa: "8.5 / 10", notes: "ID proof missing." },
  { id: "APP-2026-003", name: "Kabir Malhotra", email: "kabir.m@example.com", phone: "+91 97654 32109", program: "Grade 10", date: "Aug 24, 2026", status: "Offer Accepted", gpa: "9.5 / 10", notes: "Fee deposit confirmed." },
  { id: "APP-2026-004", name: "Ananya Sharma", email: "ananya.s@example.com", phone: "+91 96543 21098", program: "Grade 9", date: "Aug 22, 2026", status: "Interview Scheduled", gpa: "8.8 / 10", notes: "Interview set for Aug 29 at 2:00 PM." },
  { id: "APP-2026-005", name: "Vikram Singh", email: "vikram@example.com", phone: "+91 95432 10987", program: "B.Tech Computer Science", date: "Aug 20, 2026", status: "Waitlisted", gpa: "8.1 / 10", notes: "High applicant pool capacity." }
];

export default function AdmissionsPage() {
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [filter, setFilter] = useState<string>("All Applicants");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals & Drawers State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // New Application Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "B.Tech Computer Science",
    gpa: "8.5",
    notes: ""
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newApp: Application = {
      id: `APP-2026-00${applications.length + 1}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "+91 98000 00000",
      program: formData.program,
      date: "Today",
      status: "Under Review",
      gpa: formData.gpa ? `${formData.gpa} / 10` : "8.0 / 10",
      notes: formData.notes || "New submission from admissions portal."
    };

    setApplications([newApp, ...applications]);
    setFormData({ name: "", email: "", phone: "", program: "B.Tech Computer Science", gpa: "8.5", notes: "" });
    setIsCreateModalOpen(false);
  };

  const handleStatusChange = (id: string, newStatus: Application["status"]) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesFilter = filter === "All Applicants" || app.status === filter;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.program.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getBadgeVariant = (status: Application["status"]) => {
    switch (status) {
      case "Offer Accepted": return "success";
      case "Under Review": return "warning";
      case "Docs Missing": return "danger";
      case "Interview Scheduled": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Admissions Pipeline</h1>
          <p className="text-sm text-secondary">Manage applicant verification, interviews, offers, and enrollment.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-xs h-9 gap-1.5"><Download className="w-4 h-4" /> Export List</Button>
          <Button onClick={() => setIsCreateModalOpen(true)} className="text-xs h-9 gap-1.5 bg-brand text-white hover:bg-brand-hover">
            <Plus className="w-4 h-4" /> New Application
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border p-5 rounded-[14px] shadow-sm">
          <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Total Applications</p>
          <p className="text-2xl font-bold text-primary mt-2">{applications.length}</p>
          <p className="text-xs text-emerald-600 mt-1 font-medium">+12% from last week</p>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[14px] shadow-sm">
          <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Under Review</p>
          <p className="text-2xl font-bold text-amber-600 mt-2">
            {applications.filter(a => a.status === "Under Review").length}
          </p>
          <p className="text-xs text-secondary mt-1">Pending verification</p>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[14px] shadow-sm">
          <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Interviews Scheduled</p>
          <p className="text-2xl font-bold text-brand mt-2">
            {applications.filter(a => a.status === "Interview Scheduled").length}
          </p>
          <p className="text-xs text-brand mt-1 font-medium">Slots allocated</p>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[14px] shadow-sm">
          <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Offers Accepted</p>
          <p className="text-2xl font-bold text-emerald-700 mt-2">
            {applications.filter(a => a.status === "Offer Accepted").length}
          </p>
          <p className="text-xs text-emerald-600 mt-1 font-medium">Deposit received</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-surface border border-border rounded-[14px] p-4 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex space-x-1 bg-canvas p-1 rounded-lg border border-border overflow-x-auto w-full sm:w-auto">
          {(["All Applicants", "Under Review", "Interview Scheduled", "Offer Accepted", "Waitlisted"] as const).map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                filter === f 
                  ? "bg-surface text-primary shadow-sm font-bold border border-border" 
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
            <Input 
              type="search" 
              placeholder="Search by name, ID, course..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs" 
            />
          </div>
        </div>
      </div>

      {/* Applications Data Table */}
      <div className="bg-surface border border-border rounded-[14px] shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-canvas border-b border-border">
              <TableHead className="text-xs font-semibold uppercase">Application ID</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Applicant Name</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Program</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Score / GPA</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApps.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-secondary text-xs">
                  No applicant records matching criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredApps.map((app) => (
                <TableRow 
                  key={app.id}
                  className="hover:bg-canvas/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedApp(app)}
                >
                  <TableCell className="font-semibold text-muted text-xs">{app.id}</TableCell>
                  <TableCell>
                    <div className="font-bold text-primary text-xs">{app.name}</div>
                    <div className="text-[11px] text-secondary">{app.email}</div>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-primary">{app.program}</TableCell>
                  <TableCell className="text-xs text-secondary font-mono">{app.gpa}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(app.status)} className="text-[10px]">
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedApp(app)}
                      className="text-xs text-brand font-semibold hover:text-brand-hover h-7 px-2"
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* CREATE APPLICATION MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-[18px] max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-brand" /> New Admission Application
              </h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-muted hover:text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-primary block mb-1">Full Applicant Name *</label>
                <Input 
                  required 
                  placeholder="e.g. Rahul Sharma" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-9 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-primary block mb-1">Email Address *</label>
                  <Input 
                    required 
                    type="email"
                    placeholder="rahul@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-primary block mb-1">Phone Number</label>
                  <Input 
                    placeholder="+91 98000 00000" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-primary block mb-1">Target Program / Grade *</label>
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full h-9 rounded-md border border-border bg-canvas text-xs px-3 font-medium text-primary focus:outline-none focus:border-brand"
                >
                  <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                  <option value="BBA (Marketing)">BBA (Marketing)</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="M.Sc Data Science">M.Sc Data Science</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-primary block mb-1">Prior GPA / Grade Score</label>
                <Input 
                  placeholder="8.5" 
                  value={formData.gpa}
                  onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                  className="h-9 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-primary block mb-1">Notes / Special Category</label>
                <textarea 
                  rows={2}
                  placeholder="Sports quota, sibling discount..." 
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-2 text-xs rounded-md border border-border bg-canvas focus:outline-none focus:border-brand"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)} className="h-8 text-xs">
                  Cancel
                </Button>
                <Button type="submit" className="h-8 text-xs bg-brand text-white hover:bg-brand-hover">
                  Submit Application
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* APPLICATION DETAIL SLIDE-OVER DRAWER */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="bg-surface border-l border-border w-full max-w-md h-full p-6 shadow-2xl overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted">{selectedApp.id}</span>
                  <h2 className="text-xl font-bold text-primary">{selectedApp.name}</h2>
                </div>
                <button onClick={() => setSelectedApp(null)} className="text-muted hover:text-primary">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-secondary">Status:</span>
                  <Badge variant={getBadgeVariant(selectedApp.status)}>{selectedApp.status}</Badge>
                </div>

                <div className="p-3 bg-canvas border border-border rounded-xl space-y-2 text-xs">
                  <p className="flex items-center text-primary gap-2 font-medium">
                    <Mail className="h-3.5 w-3.5 text-brand" /> {selectedApp.email}
                  </p>
                  <p className="flex items-center text-primary gap-2 font-medium">
                    <Phone className="h-3.5 w-3.5 text-brand" /> {selectedApp.phone}
                  </p>
                  <p className="flex items-center text-primary gap-2 font-medium">
                    <GraduationCap className="h-3.5 w-3.5 text-brand" /> Program: {selectedApp.program}
                  </p>
                  <p className="flex items-center text-primary gap-2 font-medium">
                    <FileText className="h-3.5 w-3.5 text-brand" /> Prior Score: {selectedApp.gpa}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-primary block">Evaluator Notes:</span>
                  <p className="text-xs text-secondary bg-surface p-3 border border-border rounded-lg italic">
                    "{selectedApp.notes}"
                  </p>
                </div>
              </div>

              {/* Status Update Buttons */}
              <div className="space-y-2 pt-2 border-t border-border">
                <span className="text-xs font-bold text-primary block uppercase tracking-wider">Change Application Stage:</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleStatusChange(selectedApp.id, "Interview Scheduled")}
                    className="h-8 text-xs"
                  >
                    Schedule Interview
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleStatusChange(selectedApp.id, "Offer Extended")}
                    className="h-8 text-xs text-brand border-brand/40"
                  >
                    Extend Offer
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleStatusChange(selectedApp.id, "Offer Accepted")}
                    className="h-8 text-xs bg-emerald-600 text-white hover:bg-emerald-700 col-span-2"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Mark Offer Accepted
                  </Button>
                </div>
              </div>
            </div>

            <Button variant="ghost" onClick={() => setSelectedApp(null)} className="w-full text-xs text-secondary">
              Close Drawer
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
