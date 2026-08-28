"use client";

import { useState } from "react";
import { 
  Receipt, DollarSign, TrendingDown, TrendingUp, CreditCard, 
  Building2, Plus, ArrowUpRight, CheckCircle2, Clock, FileSpreadsheet, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface VendorInvoice {
  id: string;
  vendor: string;
  category: string;
  amount: string;
  dueDate: string;
  status: "pending_approval" | "approved" | "paid";
  poNumber: string;
}

const VENDOR_INVOICES: VendorInvoice[] = [
  { id: "INV-8901", vendor: "TechEdge Lab Equipment", category: "Physics Lab Upgrade", amount: "₹3,45,000", dueDate: "Sep 05, 2026", status: "pending_approval", poNumber: "PO-2026-042" },
  { id: "INV-8902", vendor: "Apex Books & Stationers", category: "Library Annual Stock", amount: "₹1,20,000", dueDate: "Sep 02, 2026", status: "approved", poNumber: "PO-2026-039" },
  { id: "INV-8903", vendor: "City Power & Utilities", category: "Electricity Bill (August)", amount: "₹1,85,400", dueDate: "Aug 30, 2026", status: "paid", poNumber: "UTIL-AUG-26" },
  { id: "INV-8904", vendor: "GreenLine Bus Maintenance", category: "Transport Service", amount: "₹95,000", dueDate: "Sep 10, 2026", status: "pending_approval", poNumber: "PO-2026-048" },
];

const EXPENSES = [
  { id: "EXP-401", title: "Projector Bulb Replacement (Room 204)", category: "IT Infrastructure", amount: "₹12,500", date: "Aug 27, 2026", approvedBy: "Dr. Vance (Principal)" },
  { id: "EXP-402", title: "Annual Sports Ground Maintenance", category: "Facilities", amount: "₹45,000", date: "Aug 25, 2026", approvedBy: "Marcus Brody (Finance)" },
  { id: "EXP-403", title: "Chemistry Lab Reagents Batch B", category: "Academic Supply", amount: "₹28,400", date: "Aug 24, 2026", approvedBy: "Dr. Vance (Principal)" },
];

export default function AccountingPage() {
  const [invoices, setInvoices] = useState<VendorInvoice[]>(VENDOR_INVOICES);

  const handleInvoiceAction = (id: string, newStatus: "approved" | "paid") => {
    setInvoices((prev: VendorInvoice[]) => prev.map((inv: VendorInvoice) => inv.id === id ? { ...inv, status: newStatus } : inv));
  };


  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Accounting, Payables & General Ledger</h1>
          <p className="text-sm text-secondary">Manage institutional expenses, vendor invoices, purchase orders, and cash/bank reconciliation.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <FileSpreadsheet className="h-4 w-4" /> Download General Ledger
          </Button>
          <Button className="gap-2 bg-brand text-white hover:bg-brand-hover">
            <Plus className="h-4 w-4" /> Record New Expense
          </Button>
        </div>
      </div>

      {/* Accounting KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-[14px] bg-surface border border-border shadow-sm">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Cash & Bank Balance</span>
            <Building2 className="h-5 w-5 text-brand" />
          </div>
          <p className="text-2xl font-bold text-primary">₹3.42 Cr</p>
          <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> HDFC Main Account: ₹2.85 Cr
          </p>
        </div>

        <div className="p-5 rounded-[14px] bg-surface border border-border shadow-sm">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Accounts Payable (Owed)</span>
            <TrendingDown className="h-5 w-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-600">₹7.45 L</p>
          <p className="text-xs text-secondary mt-1">4 Pending Vendor Invoices</p>
        </div>

        <div className="p-5 rounded-[14px] bg-surface border border-border shadow-sm">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Monthly Operating Expense</span>
            <CreditCard className="h-5 w-5 text-secondary" />
          </div>
          <p className="text-2xl font-bold text-primary">₹38.2 L</p>
          <p className="text-xs text-secondary mt-1">Utilities, Maintenance & Supplies</p>
        </div>

        <div className="p-5 rounded-[14px] bg-surface border border-border shadow-sm">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Purchase Orders</span>
            <Clock className="h-5 w-5 text-brand" />
          </div>
          <p className="text-2xl font-bold text-primary">3 Orders</p>
          <p className="text-xs text-amber-600 mt-1">₹4.40 L Pending Approval</p>
        </div>
      </div>

      {/* Accounts Payable / Vendor Invoices */}
      <div className="p-6 rounded-[14px] bg-surface border border-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <Receipt className="h-5 w-5 text-brand" /> Vendor Invoices & Accounts Payable
            </h2>
            <p className="text-xs text-secondary">Review, approve, and disburse payments to institutional suppliers and service providers.</p>
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            + Add Vendor Invoice
          </Button>
        </div>

        <div className="overflow-x-auto border border-border rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-border text-secondary font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3">Invoice & PO #</th>
                <th className="p-3">Vendor Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Due Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-canvas/40 transition-colors">
                  <td className="p-3">
                    <p className="font-bold text-primary">{inv.id}</p>
                    <p className="text-[10px] text-muted">{inv.poNumber}</p>
                  </td>
                  <td className="p-3 font-semibold text-primary">{inv.vendor}</td>
                  <td className="p-3 text-secondary">{inv.category}</td>
                  <td className="p-3 font-bold text-primary">{inv.amount}</td>
                  <td className="p-3 text-secondary">{inv.dueDate}</td>
                  <td className="p-3">
                    {inv.status === "pending_approval" && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                        Pending Approval
                      </span>
                    )}
                    {inv.status === "approved" && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800 border border-blue-300">
                        Approved for Payment
                      </span>
                    )}
                    {inv.status === "paid" && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Paid ✅
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    {inv.status === "pending_approval" && (
                      <Button 
                        size="sm" 
                        onClick={() => handleInvoiceAction(inv.id, "approved")}
                        className="bg-brand text-white hover:bg-brand-hover text-[11px] h-7 px-2.5"
                      >
                        Approve Invoice
                      </Button>
                    )}
                    {inv.status === "approved" && (
                      <Button 
                        size="sm" 
                        onClick={() => handleInvoiceAction(inv.id, "paid")}
                        className="bg-emerald-600 text-white hover:bg-emerald-700 text-[11px] h-7 px-2.5"
                      >
                        Release Payment
                      </Button>
                    )}
                    {inv.status === "paid" && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-muted">
                        Receipt Attached
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Institutional Expense Log */}
      <div className="p-6 rounded-[14px] bg-surface border border-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-primary">Recent Institutional Expenses</h2>
            <p className="text-xs text-secondary">Logged department expenses and operational disbursements.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EXPENSES.map((exp) => (
            <div key={exp.id} className="p-4 rounded-xl border border-border bg-canvas/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand px-2 py-0.5 bg-brand/10 rounded">
                  {exp.category}
                </span>
                <span className="text-xs font-bold text-primary">{exp.amount}</span>
              </div>
              <p className="text-sm font-semibold text-primary line-clamp-1">{exp.title}</p>
              <div className="flex items-center justify-between text-[11px] text-muted pt-2 border-t border-border/60">
                <span>{exp.date}</span>
                <span>By: {exp.approvedBy}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
