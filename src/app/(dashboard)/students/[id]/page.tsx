import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Calendar, Clock, CreditCard, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Student360Page({ params }: { params: { id: string } }) {
  // In a real app, we fetch student data via params.id from Drizzle
  return (
    <div className="space-y-6">
      
      {/* Back navigation */}
      <div className="flex items-center gap-2">
        <Link href="/students" className="text-secondary hover:text-primary transition-colors flex items-center text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Directory
        </Link>
      </div>

      {/* Profile Header */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-level-1 flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="h-24 w-24 rounded-full bg-[#E2E8F0] border-4 border-white shadow-sm flex items-center justify-center text-3xl font-bold text-primary flex-shrink-0">
          KM
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-primary tracking-tight">Kabir Malhotra</h1>
              <p className="text-sm text-secondary flex items-center gap-2 mt-1">
                STU-10482 <span className="text-border">|</span> Grade 10 <span className="text-border">|</span> Enrolled: Aug 2026
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline"><Mail className="w-4 h-4 mr-2" /> Message</Button>
              <Button>Edit Profile</Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <Badge variant="success">Active Status</Badge>
            <div className="flex items-center text-sm text-secondary"><Phone className="w-4 h-4 mr-1.5" /> +91 98765 43210</div>
            <div className="flex items-center text-sm text-secondary"><MapPin className="w-4 h-4 mr-1.5" /> Andheri West, Mumbai</div>
          </div>
        </div>
      </div>

      {/* 360 Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Academic & Attendance Summary */}
        <div className="space-y-6 lg:col-span-2">
          
          <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-primary mb-4 flex items-center"><Clock className="w-5 h-5 mr-2 text-secondary" /> Attendance Overview</h2>
            <div className="flex gap-8 items-center">
               <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-success">
                 <span className="text-2xl font-bold text-primary">94%</span>
               </div>
               <div className="space-y-2 flex-1">
                 <div className="flex justify-between text-sm">
                   <span className="text-secondary">Present Days</span>
                   <span className="font-medium text-primary">42</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-secondary">Absent Days</span>
                   <span className="font-medium text-danger">2</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-secondary">Late Arrivals</span>
                   <span className="font-medium text-warning">1</span>
                 </div>
               </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-primary mb-4 flex items-center"><Calendar className="w-5 h-5 mr-2 text-secondary" /> Recent Academic Performance</h2>
            <div className="text-sm text-muted">
              Grades and examination timelines will render here from Phase 11.
            </div>
          </div>

        </div>

        {/* Right Column: Fees & Quick Actions */}
        <div className="space-y-6">
          
          <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-primary mb-4 flex items-center"><CreditCard className="w-5 h-5 mr-2 text-secondary" /> Fee Status</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-md border border-border bg-canvas">
                <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-1">Term 1 Fees</p>
                <div className="flex justify-between items-end">
                  <p className="text-xl font-semibold text-primary">₹1,20,000</p>
                  <Badge variant="success">Paid</Badge>
                </div>
              </div>
              <div className="p-4 rounded-md border border-danger/20 bg-danger/5">
                <p className="text-xs font-medium text-danger uppercase tracking-wider mb-1">Term 2 Fees</p>
                <div className="flex justify-between items-end">
                  <p className="text-xl font-semibold text-danger">₹1,20,000</p>
                  <Badge variant="danger">Overdue</Badge>
                </div>
                <p className="text-xs text-danger mt-2">Due on Aug 15, 2026</p>
              </div>
              <Button className="w-full mt-2" variant="outline">View Full Ledger</Button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
