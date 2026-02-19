import { type InputHTMLAttributes, useId } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "lg" | "md" | "sm";
  label?: string;
  hint?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  block?: boolean;
}

const sizeClasses = {
  lg: "h-12 px-4 text-base",
  md: "h-10 px-4 text-base",
  sm: "h-9 px-3 text-sm",
} as const;

export function Input({
  size = "md",
  label,
  hint,
  error,
  iconLeft,
  iconRight,
  block = false,
  disabled,
  className,
  id: idProp,
  ...rest
}: InputProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hasError = Boolean(error);

  return (
    <div className={clsx("flex flex-col gap-1.5", block ? "w-full" : "w-fit")}>
      {label && (
        <label
          htmlFor={id}
          className={clsx(
            "text-sm font-semibold leading-none",
            disabled ? "text-disabled" : "text-primary",
          )}
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {iconLeft && (
          <span className="pointer-events-none absolute left-3 inline-flex shrink-0 text-disabled">
            {iconLeft}
          </span>
        )}

        <input
          id={id}
          disabled={disabled}
          className={twMerge(
            clsx(
              "rounded-lg border font-sans bg-white text-primary placeholder:text-disabled outline-none transition-colors",
              "focus:ring-2 focus:ring-primary/20 focus:border-primary",
              sizeClasses[size],
              block ? "w-full" : "w-auto",
              iconLeft && "pl-10",
              iconRight && "pr-10",
              hasError
                ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                : "border-tertiary-border",
              disabled &&
                "border-disabled text-disabled bg-gray-50 cursor-not-allowed placeholder:text-disabled",
              className,
            ),
          )}
          {...rest}
        />

        {iconRight && (
          <span className="pointer-events-none absolute right-3 inline-flex shrink-0 text-disabled">
            {iconRight}
          </span>
        )}
      </div>

      {(error || hint) && (
        <p
          className={clsx(
            "text-xs leading-none",
            hasError ? "text-red-500" : "text-disabled",
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
