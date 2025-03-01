"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & { children?: React.ReactNode }) {
  return (
    <div className="flex items-center space-x-2">
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        className={cn(
          "peer border-input bg-card hover:bg-accent hover:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-5 shrink-0 rounded-[4px] border shadow-[0_0_0_1px] shadow-border transition-colors outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-current"
        >
          <CheckIcon className="size-4" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {children && (
        <label className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {children}
        </label>
      )}
    </div>
  )
}

export { Checkbox }
