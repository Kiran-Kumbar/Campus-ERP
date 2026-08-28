import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas flex items-center justify-center p-6">
      <div className="w-full max-w-[400px] bg-surface rounded-[14px] shadow-level-2 border border-border p-8">
        
        {/* Header */}
        <div className="mb-8 text-center flex flex-col items-center">
          <img src="/logo.png" alt="Riverview Logo" className="w-16 h-16 object-contain mb-4" />
          <Badge variant="secondary" className="mb-4">Campus ERP POC</Badge>
          <h1 className="text-2xl font-semibold text-primary tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-muted mt-2">
            Sign in to access your dashboard.
          </p>
        </div>

        {/* Center-Focused Form Layout */}
        <form className="space-y-4" action="/overview">
          <div className="space-y-1.5 flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-primary">
              Email Address
            </label>
            <Input 
              id="email" 
              type="email" 
              placeholder="admin@riverview.edu" 
              defaultValue="campuserp@gmail.com"
              className="pl-9 h-11"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-primary">
                Password
              </label>
              <a href="#" className="text-sm font-medium text-brand hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted" />
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                defaultValue="12345678"
                className="pl-9 h-11"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center text-xs text-muted">
          Secured by Riverview Authentication
        </div>

      </div>
    </main>
  );
}
