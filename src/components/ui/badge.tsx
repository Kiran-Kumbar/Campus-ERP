import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "danger"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  
  const variants = {
    default: "border-transparent bg-[#14212B] text-white",
    secondary: "border-transparent bg-[#F1F1EC] text-[#14212B]",
    outline: "border-[#D9DDD9] text-[#14212B]",
    success: "border-transparent bg-[#28745A] text-white",
    warning: "border-transparent bg-[#B7791F] text-white",
    danger: "border-transparent bg-[#B84A4A] text-white",
  }

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  )
}

export { Badge }
