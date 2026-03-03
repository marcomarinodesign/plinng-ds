import { type InputHTMLAttributes, useId, useRef, useEffect } from "react";
import { clsx } from "clsx";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  hint?: string;
  error?: string;
  indeterminate?: boolean;
}

export function Checkbox({
  label,
  hint,
  error,
  indeterminate = false,
  disabled,
  className,
  id: idProp,
  ...rest
}: CheckboxProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const ref = useRef<HTMLInputElement>(null);
  const hasError = Boolean(error);
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedById = error ? errorId : hint ? hintId : undefined;

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className="flex flex-col gap-1">
      <label
        className={clsx(
          "inline-flex items-start gap-2 cursor-pointer select-none",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <span className="relative mt-0.5 flex shrink-0">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={describedById}
            className={clsx(
              "peer appearance-none h-4 w-4 rounded border border-tertiary-border bg-white cursor-pointer transition-colors",
              "checked:bg-primary checked:border-primary",
              "indeterminate:bg-primary indeterminate:border-primary",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
              hasError && "border-red-500",
              disabled && "cursor-not-allowed",
              className,
            )}
            {...rest}
          />
          {/* Check icon */}
          <svg
            className="pointer-events-none absolute inset-0 m-auto hidden h-2.5 w-2.5 text-white peer-checked:block"
            viewBox="0 0 10 8"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 4l3 3 5-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Indeterminate icon */}
          <svg
            className="pointer-events-none absolute inset-0 m-auto hidden h-2.5 w-2.5 text-white peer-indeterminate:block"
            viewBox="0 0 10 2"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1h8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
        {label && (
          <span
            className={clsx(
              "text-sm leading-5 font-medium text-primary",
              disabled && "text-disabled",
            )}
          >
            {label}
          </span>
        )}
      </label>

      {(error || hint) && (
        <p
          id={error ? errorId : hintId}
          className={clsx(
            "ml-6 text-xs leading-none",
            hasError ? "text-red-500" : "text-disabled/60",
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
