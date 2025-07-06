"use client"

import { cn } from "@/lib/utils"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { DotIcon } from "lucide-react"
import * as React from "react"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  )
}

function SeparatorDots({
  className,
  decorative = true,
  ...props
}: Omit<React.ComponentProps<typeof SeparatorPrimitive.Root>, "orientation">) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      className={cn(className, "flex items-center justify-center gap-3")}
      {...props}
    >
      <span className="rounded-full bg-muted-foreground size-1"></span>
      <span className="rounded-full bg-muted-foreground size-1"></span>
      <span className="rounded-full bg-muted-foreground size-1"></span>
    </SeparatorPrimitive.Root>
  )
}

export { Separator, SeparatorDots }
