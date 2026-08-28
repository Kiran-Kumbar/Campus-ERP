"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, Users, BookOpen, Calendar, FileText, Settings, ShieldCheck, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden flex items-center mr-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(true)}
        className="h-9 w-9 text-secondary"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-surface h-[100dvh] w-full animate-in slide-in-from-left-full duration-300">
          
          <div className="h-16 flex items-center justify-between px-6 border-b border-border bg-surface shrink-0">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Riverview Logo" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold text-primary tracking-tight">Campus ERP</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="h-9 w-9 text-secondary"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 bg-canvas">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-base font-medium rounded-xl transition-colors",
                    isActive 
                      ? "bg-white text-brand shadow-sm border border-border" 
                      : "text-secondary hover:bg-white hover:text-primary border border-transparent"
                  )}
                >
                  <item.icon 
                    className={cn(
                      "mr-4 h-6 w-6 flex-shrink-0",
                      isActive ? "text-brand" : "text-muted"
                    )} 
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border bg-surface shrink-0">
            <div className="flex items-center px-2 py-2">
              <div className="h-10 w-10 rounded-full bg-canvas border border-border flex items-center justify-center text-sm font-bold text-primary shrink-0">
                AD
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-primary">Admin User</p>
                <p className="text-xs font-medium text-muted">Principal</p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
