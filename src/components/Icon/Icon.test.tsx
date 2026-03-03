import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("renders an SVG for a known icon name", () => {
    const { container } = render(<Icon name="check" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders nothing for an unknown icon name", () => {
    // @ts-expect-error — testing runtime behaviour with invalid name
    const { container } = render(<Icon name="not-a-real-icon-xyz" />);
    expect(container.firstChild).toBeNull();
  });

  it("sets aria-hidden on the svg", () => {
    const { container } = render(<Icon name="star" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("forwards custom className", () => {
    const { container } = render(<Icon name="home" className="text-red-500" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("text-red-500");
  });

  it("applies default size of 24", () => {
    const { container } = render(<Icon name="bell" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "24");
    expect(svg).toHaveAttribute("height", "24");
  });

  it("applies custom size", () => {
    const { container } = render(<Icon name="bell" size={16} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "16");
    expect(svg).toHaveAttribute("height", "16");
  });

  it.each(["check", "star", "home", "user", "search", "x"] as const)(
    "renders icon '%s' without throwing",
    (name) => {
      const { container } = render(<Icon name={name} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    }
  );
});
