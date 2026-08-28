import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/data-table";
import { Search, Plus, TrendingUp, IndianRupee, AlertCircle, Download } from "lucide-react";

export default function FinancePage() {
  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-primary tracking-tight">Finance & Fees</h1>
          <p className="text-sm text-secondary">Manage fee collection, outstanding ledgers, and revenue.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export Report</Button>
          <Link href="/finance/new">
            <Button><Plus className="w-4 h-4 mr-2" /> Create Invoice</Button>
          </Link>
        </div>
      </div>

      {/* KPI Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border border-border p-5 rounded-[12px] shadow-sm">
          <p className="text-sm font-medium text-secondary flex items-center"><IndianRupee className="w-4 h-4 mr-1 text-muted" /> Total Collected (Term 1)</p>
          <p className="text-3xl font-semibold text-primary mt-3">₹4.2 Cr</p>
          <p className="text-xs text-success mt-2 font-medium flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +8% vs last year</p>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[12px] shadow-sm">
          <p className="text-sm font-medium text-secondary flex items-center"><AlertCircle className="w-4 h-4 mr-1 text-warning" /> Pending Dues</p>
          <p className="text-3xl font-semibold text-warning mt-3">₹84.5 L</p>
          <p className="text-xs text-muted mt-2 font-medium">From 142 students</p>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[12px] shadow-sm bg-gradient-to-br from-brand/5 to-transparent">
          <p className="text-sm font-medium text-secondary flex items-center"><IndianRupee className="w-4 h-4 mr-1 text-muted" /> Projected Revenue</p>
          <p className="text-3xl font-semibold text-primary mt-3">₹12.8 Cr</p>
          <p className="text-xs text-muted mt-2 font-medium">Annual Academic Year 2026-27</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg shadow-sm">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center bg-surface-subtle rounded-t-lg gap-4">
          <div className="flex space-x-1 bg-[#F1F1EC] p-1 rounded-lg">
            <button className="px-4 py-1.5 text-sm font-medium bg-white text-primary rounded-md shadow-sm">Recent Transactions</button>
            <button className="px-4 py-1.5 text-sm font-medium text-secondary hover:text-primary">Overdue Invoices</button>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted" />
            <Input type="search" placeholder="Search by Invoice ID or Student..." className="pl-9 h-9" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-muted">INV-2026-0891</TableCell>
              <TableCell>
                <div className="font-medium text-primary">Aarav Mehta</div>
                <div className="text-xs text-secondary">Grade 10</div>
              </TableCell>
              <TableCell className="font-medium text-primary">₹1,20,000</TableCell>
              <TableCell>Aug 27, 2026</TableCell>
              <TableCell><Badge variant="success">Paid</Badge></TableCell>
              <TableCell className="text-right"><Button variant="ghost" size="sm">Receipt</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-muted">INV-2026-0884</TableCell>
              <TableCell>
                <div className="font-medium text-primary">Sneha Verma</div>
                <div className="text-xs text-secondary">B.Tech CS</div>
              </TableCell>
              <TableCell className="font-medium text-primary">₹2,45,000</TableCell>
              <TableCell>Aug 25, 2026</TableCell>
              <TableCell><Badge variant="danger">Overdue</Badge></TableCell>
              <TableCell className="text-right"><Button variant="ghost" size="sm" className="text-danger">Send Reminder</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-muted">INV-2026-0882</TableCell>
              <TableCell>
                <div className="font-medium text-primary">Kabir Malhotra</div>
                <div className="text-xs text-secondary">Grade 10</div>
              </TableCell>
              <TableCell className="font-medium text-primary">₹1,20,000</TableCell>
              <TableCell>Aug 22, 2026</TableCell>
              <TableCell><Badge variant="warning">Partial</Badge></TableCell>
              <TableCell className="text-right"><Button variant="ghost" size="sm">View Ledger</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
