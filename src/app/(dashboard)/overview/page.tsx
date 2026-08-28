import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/data-table";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-primary tracking-tight">
          Institution Overview
        </h1>
        <p className="text-sm text-secondary">
          High-level operational metrics and attention items for Riverview Academy.
        </p>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI Card */}
        <div className="bg-surface border border-border p-5 rounded-lg shadow-level-1">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-secondary">Total Students</p>
            <Badge variant="outline">+12 this week</Badge>
          </div>
          <p className="text-3xl font-semibold text-primary mt-4">1,842</p>
        </div>

        <div className="bg-surface border border-border p-5 rounded-lg shadow-level-1">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-secondary">Faculty & Staff</p>
          </div>
          <p className="text-3xl font-semibold text-primary mt-4">126</p>
        </div>

        <div className="bg-surface border border-border p-5 rounded-lg shadow-level-1">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-secondary">Today's Attendance</p>
            <Badge variant="success">Target: 95%</Badge>
          </div>
          <p className="text-3xl font-semibold text-primary mt-4">93.8%</p>
        </div>

        <div className="bg-surface border border-border p-5 rounded-lg shadow-level-1">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-secondary">Fees Collected (Term)</p>
          </div>
          <p className="text-3xl font-semibold text-primary mt-4">₹42.8L</p>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        <div className="lg:col-span-2 bg-surface border border-border rounded-lg p-6 shadow-level-1 min-h-[400px]">
          <h2 className="text-lg font-semibold text-primary mb-4">Recent Admissions Pipeline</h2>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant Name</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Aarav Mehta</TableCell>
                <TableCell>B.Tech Computer Science</TableCell>
                <TableCell>Aug 26, 2026</TableCell>
                <TableCell><Badge variant="warning">Under Review</Badge></TableCell>
                <TableCell className="text-right"><a href="#" className="text-brand hover:underline text-sm font-medium">Review</a></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Riya Nair</TableCell>
                <TableCell>BBA</TableCell>
                <TableCell>Aug 25, 2026</TableCell>
                <TableCell><Badge variant="secondary">Documents Pending</Badge></TableCell>
                <TableCell className="text-right"><a href="#" className="text-brand hover:underline text-sm font-medium">Review</a></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Kabir Malhotra</TableCell>
                <TableCell>Grade 10</TableCell>
                <TableCell>Aug 24, 2026</TableCell>
                <TableCell><Badge variant="success">Offer Accepted</Badge></TableCell>
                <TableCell className="text-right"><a href="#" className="text-brand hover:underline text-sm font-medium">Enroll</a></TableCell>
              </TableRow>
            </TableBody>
          </Table>

        </div>

        <div className="bg-surface border border-border rounded-lg p-6 shadow-level-1 min-h-[400px]">
          <h2 className="text-lg font-semibold text-primary mb-4 flex items-center justify-between">
            Attention Required
            <Badge variant="danger">3</Badge>
          </h2>
          
          <ul className="space-y-4">
            <li className="flex gap-3 pb-4 border-b border-border">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-attention flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-primary">24 students below attendance threshold</p>
                <p className="text-xs text-secondary mt-1">Academics</p>
              </div>
            </li>
            <li className="flex gap-3 pb-4 border-b border-border">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-warning flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-primary">12 applications missing documents</p>
                <p className="text-xs text-secondary mt-1">Admissions</p>
              </div>
            </li>
            <li className="flex gap-3 pb-4 border-b border-border">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-warning flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-primary">₹7.4L outstanding fees due today</p>
                <p className="text-xs text-secondary mt-1">Finance</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}
