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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-attention opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-attention"></span>
              </span>
              AI Risk Radar
            </h2>
            <Badge variant="danger" className="font-mono">3 At-Risk</Badge>
          </div>
          
          <ul className="space-y-4">
            
            {/* Risk Item 1 */}
            <li className="p-4 bg-canvas rounded-xl border border-border">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm font-bold text-primary">Rohan Patel</p>
                  <p className="text-xs text-secondary">Grade 11 • Sci</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-attention">88% Risk</span>
                  <span className="text-[10px] text-muted uppercase tracking-wider">Dropout</span>
                </div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-border text-xs text-secondary mb-3">
                <strong className="text-primary block mb-1">AI Insight:</strong>
                Attendance dropped to 62% over the last 14 days, concurrent with 2 missed assignments in Physics.
              </div>
              <button className="w-full py-1.5 text-xs font-semibold text-white bg-attention rounded-lg shadow-sm hover:bg-red-700 transition-colors">
                Intervene / Alert Counselor
              </button>
            </li>

            {/* Risk Item 2 */}
            <li className="p-4 bg-canvas rounded-xl border border-border">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm font-bold text-primary">Meera Singh</p>
                  <p className="text-xs text-secondary">Grade 9 • Arts</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-warning">74% Risk</span>
                  <span className="text-[10px] text-muted uppercase tracking-wider">Academic</span>
                </div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-border text-xs text-secondary mb-3">
                <strong className="text-primary block mb-1">AI Insight:</strong>
                Sudden 30% drop in Mathematics scores compared to previous term average.
              </div>
              <button className="w-full py-1.5 text-xs font-semibold text-primary bg-white border border-border rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                Schedule Parent Meeting
              </button>
            </li>

          </ul>
        </div>
      </div>

    </div>
  );
}
