import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders as a <span> element", () => {
    render(<Badge>Label</Badge>);
    expect(screen.getByText("Label").tagName).toBe("SPAN");
  });

  it.each(["default", "success", "warning", "error", "info"] as const)(
    "renders %s variant without throwing",
    (variant) => {
      const { container } = render(<Badge variant={variant}>Status</Badge>);
      expect(container.firstChild).toBeInTheDocument();
    }
  );

  it("applies default variant class", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default")).toHaveClass("bg-beige-50");
  });

  it("applies success variant class", () => {
    render(<Badge variant="success">Success</Badge>);
    expect(screen.getByText("Success")).toHaveClass("bg-accent-100");
  });

  it("applies error variant class", () => {
    render(<Badge variant="error">Error</Badge>);
    expect(screen.getByText("Error")).toHaveClass("bg-error-3");
  });

  it("renders dot when dot prop is true", () => {
    const { container } = render(<Badge dot>With dot</Badge>);
    // The dot is a sibling <span> before the text
    const spans = container.querySelectorAll("span > span");
    expect(spans.length).toBeGreaterThan(0);
  });

  it("does not render dot by default", () => {
    render(<Badge>No dot</Badge>);
    const badge = screen.getByText("No dot");
    // No inner span for dot
    expect(badge.querySelectorAll("span").length).toBe(0);
  });

  it("applies md size by default", () => {
    render(<Badge>Medium</Badge>);
    expect(screen.getByText("Medium")).toHaveClass("px-2.5");
  });

  it("applies sm size class", () => {
    render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText("Small")).toHaveClass("px-2");
  });

  it("forwards extra className", () => {
    render(<Badge className="custom-class">Label</Badge>);
    expect(screen.getByText("Label")).toHaveClass("custom-class");
  });
});
