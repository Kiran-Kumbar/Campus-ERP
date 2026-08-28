import { Bell, Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="h-16 border-b border-border bg-surface flex items-center justify-between px-6 sticky top-0 z-10">
      
      {/* Context / Campus Switcher (as requested in PRD) */}
      <div className="flex items-center text-sm font-medium text-primary">
        <MapPin className="h-4 w-4 mr-2 text-muted" />
        Riverview International Academy
        <span className="mx-2 text-border">|</span>
        <span className="text-secondary">Main Campus</span>
      </div>

      <div className="flex items-center space-x-4">
        
        {/* Global Search Shortcut */}
        <div className="relative hidden md:flex items-center w-64">
          <Search className="absolute left-2.5 h-4 w-4 text-muted" />
          <Input 
            type="search" 
            placeholder="Search students, fees... (Cmd+K)" 
            className="pl-9 h-8 bg-canvas border-transparent focus-visible:bg-surface focus-visible:border-brand"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative rounded-full h-8 w-8">
          <Bell className="h-5 w-5 text-secondary" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-attention rounded-full border border-surface"></span>
        </Button>
      </div>

    </header>
  );
}
