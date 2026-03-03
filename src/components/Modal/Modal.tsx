import {
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
  /** Controls visibility */
  open: boolean;
  /** Called when the modal requests to be closed */
  onClose: () => void;
  /** Modal size */
  size?: ModalSize;
  /** Modal title (rendered in header) */
  title?: ReactNode;
  /** Optional description rendered below the title */
  description?: ReactNode;
  /** Footer content (e.g. action buttons) */
  footer?: ReactNode;
  /** Whether clicking the backdrop closes the modal */
  closeOnBackdrop?: boolean;
  /** Whether pressing Escape closes the modal */
  closeOnEscape?: boolean;
  /** Hide the built-in close (×) button */
  hideCloseButton?: boolean;
  /** Modal body content */
  children?: ReactNode;
  /** Extra className on the dialog panel */
  className?: string;
  /** aria-label used when title is not provided */
  "aria-label"?: string;
}

// ─── Size map ─────────────────────────────────────────────────────────────────

const sizeClass: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full mx-4",
};

// ─── Close icon ───────────────────────────────────────────────────────────────

function IconClose() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Overlay (backdrop) ───────────────────────────────────────────────────────

interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

function Overlay({ onClick, className, ...props }: OverlayProps) {
  return (
    <div
      aria-hidden="true"
      onClick={onClick}
      className={twMerge(clsx("fixed inset-0 bg-black/40 backdrop-blur-sm", className))}
      {...props}
    />
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Modal({
  open,
  onClose,
  size = "md",
  title,
  description,
  footer,
  closeOnBackdrop = true,
  closeOnEscape = true,
  hideCloseButton = false,
  children,
  className,
  "aria-label": ariaLabel,
}: ModalProps) {
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Trap focus + handle Escape
  useEffect(() => {
    if (!open) return;

    const el = dialogRef.current;
    if (!el) return;

    // Focus the dialog itself (or first focusable child)
    const focusable = el.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) {
      (focusable[0] as HTMLElement).focus();
    } else {
      el.focus();
    }

    // Prevent background scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (closeOnEscape && e.key === "Escape") {
      e.stopPropagation();
      onClose();
    }

    // Basic focus trap
    if (e.key === "Tab") {
      const el = dialogRef.current;
      if (!el) return;
      const focusable = Array.from(
        el.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <Overlay onClick={closeOnBackdrop ? onClose : undefined} />

      {/* Dialog panel */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        aria-label={!title ? ariaLabel : undefined}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={twMerge(
          clsx(
            "relative z-10 w-full rounded-2xl bg-white shadow-xl",
            "flex flex-col max-h-[90vh]",
            "outline-none",
            sizeClass[size],
            className
          )
        )}
      >
        {/* Header */}
        {(title || !hideCloseButton) && (
          <div className="flex items-start justify-between gap-4 px-6 pt-6">
            <div className="flex-1 min-w-0">
              {title && (
                <h2
                  id={titleId}
                  className="text-lg font-semibold text-gray-900 leading-6"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id={descId}
                  className="mt-1 text-sm text-gray-500 leading-5"
                >
                  {description}
                </p>
              )}
            </div>

            {!hideCloseButton && (
              <button
                type="button"
                aria-label="Cerrar modal"
                onClick={onClose}
                className={clsx(
                  "shrink-0 rounded-lg p-1.5 -mr-1.5",
                  "text-gray-400 hover:text-gray-600",
                  "hover:bg-gray-100",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400",
                  "transition-colors"
                )}
              >
                <IconClose />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        {children && (
          <div className="flex-1 overflow-y-auto px-6 py-4 text-sm text-gray-700 leading-relaxed">
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div className="flex flex-wrap items-center justify-end gap-3 px-6 pb-6 pt-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
