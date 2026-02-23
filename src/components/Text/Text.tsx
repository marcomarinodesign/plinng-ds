import { type ElementType, type HTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type TextVariant =
  // Hero — responsive (mobile/desktop), always bold
  | "hero-xl"         // Desktop 80px w800 · Mobile 60px w800
  | "hero-lg"         // Desktop 60px w700 · Mobile 45px w700
  | "hero-md"         // Desktop 48px w700 · Mobile 36px w700
  | "hero-sm"         // Desktop 34px w700 · Mobile 30px w700
  // Header — responsive (mobile/desktop), always bold
  | "h1"              // Desktop 30px · Mobile 28px
  | "h2"              // Desktop 28px · Mobile 26px
  | "h3"              // 24px
  | "h4"              // 22px
  | "subhead"         // 20px, regular by default
  // Body
  | "body-editorial"  // 18px
  | "body-lg"         // 16px
  | "body-sm"         // 14px
  // Caption & Overline
  | "caption-lg"      // 12px
  | "caption-sm"      // 11px
  | "overline";       // 12px · bold · uppercase · ls 2px

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  as?: ElementType;
  bold?: boolean;
}

const defaultElement: Record<TextVariant, ElementType> = {
  "hero-xl":        "h1",
  "hero-lg":        "h2",
  "hero-md":        "h2",
  "hero-sm":        "h2",
  "h1":             "h1",
  "h2":             "h2",
  "h3":             "h3",
  "h4":             "h4",
  "subhead":        "h5",
  "body-editorial": "p",
  "body-lg":        "p",
  "body-sm":        "p",
  "caption-lg":     "span",
  "caption-sm":     "span",
  "overline":       "span",
};

// Base classes per variant — mobile-first, desktop via md: prefix
const variantClasses: Record<TextVariant, string> = {
  "hero-xl":        "text-[60px] leading-[70px] tracking-[-1.2px] font-extrabold md:text-[80px] md:leading-[90px] md:tracking-[-1.6px]",
  "hero-lg":        "text-[45px] leading-[55px] tracking-[-0.9px]  font-bold      md:text-[60px] md:leading-[70px] md:tracking-[-1.2px]",
  "hero-md":        "text-[36px] leading-[46px] tracking-[-0.72px] font-bold      md:text-[48px] md:leading-[58px] md:tracking-[-0.96px]",
  "hero-sm":        "text-[30px] leading-[40px] tracking-[-0.6px]  font-bold      md:text-[34px] md:leading-[44px] md:tracking-[-0.68px]",
  "h1":             "text-[28px] leading-[34px] font-bold           md:text-[30px] md:leading-[36px]",
  "h2":             "text-[26px] leading-[32px] font-bold           md:text-[28px] md:leading-[34px]",
  "h3":             "text-[24px] leading-[28px] font-bold",
  "h4":             "text-[22px] leading-[26px] font-bold",
  "subhead":        "text-[20px] leading-[28px] font-normal",
  "body-editorial": "text-[18px] leading-[26px] font-normal",
  "body-lg":        "text-[16px] leading-[22px] font-normal",
  "body-sm":        "text-[14px] leading-[20px] font-normal",
  "caption-lg":     "text-[12px] leading-[16px] font-normal",
  "caption-sm":     "text-[11px] leading-[16px] font-normal",
  "overline":       "text-[12px] leading-[16px] font-bold uppercase tracking-[2px]",
};

export function Text({
  variant = "body-lg",
  as,
  bold,
  children,
  className,
  ...rest
}: TextProps) {
  const Tag = as ?? defaultElement[variant];

  return (
    <Tag
      className={twMerge(
        clsx(
          "font-sans text-primary",
          variantClasses[variant],
          bold && "font-bold",
          className,
        ),
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
