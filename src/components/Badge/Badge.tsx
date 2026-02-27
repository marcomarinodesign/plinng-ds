import { type HTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "md" | "sm";
  dot?: boolean;
}

/**
 * Badge variants aligned with Figma Design System.
 * Uses DS tokens: beige-50, accent-100/700, warning-1/2, error-1/3, info-1/2.
 */
const variantClasses = {
  default: "bg-beige-50 text-black",
  success: "bg-accent-100 text-accent-700",
  warning: "bg-warning-2 text-warning-1",
  error: "bg-error-3 text-error-1",
  info: "bg-info-2 text-info-1",
} as const;

const dotVariantClasses = {
  default: "bg-black",
  success: "bg-accent-700",
  warning: "bg-warning-1",
  error: "bg-error-1",
  info: "bg-info-1",
} as const;

/** Figma: Default px-10 py-4 / Small px-8 py-2. Typography: Caption Large bold (12px) / Small bold (11px). */
const sizeClasses = {
  md: "px-2.5 py-1 text-xs font-bold leading-4",
  sm: "px-2 py-0.5 text-[11px] font-bold leading-4",
} as const;

export function Badge({
  variant = "default",
  size = "md",
  dot = false,
  children,
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center gap-1 rounded-full",
          sizeClasses[size],
          variantClasses[variant],
          className,
        ),
      )}
      {...rest}
    >
      {dot && (
        <span
          className={clsx(
            "rounded-full shrink-0",
            dotVariantClasses[variant],
            size === "md" ? "size-1.5" : "size-1",
          )}
        />
      )}
      {children}
    </span>
  );
}
