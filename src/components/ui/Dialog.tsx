"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
  className,
  children,
  title,
  description,
  showCloseButton = true,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  title: string;
  description?: string;
  showCloseButton?: boolean;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-fade-up" />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50 flex flex-col bg-bg-raised text-fg shadow-2xl focus:outline-none",
          "inset-x-0 bottom-0 top-auto h-[92dvh] rounded-t-2xl border-t border-border",
          "sm:inset-auto sm:left-1/2 sm:top-1/2 sm:h-auto sm:max-h-[85vh] sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:border",
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border p-5">
          <div>
            <DialogPrimitive.Title className="font-heading text-lg font-medium text-fg">
              {title}
            </DialogPrimitive.Title>
            {description && (
              <DialogPrimitive.Description className="mt-1 text-sm text-fg-muted">
                {description}
              </DialogPrimitive.Description>
            )}
          </div>
          {showCloseButton && (
            <DialogPrimitive.Close
              className="focus-ring shrink-0 rounded-full border border-border p-2 text-fg-muted hover:text-fg"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </DialogPrimitive.Close>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
