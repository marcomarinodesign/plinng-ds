import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Modal } from "./Modal";

const noop = () => {};

describe("Modal", () => {
  // ── Visibility ───────────────────────────────────────────────────────────

  it("does not render when open=false", () => {
    render(<Modal open={false} onClose={noop} title="Hidden" />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders when open=true", () => {
    render(<Modal open onClose={noop} title="Visible" />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  // ── Content ──────────────────────────────────────────────────────────────

  it("renders title", () => {
    render(<Modal open onClose={noop} title="My Title" />);
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<Modal open onClose={noop} title="T" description="My Description" />);
    expect(screen.getByText("My Description")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <Modal open onClose={noop} title="T">
        <p>Modal body content</p>
      </Modal>
    );
    expect(screen.getByText("Modal body content")).toBeInTheDocument();
  });

  it("renders footer", () => {
    render(
      <Modal open onClose={noop} title="T" footer={<button>Confirm</button>} />
    );
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
  });

  // ── Close button ─────────────────────────────────────────────────────────

  it("shows close button by default", () => {
    render(<Modal open onClose={noop} title="T" />);
    expect(screen.getByRole("button", { name: /cerrar modal/i })).toBeInTheDocument();
  });

  it("hides close button when hideCloseButton=true", () => {
    render(<Modal open onClose={noop} title="T" hideCloseButton />);
    expect(screen.queryByRole("button", { name: /cerrar modal/i })).toBeNull();
  });

  it("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="T" />);
    await userEvent.click(screen.getByRole("button", { name: /cerrar modal/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // ── Escape key ───────────────────────────────────────────────────────────

  it("calls onClose on Escape key", async () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="T" />);
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose on Escape when closeOnEscape=false", async () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="T" closeOnEscape={false} />);
    await userEvent.keyboard("{Escape}");
    expect(onClose).not.toHaveBeenCalled();
  });

  // ── Backdrop ─────────────────────────────────────────────────────────────

  it("calls onClose when backdrop is clicked (default)", async () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="T" />);
    // The backdrop is aria-hidden; click it via its element directly
    const backdrop = document.querySelector("[aria-hidden='true']") as HTMLElement;
    await userEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when backdrop clicked and closeOnBackdrop=false", async () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="T" closeOnBackdrop={false} />);
    const backdrop = document.querySelector("[aria-hidden='true']") as HTMLElement;
    await userEvent.click(backdrop);
    expect(onClose).not.toHaveBeenCalled();
  });

  // ── Accessibility ────────────────────────────────────────────────────────

  it("dialog has aria-modal=true", () => {
    render(<Modal open onClose={noop} title="T" />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("dialog references title via aria-labelledby when title is provided", () => {
    render(<Modal open onClose={noop} title="Accessible title" />);
    const dialog = screen.getByRole("dialog");
    const labelId = dialog.getAttribute("aria-labelledby");
    expect(labelId).toBeTruthy();
    expect(document.getElementById(labelId!)).toHaveTextContent("Accessible title");
  });

  it("uses aria-label when no title is provided", () => {
    render(<Modal open onClose={noop} aria-label="Custom label" />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "Custom label");
  });
});
