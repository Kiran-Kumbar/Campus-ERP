"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/data-table";
import { Search, Plus, TrendingUp, IndianRupee, AlertCircle, Download, X, Printer, CheckCircle2, CreditCard } from "lucide-react";

interface FeeTransaction {
  id: string;
  studentName: string;
  studentId: string;
  program: string;
  amount: string;
  date: string;
  status: "Paid" | "Overdue" | "Partial";
  paymentMode: string;
}

const INITIAL_TRANSACTIONS: FeeTransaction[] = [
  { id: "INV-2026-0891", studentName: "Aarav Mehta", studentId: "STU-10486", program: "Grade 10", amount: "₹1,20,000", date: "Aug 27, 2026", status: "Paid", paymentMode: "UPI / NetBanking" },
  { id: "INV-2026-0884", studentName: "Sneha Verma", studentId: "STU-10483", program: "B.Tech CS", amount: "₹2,45,000", date: "Aug 25, 2026", status: "Overdue", paymentMode: "Pending" },
  { id: "INV-2026-0882", studentName: "Kabir Malhotra", studentId: "STU-10482", program: "Grade 10", amount: "₹1,20,000", date: "Aug 22, 2026", status: "Partial", paymentMode: "Card / Instalment" },
  { id: "INV-2026-0879", studentName: "Rohan Patel", studentId: "STU-10484", program: "Grade 11", amount: "₹85,000", date: "Aug 20, 2026", status: "Overdue", paymentMode: "Pending" },
  { id: "INV-2026-0875", studentName: "Meera Singh", studentId: "STU-10485", program: "Grade 9", amount: "₹95,000", date: "Aug 18, 2026", status: "Paid", paymentMode: "Cheque" }
];

