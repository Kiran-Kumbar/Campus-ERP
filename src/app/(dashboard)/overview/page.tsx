"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/data-table";
import { useRole } from "@/components/layout/role-context";
import { 
  Users, UserCheck, Calendar, DollarSign, AlertCircle, CheckCircle2, 
  Clock, ArrowUpRight, ShieldAlert, BookOpen, FileCheck, Receipt 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PendingApprovalItem {
  id: string;
  type: string;
  title: string;
  requestedBy: string;
  urgency: string;
  path: string;
}

export default function OverviewPage() {
  const { role, roleDetails } = useRole();

  const [pendingApprovals, setPendingApprovals] = useState<PendingApprovalItem[]>([
    { id: "AP-1", type: "Staff Leave", title: "Dr. Sarah Jenkins (2 days Casual Leave)", requestedBy: "Science Dept", urgency: "High", path: "/hrms" },
    { id: "AP-2", type: "Fee Waiver", title: "Rohan Patel (Grade 11) — Merit Concession 20%", requestedBy: "Accounts", urgency: "Medium", path: "/finance" },
    { id: "AP-3", type: "Purchase Order", title: "TechEdge Lab Equipment (₹3.45 L)", requestedBy: "Physics Lab", urgency: "High", path: "/accounting" },
    { id: "AP-4", type: "Admission Offer", title: "Kabir Malhotra (Grade 10)", requestedBy: "Admissions Office", urgency: "Normal", path: "/admissions" },
  ]);

  const handleApprove = (id: string) => {
    setPendingApprovals((prev: PendingApprovalItem[]) => prev.filter((item: PendingApprovalItem) => item.id !== id));
  };


  return (
    <div className="space-y-6">
      
      {/* Header with Role Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface border border-border p-6 rounded-[14px] shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-primary tracking-tight">
              Good Morning, {roleDetails.name} 👋
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20">
              {roleDetails.title}
            </span>
          </div>
          <p className="text-xs text-secondary">
            Here is your operational snapshot for <strong className="text-primary">Friday, 28 August 2026</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/hrms">
            <Button variant="outline" className="text-xs h-9 gap-1.5">
              <Users className="h-4 w-4" /> Staff HRMS
            </Button>
          </Link>
          <Link href="/accounting">
            <Button className="text-xs h-9 gap-1.5 bg-brand text-white hover:bg-brand-hover">
              <Receipt className="h-4 w-4" /> Accounting & Payables
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="bg-surface border border-border p-4 rounded-[14px] shadow-sm">
          <div className="flex justify-between items-center text-muted mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Students</span>
            <Users className="h-4 w-4 text-brand" />
          </div>
          <p className="text-2xl font-bold text-primary">2,486</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">+18 enrolled this month</p>
        </div>

        <div className="bg-surface border border-border p-4 rounded-[14px] shadow-sm">
          <div className="flex justify-between items-center text-muted mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Faculty & Staff</span>
            <UserCheck className="h-4 w-4 text-brand" />
          </div>
          <p className="text-2xl font-bold text-primary">184</p>
          <p className="text-[11px] text-secondary mt-1">152 Teaching · 32 Admin</p>
        </div>

        <div className="bg-surface border border-border p-4 rounded-[14px] shadow-sm">
          <div className="flex justify-between items-center text-muted mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Daily Attendance</span>
            <Calendar className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-700">94.2%</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Target 95% ✅</p>
        </div>

        <div className="bg-surface border border-border p-4 rounded-[14px] shadow-sm">
          <div className="flex justify-between items-center text-muted mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Fee Collections</span>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-primary">₹2.40 Cr</p>
          <p className="text-[11px] text-secondary mt-1">Term 2 Collections</p>
        </div>

        <div className="bg-surface border border-border p-4 rounded-[14px] shadow-sm">
          <div className="flex justify-between items-center text-muted mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Outstanding Fees</span>
            <AlertCircle className="h-4 w-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-600">₹18.5 L</p>
          <p className="text-[11px] text-amber-600 font-medium mt-1">42 Overdue Accounts</p>
        </div>

      </div>

      {/* Actionable "My Work / Requires Attention" Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Pending Approvals Queue */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-[14px] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-amber-600" /> 🔔 Requires Attention / Pending Approvals
              </h2>
              <p className="text-xs text-secondary">Items requiring Principal or Admin authorization today.</p>
            </div>
            <span className="px-2.5 py-1 text-xs font-bold bg-amber-100 text-amber-800 rounded-full border border-amber-300">
              {pendingApprovals.length} Pending
            </span>
          </div>

          {pendingApprovals.length === 0 ? (
            <div className="p-8 text-center bg-canvas/40 rounded-xl border border-border">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-primary">All caught up!</p>
              <p className="text-xs text-secondary">No pending approvals remaining for your attention.</p>
            </div>
          ) : (
            <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface hover:bg-canvas/40 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand/10 text-brand">
                        {item.type}
                      </span>
                      <span className="text-xs font-semibold text-primary">{item.title}</span>
                    </div>
                    <p className="text-xs text-secondary">Requested by: <strong className="text-primary">{item.requestedBy}</strong></p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Link href={item.path}>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        Review
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      onClick={() => handleApprove(item.id)}
                      className="bg-emerald-600 text-white hover:bg-emerald-700 h-8 text-xs gap-1"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Today's Operations Bar */}
          <div className="pt-4 border-t border-border space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted">Today's Campus Operations Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-canvas border border-border rounded-lg text-center">
                <span className="text-xs text-secondary block">Classes Conducted</span>
                <span className="text-lg font-bold text-primary">42 / 48</span>
              </div>
              <div className="p-3 bg-canvas border border-border rounded-lg text-center">
                <span className="text-xs text-secondary block">Exams Running</span>
                <span className="text-lg font-bold text-primary">3 Exams</span>
              </div>
              <div className="p-3 bg-canvas border border-border rounded-lg text-center">
                <span className="text-xs text-secondary block">Staff On Leave</span>
                <span className="text-lg font-bold text-amber-600">8 Staff</span>
              </div>
              <div className="p-3 bg-canvas border border-border rounded-lg text-center">
                <span className="text-xs text-secondary block">Campus Events</span>
                <span className="text-lg font-bold text-brand">2 Events</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI At-Risk Radar & Interventions */}
        <div className="bg-surface border border-border rounded-[14px] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-rose-600" />
                AI Risk Radar
              </h2>
              <Badge variant="danger" className="font-mono">3 At-Risk</Badge>
            </div>

            <ul className="space-y-4">
              <li className="p-4 bg-canvas rounded-xl border border-border space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-primary">Rohan Patel</p>
                    <p className="text-xs text-secondary">Grade 11 • Science</p>
                  </div>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                    88% Dropout Risk
                  </span>
                </div>
                <p className="text-xs text-secondary bg-white p-2 rounded-lg border border-border">
                  Attendance dropped to 62% over 14 days, concurrent with 2 missed Physics assignments.
                </p>
                <Button size="sm" className="w-full bg-rose-600 text-white hover:bg-rose-700 text-xs h-8">
                  Alert Academic Counselor
                </Button>
              </li>

              <li className="p-4 bg-canvas rounded-xl border border-border space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-primary">Meera Singh</p>
                    <p className="text-xs text-secondary">Grade 9 • Arts</p>
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                    74% Academic Risk
                  </span>
                </div>
                <p className="text-xs text-secondary bg-white p-2 rounded-lg border border-border">
                  Sudden 30% decline in Mathematics scores compared to previous term average.
                </p>
                <Button size="sm" variant="outline" className="w-full text-xs h-8">
                  Schedule Parent Meeting
                </Button>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
