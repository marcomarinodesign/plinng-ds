import { type InputHTMLAttributes, useId } from "react";
import { clsx } from "clsx";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  hint?: string;
  error?: string;
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
  label?: string;
  hint?: string;
  error?: string;
  direction?: "vertical" | "horizontal";
}

export function Radio({
  label,
  hint,
  error,
  disabled,
  className,
  id: idProp,
  ...rest
}: RadioProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hasError = Boolean(error);
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedById = error ? errorId : hint ? hintId : undefined;

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
            id={id}
            type="radio"
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={describedById}
            className={clsx(
              "peer appearance-none h-4 w-4 rounded-full border border-tertiary-border bg-white cursor-pointer transition-colors",
              "checked:border-primary checked:border-[5px]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
              hasError && "border-red-500",
              disabled && "cursor-not-allowed",
              className,
            )}
            {...rest}
          />
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

export function RadioGroup({
  name,
  value,
  onChange,
  options,
  label,
  hint,
  error,
  direction = "vertical",
}: RadioGroupProps) {
  const groupId = useId();
  const hasError = Boolean(error);

  return (
    <fieldset className="flex flex-col gap-1.5 border-none p-0 m-0">
      {label && (
        <legend className="text-sm font-semibold leading-none text-primary mb-1.5">
          {label}
        </legend>
      )}

      <div
        className={clsx(
          "flex gap-3",
          direction === "vertical" ? "flex-col" : "flex-row flex-wrap",
        )}
      >
        {options.map((opt) => (
          <Radio
            key={opt.value}
            id={`${groupId}-${opt.value}`}
            name={name}
            value={opt.value}
            label={opt.label}
            disabled={opt.disabled}
            checked={value !== undefined ? value === opt.value : undefined}
            onChange={() => onChange?.(opt.value)}
            error={hasError ? " " : undefined}
          />
        ))}
      </div>

      {(error || hint) && (
        <p
          className={clsx(
            "text-xs leading-none",
            hasError ? "text-red-500" : "text-disabled/60",
          )}
        >
          {error ?? hint}
        </p>
      )}
    </fieldset>
  );
}
