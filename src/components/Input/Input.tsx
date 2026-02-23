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
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedById = error ? errorId : hint ? hintId : undefined;

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
          {rest.required && (
            <span aria-hidden="true" className="text-red-500 ml-0.5">*</span>
          )}
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
          aria-invalid={hasError || undefined}
          aria-describedby={describedById}
          className={twMerge(
            clsx(
              "rounded-lg border font-sans bg-white text-primary placeholder:text-disabled/50 outline-none transition-colors",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-black focus-visible:border-transparent",
              sizeClasses[size],
              block ? "w-full" : "w-auto",
              iconLeft && "pl-10",
              iconRight && "pr-10",
              hasError
                ? "border-red-500 focus-visible:outline-red-500"
                : "border-tertiary-border",
              disabled &&
                "border-disabled/30 text-disabled/50 bg-gray-50 cursor-not-allowed placeholder:text-disabled/30",
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
          id={error ? errorId : hintId}
          className={clsx(
            "text-xs leading-none",
            hasError ? "text-red-500" : "text-disabled/60",
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
