import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { LinkWeb } from "./LinkWeb";

describe("LinkWeb", () => {
  it("renders an anchor element", () => {
    render(<LinkWeb href="/home">Go home</LinkWeb>);
    expect(screen.getByRole("link", { name: "Go home" })).toBeInTheDocument();
  });

  it("renders href correctly", () => {
    render(<LinkWeb href="https://example.com">Visit</LinkWeb>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://example.com");
  });

  it("applies primary variant styles by default", () => {
    render(<LinkWeb href="#">Primary</LinkWeb>);
    expect(screen.getByRole("link")).toHaveClass("text-black");
  });

  it("applies secondary variant styles", () => {
    render(<LinkWeb href="#" variant="secondary">Secondary</LinkWeb>);
    expect(screen.getByRole("link")).toHaveClass("text-link-secondary");
  });

  it("applies tertiary variant styles", () => {
    render(<LinkWeb href="#" variant="tertiary">Tertiary</LinkWeb>);
    expect(screen.getByRole("link")).toHaveClass("text-link-tertiary");
  });

  it("does not navigate when aria-disabled is true", async () => {
    const handleClick = vi.fn();
    render(
      <LinkWeb href="/page" aria-disabled={true} onClick={handleClick}>
        Disabled link
      </LinkWeb>
    );
    await userEvent.click(screen.getByRole("link"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("calls onClick when not disabled", async () => {
    const handleClick = vi.fn((e) => e.preventDefault());
    render(<LinkWeb href="#" onClick={handleClick}>Click me</LinkWeb>);
    await userEvent.click(screen.getByRole("link"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("renders iconLeft slot", () => {
    render(
      <LinkWeb href="#" iconLeft={<span data-testid="icon-left" />}>
        Link
      </LinkWeb>
    );
    expect(screen.getByTestId("icon-left")).toBeInTheDocument();
  });

  it("renders iconRight slot", () => {
    render(
      <LinkWeb href="#" iconRight={<span data-testid="icon-right" />}>
        Link
      </LinkWeb>
    );
    expect(screen.getByTestId("icon-right")).toBeInTheDocument();
  });

  it.each(["lg", "md"] as const)("renders size %s without throwing", (size) => {
    const { container } = render(<LinkWeb href="#" size={size}>Link</LinkWeb>);
    expect(container.querySelector("a")).toBeInTheDocument();
  });
});
