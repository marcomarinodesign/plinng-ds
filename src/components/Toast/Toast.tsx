import {
  useEffect,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
  type ReactElement,
} from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Visual variant */
  variant?: ToastVariant;
  /** Toast title */
  title?: ReactNode;
  /** Toast description / body */
  description?: ReactNode;
  /** Show close button */
  closable?: boolean;
  /** Called when the user closes the toast */
  onClose?: () => void;
  /**
   * Auto-dismiss after this many milliseconds.
   * Set to 0 to disable auto-dismiss.
   */
  duration?: number;
}

// ─── Icon helpers ────────────────────────────────────────────────────────────

function IconSuccess() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconError() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14" r="0.75" fill="currentColor" />
    </svg>
  );
}

function IconWarning() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2L18.66 17H1.34L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14" r="0.75" fill="currentColor" />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Variant styles ───────────────────────────────────────────────────────────

const variantStyles: Record<ToastVariant, { wrapper: string; icon: string; IconComponent: (() => ReactElement) | null }> = {
  default: {
    wrapper: "bg-white border border-gray-200 text-gray-900",
    icon: "text-gray-500",
    IconComponent: null,
  },
  success: {
    wrapper: "bg-green-50 border border-green-200 text-green-900",
    icon: "text-green-600",
    IconComponent: IconSuccess,
  },
  error: {
    wrapper: "bg-red-50 border border-red-200 text-red-900",
    icon: "text-red-600",
    IconComponent: IconError,
  },
  warning: {
    wrapper: "bg-yellow-50 border border-yellow-200 text-yellow-900",
    icon: "text-yellow-700",
    IconComponent: IconWarning,
  },
  info: {
    wrapper: "bg-blue-50 border border-blue-200 text-blue-900",
    icon: "text-blue-600",
    IconComponent: IconInfo,
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Toast({
  variant = "default",
  title,
  description,
  closable = true,
  onClose,
  duration = 0,
  className,
  ...props
}: ToastProps) {
  const styles = variantStyles[variant];
  const { IconComponent } = styles;

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!duration || duration <= 0) return;
    const timer = setTimeout(handleClose, duration);
    return () => clearTimeout(timer);
  }, [duration, handleClose]);

  return (
    <div
      role="alert"
      aria-live="polite"
      className={twMerge(
        clsx(
          "flex items-start gap-3 rounded-xl p-4 shadow-lg w-full max-w-sm",
          styles.wrapper,
          className
        )
      )}
      {...props}
    >
      {/* Leading icon */}
      {IconComponent && (
        <span className={clsx("mt-0.5 shrink-0", styles.icon)}>
          <IconComponent />
        </span>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-semibold leading-5">{title}</p>
        )}
        {description && (
          <p className={clsx("text-sm leading-5", title ? "mt-0.5 opacity-80" : "")}>
            {description}
          </p>
        )}
      </div>

      {/* Close button */}
      {closable && onClose && (
        <button
          type="button"
          aria-label="Cerrar notificación"
          onClick={handleClose}
          className={clsx(
            "shrink-0 mt-0.5 rounded-md p-0.5",
            "opacity-60 hover:opacity-100 focus:outline-none",
            "focus-visible:ring-2 focus-visible:ring-current",
            "transition-opacity"
          )}
        >
          <IconClose />
        </button>
      )}
    </div>
  );
}
