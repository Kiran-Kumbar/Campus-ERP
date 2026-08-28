"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/data-table";
import { Search, Plus, Shield, Users, Settings, Database, X, CheckCircle2, UserCheck, Lock } from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status: "Active" | "Suspended";
}

const INITIAL_USERS: AdminUser[] = [
  { id: "USR-01", name: "Dr. Vance (Principal)", email: "principal@riverview.edu", role: "Principal", lastLogin: "Just now", status: "Active" },
  { id: "USR-02", name: "Dr. R. Sharma", email: "r.sharma@riverview.edu", role: "Faculty Head", lastLogin: "2 hours ago", status: "Active" },
  { id: "USR-03", name: "Marcus Brody", email: "finance@riverview.edu", role: "Finance Admin", lastLogin: "Yesterday", status: "Active" },
  { id: "USR-04", name: "Elena Rostova", email: "hr@riverview.edu", role: "Head of HR", lastLogin: "3 hours ago", status: "Active" },
  { id: "USR-05", name: "Rohan Patel", email: "rohan.p@student.edu", role: "Student", lastLogin: "3 days ago", status: "Suspended" }
];

export default function AdminPage() {
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Faculty Head"
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newUser: AdminUser = {
      id: `USR-0${users.length + 1}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      lastLogin: "Never",
      status: "Active"
    };

    setUsers([newUser, ...users]);
    setFormData({ name: "", email: "", role: "Faculty Head" });
    setIsAddUserModalOpen(false);
  };

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { 
      ...u, 
      status: u.status === "Active" ? "Suspended" : "Active" 
    } : u));
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">System Administration & RBAC</h1>
          <p className="text-sm text-secondary">Manage system users, access roles, security permissions, and audit logs.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-xs h-9 gap-1.5"><Settings className="w-4 h-4" /> System Settings</Button>
          <Button onClick={() => setIsAddUserModalOpen(true)} className="text-xs h-9 gap-1.5 bg-brand text-white hover:bg-brand-hover">
            <Plus className="w-4 h-4" /> Add System User
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border p-5 rounded-[14px] shadow-sm flex flex-col justify-between">
          <div className="flex items-center text-secondary mb-2 text-xs font-semibold uppercase tracking-wider">
            <Users className="w-4 h-4 mr-2 text-brand" /> Active System Users
          </div>
          <p className="text-2xl font-bold text-primary">2,419 Users</p>
        </div>

        <div className="bg-surface border border-border p-5 rounded-[14px] shadow-sm flex flex-col justify-between">
          <div className="flex items-center text-secondary mb-2 text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-4 h-4 mr-2 text-emerald-600" /> Configured Roles
          </div>
          <p className="text-2xl font-bold text-primary">8 Active Roles</p>
        </div>

        <div className="bg-surface border border-border p-5 rounded-[14px] shadow-sm flex flex-col justify-between">
          <div className="flex items-center text-secondary mb-2 text-xs font-semibold uppercase tracking-wider">
            <Database className="w-4 h-4 mr-2 text-brand" /> System Database Load
          </div>
          <p className="text-2xl font-bold text-primary">42%</p>
          <div className="w-full bg-[#E2E8F0] h-1.5 mt-2 rounded-full overflow-hidden">
            <div className="bg-brand h-full w-[42%]"></div>
          </div>
        </div>

        <div className="bg-surface border border-border p-5 rounded-[14px] shadow-sm flex flex-col justify-between">
          <div className="flex items-center text-secondary mb-2 text-xs font-semibold uppercase tracking-wider">
            Health Check
          </div>
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
            </span>
            <p className="text-sm font-bold text-emerald-700">All Systems Operational</p>
          </div>
        </div>
      </div>

      {/* User Management Table */}
      <div className="bg-surface border border-border rounded-[14px] shadow-sm overflow-hidden space-y-3">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center bg-canvas gap-4">
          <h2 className="text-sm font-bold text-primary flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-brand" /> Registered System Users & Access Privileges
          </h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted" />
            <Input 
              type="search" 
              placeholder="Search user name or role..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-8 text-xs" 
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-canvas border-b border-border">
              <TableHead className="text-xs font-semibold uppercase">User Name</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Email Address</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Assigned Role</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Last Active</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((u) => (
              <TableRow key={u.id} className="hover:bg-canvas/50 transition-colors">
                <TableCell className="font-bold text-primary text-xs">{u.name}</TableCell>
                <TableCell className="text-xs text-secondary font-medium">{u.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-brand/40 text-brand bg-brand/5 text-[10px]">
                    {u.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-secondary">{u.lastLogin}</TableCell>
                <TableCell>
                  <Badge variant={u.status === "Active" ? "success" : "danger"} className="text-[10px]">
                    {u.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => toggleUserStatus(u.id)}
                    className={`text-xs h-7 px-2 font-semibold ${u.status === "Active" ? "text-rose-600 hover:text-rose-700" : "text-emerald-700 hover:text-emerald-800"}`}
                  >
                    {u.status === "Active" ? "Suspend Access" : "Activate User"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ADD USER MODAL */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-[18px] max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Shield className="h-5 w-5 text-brand" /> Provision New User
              </h2>
              <button onClick={() => setIsAddUserModalOpen(false)} className="text-muted hover:text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-primary block mb-1">User Full Name *</label>
                <Input 
                  required 
                  placeholder="e.g. Prof. David Miller" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-9 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-primary block mb-1">Email Address *</label>
                <Input 
                  required 
                  type="email"
                  placeholder="david.m@riverview.edu" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-9 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-primary block mb-1">Assign Access Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full h-9 rounded-md border border-border bg-canvas text-xs px-3 font-medium text-primary focus:outline-none focus:border-brand"
                >
                  <option value="Principal">Principal / Management</option>
                  <option value="Faculty Head">Faculty Head (HOD)</option>
                  <option value="Teacher">Senior Teacher</option>
                  <option value="Finance Admin">Finance Admin</option>
                  <option value="Head of HR">Head of HR</option>
                  <option value="Librarian">Librarian</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setIsAddUserModalOpen(false)} className="h-8 text-xs">
                  Cancel
                </Button>
                <Button type="submit" className="h-8 text-xs bg-brand text-white hover:bg-brand-hover">
                  Provision User Access
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
