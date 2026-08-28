"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, LayoutDashboard, Users, BookOpen, Calendar, FileText, Settings, ShieldCheck, GraduationCap, Plus, ArrowRight } from "lucide-react";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Handle Keyboard Shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Expose a global event for the Topbar search to trigger this modal
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-command-palette", handleOpen);
    return () => window.removeEventListener("open-command-palette", handleOpen);
  }, []);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setQuery(""); // reset query on open
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const commands = [
    { group: "Navigation", name: "Overview Dashboard", icon: LayoutDashboard, action: () => router.push("/overview") },
    { group: "Navigation", name: "Admissions Pipeline", icon: ShieldCheck, action: () => router.push("/admissions") },
    { group: "Navigation", name: "Student Directory", icon: Users, action: () => router.push("/students") },
    { group: "Navigation", name: "Finance & Fees", icon: GraduationCap, action: () => router.push("/finance") },
    { group: "Quick Actions", name: "Add New Student", icon: Plus, action: () => router.push("/students/new") },
    { group: "Quick Actions", name: "Take Daily Attendance", icon: Calendar, action: () => router.push("/attendance/new") },
    { group: "Quick Actions", name: "Record Fee Payment", icon: Plus, action: () => router.push("/finance/new") },
    { group: "Search Profiles", name: "Aarav Mehta (Student)", icon: ArrowRight, action: () => router.push("/students/APP-2026-001") },
    { group: "Search Profiles", name: "Riya Nair (Student)", icon: ArrowRight, action: () => router.push("/students/APP-2026-002") },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );

  const groups = Array.from(new Set(filteredCommands.map((c) => c.group)));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[20vh] px-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-primary/20 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className="relative bg-surface w-full max-w-2xl rounded-[14px] shadow-2xl border border-border overflow-hidden flex flex-col">
        
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-border">
          <Search className="h-5 w-5 text-muted shrink-0" />
          <input
            autoFocus
            className="flex-1 h-14 bg-transparent outline-none px-3 text-primary placeholder:text-muted text-lg"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="hidden sm:flex text-xs text-muted border border-border px-2 py-1 rounded bg-canvas font-medium">
            ESC
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin">
          {filteredCommands.length === 0 ? (
            <div className="py-14 text-center text-sm text-secondary">
              No results found for <span className="font-medium text-primary">"{query}"</span>
            </div>
          ) : (
            groups.map((group) => (
              <div key={group} className="mb-4 last:mb-0">
                <div className="px-3 py-2 text-xs font-semibold text-secondary uppercase tracking-wider">
                  {group}
                </div>
                <div className="flex flex-col gap-1">
                  {filteredCommands
                    .filter((cmd) => cmd.group === group)
                    .map((cmd) => (
                      <button
                        key={cmd.name}
                        onClick={() => {
                          setIsOpen(false);
                          cmd.action();
                        }}
                        className="flex items-center px-3 py-3 w-full text-left rounded-[10px] hover:bg-[#F1F1EC] hover:text-brand transition-colors group"
                      >
                        <cmd.icon className="h-5 w-5 mr-3 text-muted group-hover:text-brand transition-colors" />
                        <span className="text-sm font-medium text-primary">{cmd.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-canvas border-t border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-secondary font-medium">
            <span className="flex items-center gap-1">
              <span className="border border-border bg-surface px-1.5 py-0.5 rounded shadow-sm text-[10px]">↵</span> to select
            </span>
            <span className="flex items-center gap-1">
              <span className="border border-border bg-surface px-1.5 py-0.5 rounded shadow-sm text-[10px]">↑↓</span> to navigate
            </span>
          </div>
          <div className="text-xs font-bold text-brand">Omni-Command</div>
        </div>
      </div>
    </div>
  );
}
