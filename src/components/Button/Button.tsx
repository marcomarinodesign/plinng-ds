import { type ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "lg" | "md" | "sm";
  block?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const sizeClasses = {
  lg: "h-12 px-8 py-3 text-base leading-[22px]",
  md: "h-10 px-6 py-2 text-base leading-[22px]",
  sm: "h-9 px-[18px] py-1.5 text-base leading-[22px]",
} as const;

const variantClasses = {
  primary: clsx(
    "bg-primary text-primary-text",
    "hover:bg-primary/80 active:bg-primary/70",
    "disabled:bg-primary/50 disabled:cursor-not-allowed disabled:hover:bg-primary/50",
  ),
  secondary: clsx(
    "bg-secondary text-secondary-text",
    "hover:bg-secondary/80 active:bg-secondary/70",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-secondary",
  ),
  tertiary: clsx(
    "bg-tertiary text-tertiary-text border border-tertiary-border",
    "hover:bg-gray-100 active:bg-gray-200",
    "disabled:border-disabled disabled:text-disabled disabled:bg-tertiary disabled:cursor-not-allowed disabled:hover:bg-tertiary",
  ),
} as const;

export function Button({
  variant = "primary",
  size = "md",
  block = false,
  loading = false,
  iconLeft,
  iconRight,
  children,
  disabled,
  className,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={twMerge(
        clsx(
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors cursor-pointer",
          sizeClasses[size],
          variantClasses[variant],
          block && "w-full",
          className,
        ),
      )}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>}
          {children && <span>{children}</span>}
          {iconRight && (
            <span className="inline-flex shrink-0">{iconRight}</span>
          )}
        </>
      )}
    </button>
  );
}
