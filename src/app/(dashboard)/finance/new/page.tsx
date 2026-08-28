import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function CreateInvoicePage() {
  async function submitAction() {
    "use server";
    redirect("/finance");
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <Link href="/finance" className="text-secondary hover:text-primary transition-colors flex items-center text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Finance
        </Link>
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-primary tracking-tight">Create Invoice</h1>
        <p className="text-sm text-secondary">Issue a new fee request to a student or cohort.</p>
      </div>

      <div className="bg-surface border border-border rounded-lg shadow-sm">
        <form action={submitAction} className="p-6 space-y-6">
          
          <div className="space-y-2">
            <label htmlFor="studentId" className="text-sm font-medium text-primary">Student ID / Name</label>
            <Input id="studentId" name="studentId" required placeholder="Search student by ID or Name..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="feeType" className="text-sm font-medium text-primary">Fee Type</label>
              <select id="feeType" name="feeType" required className="flex h-10 w-full rounded-[10px] border border-border bg-white px-3 py-2 text-sm text-primary ring-offset-canvas file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 transition-all duration-200">
                <option value="">Select fee type...</option>
                <option value="tuition">Tuition Fee</option>
                <option value="hostel">Hostel Fee</option>
                <option value="library">Library Fine</option>
                <option value="other">Other Charges</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium text-primary">Amount (₹)</label>
              <Input id="amount" name="amount" type="number" min="0" step="0.01" required placeholder="0.00" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="dueDate" className="text-sm font-medium text-primary">Due Date</label>
            <Input id="dueDate" name="dueDate" type="date" required />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium text-primary">Additional Notes</label>
            <textarea id="notes" name="notes" rows={3} placeholder="Optional details..." className="flex w-full rounded-[10px] border border-border bg-white px-3 py-2 text-sm text-primary ring-offset-canvas placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 transition-all duration-200"></textarea>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-border mt-8">
            <Link href="/finance">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Issue Invoice</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
