import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("bg-primary");
  });

  it("applies secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-secondary");
  });

  it("applies tertiary variant", () => {
    render(<Button variant="tertiary">Tertiary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-tertiary");
  });

  it("renders as disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders as disabled and aria-busy when loading", () => {
    render(<Button loading aria-label="Loading…">Loading</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
  });

  it("renders with block class when block prop is true", () => {
    render(<Button block>Block</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", async () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders iconLeft slot", () => {
    render(<Button iconLeft={<span data-testid="icon-left" />}>With icon</Button>);
    expect(screen.getByTestId("icon-left")).toBeInTheDocument();
  });

  it("renders iconRight slot", () => {
    render(<Button iconRight={<span data-testid="icon-right" />}>With icon</Button>);
    expect(screen.getByTestId("icon-right")).toBeInTheDocument();
  });

  it.each(["lg", "md", "sm"] as const)("applies %s size class", (size) => {
    render(<Button size={size}>Btn</Button>);
    const btn = screen.getByRole("button");
    // Each size has a unique height class
    const sizeClassMap = { lg: "h-12", md: "h-10", sm: "h-9" };
    expect(btn).toHaveClass(sizeClassMap[size]);
  });
});
