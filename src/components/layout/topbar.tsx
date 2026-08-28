"use client";

import { Bell, Search, MapPin, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { useRole, ERPRole } from "./role-context";

export function Topbar() {
  const { role, setRole, roleDetails } = useRole();

  return (
    <header className="h-16 border-b border-border bg-surface flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10">
      
      <div className="flex items-center text-sm font-medium text-primary flex-1 overflow-hidden mr-4">
        <MobileNav />
        <MapPin className="h-4 w-4 mr-2 text-muted shrink-0" />
        <span className="hidden sm:inline-block truncate">Riverview International Academy</span>
        <span className="hidden sm:inline-block mx-2 text-border">|</span>
        <span className="text-secondary truncate">Main Campus</span>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4">
        
        {/* Active Role Selector (Demo Persona Switcher) */}
        <div className="flex items-center bg-canvas border border-border rounded-lg px-2.5 py-1 gap-2">
          <UserCheck className="h-4 w-4 text-brand shrink-0" />
          <div className="flex flex-col text-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted hidden lg:inline">Active View</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as ERPRole)}
              className="bg-transparent font-semibold text-primary text-xs focus:outline-none cursor-pointer"
            >
              <option value="principal">👑 Principal / Mgmt</option>
              <option value="teacher">👩‍🏫 Teacher / Faculty</option>
              <option value="accountant">💰 Accountant / Finance</option>
              <option value="hr">👨‍💼 HR Manager</option>
              <option value="parent">👨‍👩‍👧 Parent Portal</option>
              <option value="student">🧑‍🎓 Student Portal</option>
            </select>
          </div>
        </div>

        {/* Global Search Shortcut */}
        <div 
          className="hidden md:flex items-center relative w-56 lg:w-64 cursor-text"
          onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
        >
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted pointer-events-none" />
          <div className="flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors pl-9 text-muted hover:border-brand/50">
            Search... (Cmd+K)
          </div>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative rounded-full h-8 w-8 shrink-0">
          <Bell className="h-5 w-5 text-secondary" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-attention rounded-full border border-surface"></span>
        </Button>
      </div>

    </header>
  );
}

