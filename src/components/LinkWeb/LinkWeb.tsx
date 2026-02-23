import { type AnchorHTMLAttributes, type MouseEvent } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface LinkWebProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "tertiary";
  option?: "default" | "alternative";
  size?: "lg" | "md";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const sizeClasses = {
  lg: "py-[9px]",
  md: "py-[8px]",
} as const;

function getVariantClasses(
  variant: "primary" | "secondary" | "tertiary",
  option: "default" | "alternative",
) {
  if (variant === "primary" && option === "alternative") {
    return clsx(
      "text-link-primary-alt",
      "aria-disabled:text-link-primary-alt-disabled aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none",
    );
  }

  if (variant === "primary") {
    return clsx(
      "text-black underline",
      "aria-disabled:text-black aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none",
    );
  }

  if (variant === "secondary") {
    return clsx(
      "text-link-secondary",
      "aria-disabled:text-link-secondary-disabled aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none",
    );
  }

  // tertiary
  return clsx(
    "text-link-tertiary",
    "aria-disabled:text-link-tertiary-disabled aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none",
  );
}

export function LinkWeb({
  variant = "primary",
  option = "default",
  size = "md",
  iconLeft,
  iconRight,
  children,
  className,
  onClick,
  ...rest
}: LinkWebProps) {
  const isDisabled =
    rest["aria-disabled"] === true || rest["aria-disabled"] === "true";

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <a
      className={twMerge(
        clsx(
          "inline-flex items-center justify-center gap-2 rounded-sm font-semibold text-base leading-[22px] transition-colors cursor-pointer",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
          sizeClasses[size],
          getVariantClasses(variant, option),
          className,
        ),
      )}
      onClick={handleClick}
      {...rest}
    >
      {iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
    </a>
  );
}
