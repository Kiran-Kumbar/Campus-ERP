import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { CommandPalette } from "@/components/ui/command-palette";
import { RoleProvider } from "@/components/layout/role-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleProvider>
      <div className="flex min-h-screen bg-canvas">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar />
          <CommandPalette />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </RoleProvider>
  );
}