export default function FinancePage() {
  const [transactions, setTransactions] = useState<FeeTransaction[]>(INITIAL_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "overdue">("all");
  const [isRecordPaymentModalOpen, setIsRecordPaymentModalOpen] = useState(false);
  const [receiptTx, setReceiptTx] = useState<FeeTransaction | null>(null);

  // Payment Form State
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "STU-10490",
    program: "Grade 10",
    amount: "1,20,000",
    paymentMode: "UPI"
  });

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName) return;

    const newTx: FeeTransaction = {
      id: `INV-2026-0${895 + transactions.length}`,
      studentName: formData.studentName,
      studentId: formData.studentId,
      program: formData.program,
      amount: `₹${formData.amount}`,
      date: "Today",
      status: "Paid",
      paymentMode: formData.paymentMode
    };

    setTransactions([newTx, ...transactions]);
    setFormData({ studentName: "", studentId: "STU-10490", program: "Grade 10", amount: "1,20,000", paymentMode: "UPI" });
    setIsRecordPaymentModalOpen(false);
  };

  const handleSendReminder = (id: string) => {
    alert(`SMS & Email payment reminder sent for invoice ${id}.`);
  };

  const filteredTx = transactions.filter(tx => {
    const matchesTab = activeTab === "all" || tx.status === "Overdue";
    const matchesSearch = tx.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tx.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Student Fees & Collections</h1>
          <p className="text-sm text-secondary">Manage fee invoices, online collections, overdue reminders, and payment receipts.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-xs h-9 gap-1.5"><Download className="w-4 h-4" /> Export Report</Button>
          <Button onClick={() => setIsRecordPaymentModalOpen(true)} className="text-xs h-9 gap-1.5 bg-brand text-white hover:bg-brand-hover">
            <Plus className="w-4 h-4" /> Record Fee Payment
          </Button>
        </div>
      </div>

      {/* Revenue KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border border-border p-5 rounded-[14px] shadow-sm">
          <p className="text-xs font-semibold text-secondary uppercase tracking-wider flex items-center">
            <IndianRupee className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Total Collected (Term 1)
          </p>
          <p className="text-2xl font-bold text-primary mt-2">₹4.20 Cr</p>
          <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> +8% vs previous academic term
          </p>
        </div>

        <div className="bg-surface border border-border p-5 rounded-[14px] shadow-sm">
          <p className="text-xs font-semibold text-secondary uppercase tracking-wider flex items-center">
            <AlertCircle className="w-3.5 h-3.5 mr-1 text-amber-600" /> Pending Overdue Dues
          </p>
          <p className="text-2xl font-bold text-amber-600 mt-2">₹84.5 L</p>
          <p className="text-xs text-secondary mt-1">
            {transactions.filter(t => t.status === "Overdue").length} Overdue Accounts
          </p>
        </div>

        <div className="bg-surface border border-border p-5 rounded-[14px] shadow-sm">
          <p className="text-xs font-semibold text-secondary uppercase tracking-wider flex items-center">
            <IndianRupee className="w-3.5 h-3.5 mr-1 text-brand" /> Projected Academic Revenue
          </p>
          <p className="text-2xl font-bold text-brand mt-2">₹12.80 Cr</p>
          <p className="text-xs text-secondary mt-1">Academic Year 2026-27 Target</p>
        </div>
      </div>

      {/* Table Toolbar & Data Grid */}
      <div className="bg-surface border border-border rounded-[14px] shadow-sm overflow-hidden space-y-3">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center bg-canvas gap-4">
          <div className="flex space-x-1 bg-surface p-1 rounded-lg border border-border">
            <button 
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === "all" ? "bg-canvas text-primary font-bold shadow-xs" : "text-secondary"
              }`}
            >
              All Recent Fee Invoices
            </button>
            <button 
              onClick={() => setActiveTab("overdue")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === "overdue" ? "bg-canvas text-amber-600 font-bold shadow-xs" : "text-secondary"
              }`}
            >
              Overdue Accounts ({transactions.filter(t => t.status === "Overdue").length})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted" />
            <Input 
              type="search" 
              placeholder="Search student or invoice..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-8 text-xs" 
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-canvas border-b border-border">
              <TableHead className="text-xs font-semibold uppercase">Invoice ID</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Student Profile</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Program</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Amount</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Payment Mode</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTx.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-canvas/50 transition-colors">
                <TableCell className="font-bold text-muted text-xs">{tx.id}</TableCell>
                <TableCell>
                  <div className="font-bold text-primary text-xs">{tx.studentName}</div>
                  <div className="text-[10px] text-muted">{tx.studentId}</div>
                </TableCell>
                <TableCell className="text-xs text-secondary font-medium">{tx.program}</TableCell>
                <TableCell className="text-xs font-bold text-primary">{tx.amount}</TableCell>
                <TableCell className="text-xs text-secondary">{tx.paymentMode}</TableCell>
                <TableCell>
                  <Badge variant={tx.status === "Paid" ? "success" : tx.status === "Overdue" ? "danger" : "warning"} className="text-[10px]">
                    {tx.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {tx.status === "Paid" ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setReceiptTx(tx)}
                      className="text-xs text-brand font-semibold h-7 px-2"
                    >
                      <Printer className="h-3 w-3 mr-1" /> View Receipt
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => handleSendReminder(tx.id)}
                      className="bg-rose-600 text-white hover:bg-rose-700 text-xs h-7 px-2.5"
                    >
                      Send Reminder
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* RECORD FEE PAYMENT MODAL */}
      {isRecordPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-[18px] max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-brand" /> Record Fee Collection
              </h2>
              <button onClick={() => setIsRecordPaymentModalOpen(false)} className="text-muted hover:text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-primary block mb-1">Student Name *</label>
                <Input 
                  required 
                  placeholder="e.g. Sneha Verma" 
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="h-9 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-primary block mb-1">Student ID</label>
                  <Input 
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-primary block mb-1">Program</label>
                  <Input 
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-primary block mb-1">Amount Paid (₹) *</label>
                  <Input 
                    required 
                    placeholder="1,20,000" 
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-primary block mb-1">Payment Mode</label>
                  <select
                    value={formData.paymentMode}
                    onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                    className="w-full h-9 rounded-md border border-border bg-canvas text-xs px-3 font-medium text-primary focus:outline-none focus:border-brand"
                  >
                    <option value="UPI / Online">UPI / Online</option>
                    <option value="Debit/Credit Card">Debit/Credit Card</option>
                    <option value="Cheque / DD">Cheque / DD</option>
                    <option value="Cash Deposit">Cash Deposit</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setIsRecordPaymentModalOpen(false)} className="h-8 text-xs">
                  Cancel
                </Button>
                <Button type="submit" className="h-8 text-xs bg-brand text-white hover:bg-brand-hover">
                  Generate Payment Receipt
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECEIPT VIEW MODAL */}
      {receiptTx && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-[18px] max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Official Fee Receipt</span>
              <button onClick={() => setReceiptTx(null)} className="text-muted hover:text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs border border-dashed border-border p-4 rounded-xl bg-canvas">
              <div className="text-center pb-2 border-b border-border">
                <p className="font-bold text-primary text-sm">Riverview International Academy</p>
                <p className="text-[10px] text-secondary">Receipt No: {receiptTx.id}</p>
              </div>
              <div className="space-y-1">
                <p className="flex justify-between"><span className="text-secondary">Student Name:</span> <strong className="text-primary">{receiptTx.studentName}</strong></p>
                <p className="flex justify-between"><span className="text-secondary">Student ID:</span> <strong className="text-primary">{receiptTx.studentId}</strong></p>
                <p className="flex justify-between"><span className="text-secondary">Program:</span> <strong className="text-primary">{receiptTx.program}</strong></p>
                <p className="flex justify-between"><span className="text-secondary">Payment Mode:</span> <strong className="text-primary">{receiptTx.paymentMode}</strong></p>
              </div>
              <div className="pt-2 border-t border-border flex justify-between items-center text-sm font-bold text-primary">
                <span>Total Amount Paid:</span>
                <span className="text-emerald-700">{receiptTx.amount}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => window.print()} className="w-full text-xs h-8 bg-brand text-white hover:bg-brand-hover gap-1.5">
                <Printer className="h-3.5 w-3.5" /> Print Receipt
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
