"use client"

import * as React from "react"
import { Input } from "./input"
import { Label } from "./label"
import { cn } from "@/lib/utils"

interface TextInputProps extends React.ComponentProps<typeof Input> {
  label: string
  required?: boolean
  htmlFor?: string
  className?: string
  labelClassName?: string
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, required = false, htmlFor, className, labelClassName, ...props }, ref) => {
    const inputId = htmlFor || props.id || `input-${Math.random().toString(36).substr(2, 9)}`
    
    return (
      <div className={cn("space-y-2", className)}>
        <Label 
          htmlFor={inputId} 
          className={cn("text-sm font-medium text-gray-800 mb-2 block", labelClassName)}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <Input
          ref={ref}
          id={inputId}
          {...props}
        />
      </div>
    )
  }
)
TextInput.displayName = "TextInput"

export { TextInput } 