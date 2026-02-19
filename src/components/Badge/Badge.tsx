import { type HTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "md" | "sm";
  dot?: boolean;
}

const variantClasses = {
  default: "bg-gray-100 text-gray-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  error: "bg-red-100 text-red-600",
  info: "bg-blue-100 text-blue-700",
} as const;

const dotVariantClasses = {
  default: "bg-gray-500",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
  info: "bg-blue-500",
} as const;

const sizeClasses = {
  md: "px-2.5 py-1 text-xs",
  sm: "px-2 py-0.5 text-[11px]",
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
          "inline-flex items-center gap-1.5 rounded-full font-semibold leading-none",
          sizeClasses[size],
          variantClasses[variant],
          className,
        ),
      )}
      {...rest}
    >
      {dot && (
        <span
          className={clsx("rounded-full shrink-0", dotVariantClasses[variant], size === "md" ? "w-1.5 h-1.5" : "w-1 h-1")}
        />
      )}
      {children}
    </span>
  );
}
