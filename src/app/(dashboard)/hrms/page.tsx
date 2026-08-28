"use client";

import { useState } from "react";
import { 
  Users, UserCheck, Calendar, DollarSign, Plus, CheckCircle2, 
  XCircle, Clock, Search, Filter, ArrowUpRight, Download, FileText 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LeaveRequest {
  id: string;
  staff: string;
  role: string;
  type: string;
  dates: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

interface StaffMember {
  id: string;
  name: string;
  department: string;
  designation: string;
  type: string;
  status: string;
  salary: string;
}

const INITIAL_LEAVE_REQUESTS: LeaveRequest[] = [
  { id: "LV-101", staff: "Dr. Sarah Jenkins", role: "Senior Teacher (Grade 10)", type: "Casual Leave", dates: "Aug 29 - Aug 30 (2 days)", reason: "Attending Academic Conference", status: "pending" },
  { id: "LV-102", staff: "Michael Scott", role: "Lab Technician", type: "Sick Leave", dates: "Aug 28 (1 day)", reason: "High fever", status: "pending" },
  { id: "LV-103", staff: "Priya Sharma", role: "Mathematics HOD", type: "Earned Leave", dates: "Sep 02 - Sep 05 (4 days)", reason: "Family event", status: "approved" },
  { id: "LV-104", staff: "David Miller", role: "Physical Instructor", type: "Duty Leave", dates: "Aug 27 (1 day)", reason: "Inter-school sports meet", status: "approved" },
];

const STAFF_MEMBERS: StaffMember[] = [
  { id: "EMP-001", name: "Dr. Sarah Jenkins", department: "Science", designation: "Senior Teacher", type: "Full Time", status: "Present", salary: "₹85,000" },
  { id: "EMP-002", name: "Priya Sharma", department: "Mathematics", designation: "HOD Mathematics", type: "Full Time", status: "Present", salary: "₹1,10,000" },
  { id: "EMP-003", name: "Michael Scott", department: "Computer Lab", designation: "Lab Technician", type: "Full Time", status: "On Leave", salary: "₹45,000" },
  { id: "EMP-004", name: "David Miller", department: "Sports", designation: "Physical Instructor", type: "Full Time", status: "Present", salary: "₹65,000" },
  { id: "EMP-005", name: "Ananya Roy", department: "English", designation: "Assistant Teacher", type: "Contractual", status: "Present", salary: "₹50,000" },
  { id: "EMP-006", name: "Robert Croft", department: "Administration", designation: "Accounts Executive", type: "Full Time", status: "Present", salary: "₹55,000" },
];

export default function HRMSPage() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(INITIAL_LEAVE_REQUESTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");

  const handleLeaveAction = (id: string, newStatus: "approved" | "rejected") => {
    setLeaveRequests((prev: LeaveRequest[]) => prev.map((req: LeaveRequest) => req.id === id ? { ...req, status: newStatus } : req));
  };

  const filteredStaff = STAFF_MEMBERS.filter((staff: StaffMember) => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) || staff.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === "all" || staff.department.toLowerCase() === deptFilter.toLowerCase();
    return matchesSearch && matchesDept;
  });


  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">HRMS & Staff Management</h1>
          <p className="text-sm text-secondary">Manage staff directory, leave approvals, recruitment, and monthly payroll.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export Payroll Slip
          </Button>
          <Button className="gap-2 bg-brand text-white hover:bg-brand-hover">
            <Plus className="h-4 w-4" /> Add New Staff Member
          </Button>
        </div>
      </div>

      {/* HR Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-[14px] bg-surface border border-border shadow-sm">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Staff</span>
            <Users className="h-5 w-5 text-brand" />
          </div>
          <p className="text-2xl font-bold text-primary">184</p>
          <p className="text-xs text-secondary mt-1">152 Teaching · 32 Non-Teaching</p>
        </div>

        <div className="p-5 rounded-[14px] bg-surface border border-border shadow-sm">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Staff Attendance Today</span>
            <UserCheck className="h-5 w-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-700">93.5%</p>
          <p className="text-xs text-emerald-600 mt-1">172 Present · 8 On Leave · 4 Absent</p>
        </div>

        <div className="p-5 rounded-[14px] bg-surface border border-border shadow-sm">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Leave Requests</span>
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-600">
            {leaveRequests.filter((r: LeaveRequest) => r.status === "pending").length}
          </p>
          <p className="text-xs text-secondary mt-1">Requires Principal / HOD approval</p>
        </div>

        <div className="p-5 rounded-[14px] bg-surface border border-border shadow-sm">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Monthly Payroll</span>
            <DollarSign className="h-5 w-5 text-brand" />
          </div>
          <p className="text-2xl font-bold text-primary">₹1.18 Cr</p>
          <p className="text-xs text-emerald-600 mt-1">August Payroll Processed ✅</p>
        </div>
      </div>

      {/* Leave Approvals Section */}
      <div className="p-6 rounded-[14px] bg-surface border border-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <Calendar className="h-5 w-5 text-brand" /> Staff Leave Approvals Workflow
            </h2>
            <p className="text-xs text-secondary">Review pending leave applications from teachers and administration staff.</p>
          </div>
          <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
            {leaveRequests.filter((r: LeaveRequest) => r.status === "pending").length} Action Required
          </span>
        </div>

        <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
          {leaveRequests.map((req) => (
            <div key={req.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface hover:bg-canvas/40 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary text-sm">{req.staff}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-canvas text-secondary border border-border">{req.role}</span>
                </div>
                <p className="text-xs text-secondary">
                  <strong className="text-primary">{req.type}:</strong> {req.dates} — <span className="italic">"{req.reason}"</span>
                </p>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                {req.status === "pending" ? (
                  <>
                    <Button 
                      size="sm" 
                      onClick={() => handleLeaveAction(req.id, "approved")}
                      className="bg-emerald-600 text-white hover:bg-emerald-700 h-8 gap-1.5 text-xs"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleLeaveAction(req.id, "rejected")}
                      className="text-rose-600 border-rose-200 hover:bg-rose-50 h-8 gap-1.5 text-xs"
                    >
                      <XCircle className="h-3.5 w-3.5" /> Reject
                    </Button>
                  </>
                ) : (
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                    req.status === "approved" ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-rose-100 text-rose-800 border border-rose-300"
                  }`}>
                    {req.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Directory Table */}
      <div className="p-6 rounded-[14px] bg-surface border border-border shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-primary">Staff Directory & Payroll</h2>
            <p className="text-xs text-secondary">List of institutional faculty and administrative staff members.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted" />
              <input
                type="text"
                placeholder="Search staff name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-border bg-canvas focus:outline-none focus:border-brand"
              />
            </div>

            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="py-1.5 px-3 text-xs rounded-lg border border-border bg-canvas focus:outline-none focus:border-brand text-primary"
            >
              <option value="all">All Departments</option>
              <option value="science">Science</option>
              <option value="mathematics">Mathematics</option>
              <option value="computer lab">Computer Lab</option>
              <option value="sports">Sports</option>
              <option value="english">English</option>
              <option value="administration">Administration</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-border rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-border text-secondary font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3">Staff ID & Name</th>
                <th className="p-3">Department</th>
                <th className="p-3">Designation</th>
                <th className="p-3">Type</th>
                <th className="p-3">Attendance</th>
                <th className="p-3">Monthly Salary</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-canvas/40 transition-colors">
                  <td className="p-3">
                    <p className="font-bold text-primary">{staff.name}</p>
                    <p className="text-[10px] text-muted">{staff.id}</p>
                  </td>
                  <td className="p-3 text-secondary">{staff.department}</td>
                  <td className="p-3 text-primary font-medium">{staff.designation}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-canvas border border-border text-secondary">
                      {staff.type}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      staff.status === "Present" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-primary">{staff.salary}</td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-brand hover:text-brand-hover">
                      View Profile <ArrowUpRight className="h-3 w-3 ml-1" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
