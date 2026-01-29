import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-lg border border-gray-400 hover:border-gray-500 bg-white hover:bg-gray-25 px-3.5 py-2.5 text-base text-gray-800 placeholder:text-gray-700 focus-visible:outline-none focus-visible:border-blue-700 focus-visible:ring-1 focus-visible:ring-blue-700 disabled:cursor-not-allowed disabled:opacity-50 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]",
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
