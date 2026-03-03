import { type SelectHTMLAttributes, useId } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: "lg" | "md" | "sm";
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  block?: boolean;
}

const sizeClasses = {
  lg: "h-12 px-4 text-base",
  md: "h-10 px-4 text-base",
  sm: "h-9 px-3 text-sm",
} as const;

// Chevron down icon inline to avoid extra dep
const ChevronDown = () => (
  <svg
    className="pointer-events-none absolute right-3 shrink-0 text-disabled"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Select({
  size = "md",
  label,
  hint,
  error,
  options,
  placeholder,
  block = false,
  disabled,
  className,
  id: idProp,
  ...rest
}: SelectProps) {
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
        <select
          id={id}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={describedById}
          className={twMerge(
            clsx(
              "w-full appearance-none rounded-lg border font-sans bg-white text-primary outline-none transition-colors cursor-pointer pr-9",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-black focus-visible:border-transparent",
              sizeClasses[size],
              !block && "w-auto",
              hasError
                ? "border-red-500 focus-visible:outline-red-500"
                : "border-tertiary-border",
              disabled &&
                "border-disabled/30 text-disabled/50 bg-gray-50 cursor-not-allowed",
              className,
            ),
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown />
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
