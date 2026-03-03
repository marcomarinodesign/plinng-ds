import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Text } from "./Text";
import type { TextVariant } from "./Text";

describe("Text", () => {
  it("renders children", () => {
    render(<Text>Hello world</Text>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("defaults to body-lg variant and <p> tag", () => {
    render(<Text>Body</Text>);
    const el = screen.getByText("Body");
    expect(el.tagName).toBe("P");
    expect(el).toHaveClass("text-[16px]");
  });

  it("renders hero-xl as <h1>", () => {
    render(<Text variant="hero-xl">Hero</Text>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders header-h1 as <h1>", () => {
    render(<Text variant="header-h1">H1</Text>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders header-h2 as <h2>", () => {
    render(<Text variant="header-h2">H2</Text>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renders header-h3 as <h3>", () => {
    render(<Text variant="header-h3">H3</Text>);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });

  it("renders overline as <span>", () => {
    render(<Text variant="overline">Label</Text>);
    expect(screen.getByText("Label").tagName).toBe("SPAN");
  });

  it("overrides element with as prop", () => {
    render(<Text variant="body-lg" as="div">Custom element</Text>);
    expect(screen.getByText("Custom element").tagName).toBe("DIV");
  });

  it("applies bold class when bold prop is true", () => {
    render(<Text bold>Bold text</Text>);
    expect(screen.getByText("Bold text")).toHaveClass("font-bold");
  });

  it("forwards extra className", () => {
    render(<Text className="text-red-500">Colored</Text>);
    expect(screen.getByText("Colored")).toHaveClass("text-red-500");
  });

  const variants: TextVariant[] = [
    "hero-xl", "hero-lg", "hero-md", "hero-sm",
    "header-h1", "header-h2", "header-h3", "header-h4",
    "subhead", "subhead-bold",
    "body-editorial", "body-editorial-bold",
    "body-lg", "body-lg-bold", "body-sm",
    "overline", "caption",
  ];

  it.each(variants)("renders variant %s without throwing", (variant) => {
    const { container } = render(<Text variant={variant}>Text</Text>);
    expect(container.firstChild).toBeInTheDocument();
  });
});
