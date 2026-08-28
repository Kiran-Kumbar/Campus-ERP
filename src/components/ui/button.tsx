import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "outline" | "ghost" | "link" | "danger"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Strict design token enforcement: 10px radius, specific semantic colors
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-[#0F766E] text-white hover:bg-[#0B625C] shadow-sm",
      outline: "border border-[#D9DDD9] bg-transparent hover:bg-[#F1F1EC] text-[#14212B]",
      ghost: "hover:bg-[#F1F1EC] text-[#14212B]",
      link: "text-[#0F766E] underline-offset-4 hover:underline",
      danger: "bg-[#B84A4A] text-white hover:bg-[#9b3e3e] shadow-sm",
    }
    
    const sizes = {
      default: "h-9 px-4 py-2",
      sm: "h-8 px-3 text-xs",
      lg: "h-10 px-8",
      icon: "h-9 w-9",
    }

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
