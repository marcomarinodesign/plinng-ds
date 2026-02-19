import { type ElementType, type HTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type TextVariant =
  | "display"
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "heading-4"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "label"
  | "caption"
  | "overline";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  as?: ElementType;
}

const defaultElement: Record<TextVariant, ElementType> = {
  "display":   "h1",
  "heading-1": "h1",
  "heading-2": "h2",
  "heading-3": "h3",
  "heading-4": "h4",
  "body-lg":   "p",
  "body-md":   "p",
  "body-sm":   "p",
  "label":     "span",
  "caption":   "span",
  "overline":  "span",
};

const variantClasses: Record<TextVariant, string> = {
  "display":   "text-5xl font-bold leading-tight tracking-tight",
  "heading-1": "text-4xl font-bold leading-tight tracking-tight",
  "heading-2": "text-3xl font-bold leading-snug",
  "heading-3": "text-2xl font-semibold leading-snug",
  "heading-4": "text-xl font-semibold leading-normal",
  "body-lg":   "text-lg font-normal leading-relaxed",
  "body-md":   "text-base font-normal leading-relaxed",
  "body-sm":   "text-sm font-normal leading-normal",
  "label":     "text-sm font-semibold leading-none",
  "caption":   "text-xs font-normal leading-snug",
  "overline":  "text-[11px] font-semibold leading-none uppercase tracking-widest",
};

export function Text({
  variant = "body-md",
  as,
  children,
  className,
  ...rest
}: TextProps) {
  const Tag = as ?? defaultElement[variant];

  return (
    <Tag
      className={twMerge(clsx("font-sans text-primary", variantClasses[variant], className))}
      {...rest}
    >
      {children}
    </Tag>
  );
}
