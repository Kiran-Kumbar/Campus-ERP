import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/server/db";
import { roles } from "@/server/db/schema";
import { createUserAction } from "@/server/actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewUserPage() {
  const allRoles = await db.select().from(roles);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      
      <div className="flex items-center gap-2">
        <Link href="/admin" className="text-secondary hover:text-primary transition-colors flex items-center text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Administration
        </Link>
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-primary tracking-tight">Add System User</h1>
        <p className="text-sm text-secondary">Provision access for a new staff member or administrator.</p>
      </div>

      <div className="bg-surface border border-border rounded-lg shadow-sm">
        <form action={createUserAction} className="p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-primary">First Name</label>
              <Input id="firstName" name="firstName" required placeholder="e.g., Anjali" />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-primary">Last Name</label>
              <Input id="lastName" name="lastName" required placeholder="e.g., Desai" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-primary">Work Email</label>
            <Input id="email" name="email" type="email" required placeholder="e.g., a.desai@riverview.edu" />
            <p className="text-xs text-muted">A temporary password will be sent to this email.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="roleId" className="text-sm font-medium text-primary">System Role</label>
            <select id="roleId" name="roleId" required className="flex h-10 w-full rounded-[10px] border border-border bg-white px-3 py-2 text-sm text-primary ring-offset-canvas file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200">
              <option value="">Select role...</option>
              {allRoles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-border mt-8">
            <Link href="/admin">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Create User</Button>
          </div>

        </form>
      </div>
    </div>
  );
}
