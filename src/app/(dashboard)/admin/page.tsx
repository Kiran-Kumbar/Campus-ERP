import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/data-table";
import { Search, Plus, Shield, Users, Settings, Database } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-primary tracking-tight">Administration</h1>
          <p className="text-sm text-secondary">Manage system roles, permissions, and institution settings.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Settings className="w-4 h-4 mr-2" /> Global Settings</Button>
          <Link href="/admin/new-user">
            <Button><Plus className="w-4 h-4 mr-2" /> Add User</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border p-5 rounded-[12px] shadow-sm flex flex-col justify-between">
          <div className="flex items-center text-secondary mb-3"><Users className="w-4 h-4 mr-2" /> Active Users</div>
          <p className="text-3xl font-semibold text-primary">2,419</p>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[12px] shadow-sm flex flex-col justify-between">
          <div className="flex items-center text-secondary mb-3"><Shield className="w-4 h-4 mr-2" /> Roles Configured</div>
          <p className="text-3xl font-semibold text-primary">8</p>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[12px] shadow-sm flex flex-col justify-between">
          <div className="flex items-center text-secondary mb-3"><Database className="w-4 h-4 mr-2" /> System Storage</div>
          <p className="text-3xl font-semibold text-primary">42%</p>
          <div className="w-full bg-[#E2E8F0] h-1.5 mt-2 rounded-full overflow-hidden"><div className="bg-brand h-full w-[42%]"></div></div>
        </div>
        <div className="bg-surface border border-border p-5 rounded-[12px] shadow-sm flex flex-col justify-between">
          <div className="flex items-center text-secondary mb-3">System Status</div>
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
            </span>
            <p className="text-lg font-medium text-success">All Systems Operational</p>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg shadow-sm">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center bg-surface-subtle rounded-t-lg gap-4">
          <h2 className="text-lg font-semibold text-primary flex items-center">User Management</h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted" />
              <Input type="search" placeholder="Search users by email or role..." className="pl-9 h-9" />
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-primary">Super Admin</TableCell>
              <TableCell className="text-secondary text-sm">admin@riverview.edu</TableCell>
              <TableCell><Badge variant="outline" className="border-brand text-brand bg-brand/5">Administrator</Badge></TableCell>
              <TableCell className="text-secondary text-sm">Just now</TableCell>
              <TableCell><Badge variant="success">Active</Badge></TableCell>
              <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-primary">Dr. R. Sharma</TableCell>
              <TableCell className="text-secondary text-sm">r.sharma@riverview.edu</TableCell>
              <TableCell><Badge variant="secondary">Faculty Head</Badge></TableCell>
              <TableCell className="text-secondary text-sm">2 hours ago</TableCell>
              <TableCell><Badge variant="success">Active</Badge></TableCell>
              <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-primary">Accounts Desk</TableCell>
              <TableCell className="text-secondary text-sm">finance@riverview.edu</TableCell>
              <TableCell><Badge variant="secondary">Finance Admin</Badge></TableCell>
              <TableCell className="text-secondary text-sm">Yesterday</TableCell>
              <TableCell><Badge variant="success">Active</Badge></TableCell>
              <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-primary">Aarav Mehta</TableCell>
              <TableCell className="text-secondary text-sm">aarav@student.edu</TableCell>
              <TableCell><Badge variant="outline">Student</Badge></TableCell>
              <TableCell className="text-secondary text-sm">3 days ago</TableCell>
              <TableCell><Badge variant="danger">Suspended</Badge></TableCell>
              <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
