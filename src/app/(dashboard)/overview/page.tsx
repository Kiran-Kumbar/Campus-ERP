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
    <div className="space-y-8">
      
      {/* Header (Unboxed & Airy) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-border/50">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-primary tracking-tight">
              Good Morning, {roleDetails.name}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20">
              {roleDetails.title}
            </span>
          </div>
          <p className="text-sm text-secondary">
            Here is your operational snapshot for <strong className="text-primary">Friday, 28 August 2026</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/hrms">
            <Button variant="outline" className="text-xs h-9 gap-1.5 shadow-sm">
              <Users className="h-4 w-4" /> Staff HRMS
            </Button>
          </Link>
          <Link href="/accounting">
            <Button className="text-xs h-9 gap-1.5 bg-brand text-white hover:bg-[#0B625C] shadow-sm">
              <Receipt className="h-4 w-4" /> Accounting & Payables
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Section (Unified single panel to reduce clutter) */}
      <div className="bg-surface border border-border rounded-[14px] shadow-sm flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border">
        
        <div className="p-6 flex-1 hover:bg-canvas/30 transition-colors">
          <div className="flex justify-between items-center text-muted mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">Total Students</span>
            <Users className="h-4 w-4 text-brand" />
          </div>
          <p className="text-3xl font-bold text-primary">2,486</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">+18 enrolled this month</p>
        </div>

        <div className="p-6 flex-1 hover:bg-canvas/30 transition-colors">
          <div className="flex justify-between items-center text-muted mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">Faculty & Staff</span>
            <UserCheck className="h-4 w-4 text-brand" />
          </div>
          <p className="text-3xl font-bold text-primary">184</p>
          <p className="text-xs text-secondary mt-1">152 Teaching · 32 Admin</p>
        </div>

        <div className="p-6 flex-1 hover:bg-canvas/30 transition-colors">
          <div className="flex justify-between items-center text-muted mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">Daily Attendance</span>
            <Calendar className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-emerald-700">94.2%</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">Target 95%</p>
        </div>

        <div className="p-6 flex-1 hover:bg-canvas/30 transition-colors">
          <div className="flex justify-between items-center text-muted mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">Fee Collections</span>
            <DollarSign className="h-4 w-4 text-brand" />
          </div>
          <p className="text-3xl font-bold text-primary">₹2.40 Cr</p>
          <p className="text-xs text-secondary mt-1">Term 2 Collections</p>
        </div>

        <div className="p-6 flex-1 hover:bg-canvas/30 transition-colors">
          <div className="flex justify-between items-center text-muted mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">Outstanding Fees</span>
            <AlertCircle className="h-4 w-4 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-amber-600">₹18.5 L</p>
          <p className="text-xs text-amber-600 font-medium mt-1">42 Overdue Accounts</p>
        </div>

      </div>

      {/* Actionable "My Work / Requires Attention" Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Pending Approvals Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-amber-600" /> Pending Approvals
              </h2>
              <p className="text-sm text-secondary">Items requiring Principal or Admin authorization today.</p>
            </div>
            <span className="px-3 py-1 text-xs font-bold bg-amber-50 text-amber-700 rounded-full border border-amber-200">
              {pendingApprovals.length} Pending
            </span>
          </div>

          {pendingApprovals.length === 0 ? (
            <div className="p-10 text-center bg-surface rounded-[14px] border border-border shadow-sm">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
              <p className="text-base font-semibold text-primary">All caught up!</p>
              <p className="text-sm text-secondary mt-1">No pending approvals remaining for your attention.</p>
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-[14px] shadow-sm overflow-hidden divide-y divide-border">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-canvas/40 transition-colors">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand/10 text-brand">
                        {item.type}
                      </span>
                      <span className="text-sm font-semibold text-primary">{item.title}</span>
                    </div>
                    <p className="text-xs text-secondary">Requested by: <strong className="text-primary font-medium">{item.requestedBy}</strong></p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <Link href={item.path}>
                      <Button variant="ghost" size="sm" className="h-9 text-xs text-secondary hover:text-primary">
                        Review Details
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      onClick={() => handleApprove(item.id)}
                      className="bg-brand text-white hover:bg-[#0B625C] h-9 text-xs gap-1.5 px-4 shadow-sm"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Today's Operations Bar */}
          <div className="pt-6">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-secondary mb-3 px-1">Today's Campus Operations Summary</h3>
            <div className="bg-surface border border-border rounded-[14px] shadow-sm grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-border overflow-hidden">
              <div className="p-5 text-center hover:bg-canvas/30 transition-colors">
                <span className="text-xs text-secondary block mb-1">Classes Conducted</span>
                <span className="text-xl font-bold text-primary">42 <span className="text-sm font-medium text-muted">/ 48</span></span>
              </div>
              <div className="p-5 text-center hover:bg-canvas/30 transition-colors">
                <span className="text-xs text-secondary block mb-1">Exams Running</span>
                <span className="text-xl font-bold text-primary">3 Exams</span>
              </div>
              <div className="p-5 text-center hover:bg-canvas/30 transition-colors bg-amber-50/30">
                <span className="text-xs text-amber-700 block mb-1 font-medium">Staff On Leave</span>
                <span className="text-xl font-bold text-amber-600">8 Staff</span>
              </div>
              <div className="p-5 text-center hover:bg-canvas/30 transition-colors">
                <span className="text-xs text-secondary block mb-1">Campus Events</span>
                <span className="text-xl font-bold text-brand">2 Events</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI At-Risk Radar & Interventions */}
        <div className="bg-surface border border-border rounded-[14px] p-6 shadow-sm flex flex-col h-fit">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-rose-500" />
              AI Risk Radar
            </h2>
            <Badge variant="outline" className="font-mono bg-rose-50 text-rose-700 border-rose-200">3 At-Risk</Badge>
          </div>

          <ul className="space-y-5">
            <li className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-bold text-primary">Rohan Patel</p>
                  <p className="text-xs text-secondary mt-0.5">Grade 11 • Science</p>
                </div>
                <span className="text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-1 rounded-md">
                  88% Dropout Risk
                </span>
              </div>
              <div className="text-xs text-secondary bg-canvas/50 p-3 rounded-lg border border-border/50 leading-relaxed">
                Attendance dropped to 62% over 14 days, concurrent with 2 missed Physics assignments.
              </div>
              <Button size="sm" className="w-full bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs h-9 shadow-sm">
                Alert Academic Counselor
              </Button>
            </li>

            <li className="pt-5 border-t border-border/50 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-bold text-primary">Meera Singh</p>
                  <p className="text-xs text-secondary mt-0.5">Grade 9 • Arts</p>
                </div>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-1 rounded-md">
                  74% Academic Risk
                </span>
              </div>
              <div className="text-xs text-secondary bg-canvas/50 p-3 rounded-lg border border-border/50 leading-relaxed">
                Sudden 30% decline in Mathematics scores compared to previous term average.
              </div>
              <Button size="sm" variant="outline" className="w-full text-xs h-9 text-secondary hover:text-primary shadow-sm">
                Schedule Parent Meeting
              </Button>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
}
