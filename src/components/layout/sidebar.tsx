"use client";

import Link from "next/link";
import { LayoutDashboard, Users, BookOpen, Calendar, FileText, Settings, ShieldCheck, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

const navigation = [
  { name: 'Overview', href: '/overview', icon: LayoutDashboard },
  { name: 'Admissions', href: '/admissions', icon: ShieldCheck },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Academics', href: '/academics', icon: BookOpen },
  { name: 'Attendance', href: '/attendance', icon: Calendar },
  { name: 'Examinations', href: '/examinations', icon: FileText },
  { name: 'Finance', href: '/finance', icon: GraduationCap },
  { name: 'Administration', href: '/admin', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside className={cn(
      "border-r border-border bg-surface h-screen sticky top-0 flex-col hidden lg:flex transition-all duration-300",
      isExpanded ? "w-64" : "w-20"
    )}>
      <div className={cn(
        "h-16 flex items-center border-b border-border transition-all duration-300 relative",
        isExpanded ? "px-6 justify-between" : "px-0 justify-center flex-col h-[100px] gap-2 py-4"
      )}>
        <div className="flex items-center gap-3 overflow-hidden">
          <img src="/logo.png" alt="Riverview Logo" className="w-8 h-8 object-contain shrink-0" />
          {isExpanded && <span className="text-xl font-bold text-primary tracking-tight whitespace-nowrap">Campus ERP</span>}
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "shrink-0 text-muted hover:text-primary bg-canvas border border-border rounded-full",
            isExpanded ? "h-6 w-6 absolute -right-3 top-5 shadow-sm" : "h-8 w-8"
          )}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 overflow-x-hidden">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              title={!isExpanded ? item.name : undefined}
              className={cn(
                "flex items-center py-2 text-sm font-medium rounded-[10px] transition-colors",
                isExpanded ? "px-3" : "px-0 justify-center",
                isActive 
                  ? "bg-[#F1F1EC] text-brand" 
                  : "text-secondary hover:bg-canvas hover:text-primary"
              )}
            >
              <item.icon 
                className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isExpanded && "mr-3",
                  isActive ? "text-brand" : "text-muted"
                )} 
              />
              {isExpanded && <span className="whitespace-nowrap overflow-hidden">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={cn(
        "p-4 border-t border-border flex items-center",
        isExpanded ? "justify-start" : "justify-center"
      )}>
        <div className="flex items-center overflow-hidden">
          <div className="h-8 w-8 rounded-full bg-canvas border border-border flex items-center justify-center text-sm font-bold text-primary shrink-0">
            AD
          </div>
          {isExpanded && (
            <div className="ml-3 whitespace-nowrap">
              <p className="text-sm font-medium text-primary">Admin User</p>
              <p className="text-xs font-medium text-muted">Principal</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
