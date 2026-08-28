import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS classes, resolving conflicts using tailwind-merge.
 * This is essential for our exact spacing/radius/color overrides in the UI components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
