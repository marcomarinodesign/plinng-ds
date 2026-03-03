import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Toast } from "./Toast";

describe("Toast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ── Rendering ───────────────────────────────────────────────────────────

  it("renders with role=alert", () => {
    render(<Toast title="Hello" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(<Toast title="Test title" />);
    expect(screen.getByText("Test title")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<Toast description="Test description" />);
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders title and description together", () => {
    render(<Toast title="Title" description="Description" />);
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  // ── Variants ────────────────────────────────────────────────────────────

  it("renders default variant without icon", () => {
    const { container } = render(<Toast variant="default" title="Hi" />);
    expect(container.querySelector("svg")).toBeNull();
  });

  it("renders success variant with an icon", () => {
    const { container } = render(<Toast variant="success" title="Done" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders error variant with an icon", () => {
    const { container } = render(<Toast variant="error" title="Oops" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders warning variant with an icon", () => {
    const { container } = render(<Toast variant="warning" title="Watch out" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders info variant with an icon", () => {
    const { container } = render(<Toast variant="info" title="FYI" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  // ── Close button ────────────────────────────────────────────────────────

  it("shows close button when closable=true and onClose is provided", () => {
    render(<Toast title="Hi" closable onClose={() => {}} />);
    expect(screen.getByRole("button", { name: /cerrar/i })).toBeInTheDocument();
  });

  it("does not show close button when closable=false", () => {
    render(<Toast title="Hi" closable={false} onClose={() => {}} />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("does not show close button when onClose is not provided", () => {
    render(<Toast title="Hi" closable />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(<Toast title="Hi" closable onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /cerrar/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // ── Auto-dismiss ────────────────────────────────────────────────────────

  it("does not auto-dismiss when duration=0", () => {
    const onClose = vi.fn();
    render(<Toast title="Hi" onClose={onClose} duration={0} />);
    act(() => { vi.advanceTimersByTime(5000); });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose after duration ms", () => {
    const onClose = vi.fn();
    render(<Toast title="Hi" onClose={onClose} duration={3000} />);
    act(() => { vi.advanceTimersByTime(3000); });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose before duration expires", () => {
    const onClose = vi.fn();
    render(<Toast title="Hi" onClose={onClose} duration={3000} />);
    act(() => { vi.advanceTimersByTime(2999); });
    expect(onClose).not.toHaveBeenCalled();
  });

  // ── Custom className ────────────────────────────────────────────────────

  it("merges custom className", () => {
    render(<Toast title="Hi" className="custom-class" />);
    expect(screen.getByRole("alert")).toHaveClass("custom-class");
  });
});
