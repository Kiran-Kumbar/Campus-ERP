import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-[10px] border border-[#D9DDD9] bg-[#FFFFFF] px-3 py-1 text-sm text-[#14212B] shadow-sm transition-colors",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-[#7C878D]",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0F766E] focus-visible:border-[#0F766E]",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F1F1EC]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
