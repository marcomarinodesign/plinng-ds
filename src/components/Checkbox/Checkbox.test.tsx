import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders a checkbox input", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders label text", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("renders checked when defaultChecked is true", () => {
    render(<Checkbox defaultChecked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("renders as disabled", () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("renders hint text", () => {
    render(<Checkbox hint="Optional info" />);
    expect(screen.getByText("Optional info")).toBeInTheDocument();
  });

  it("renders error and sets aria-invalid", () => {
    render(<Checkbox error="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("calls onChange when clicked", async () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalledOnce();
  });

  it("does not call onChange when disabled", async () => {
    const handleChange = vi.fn();
    render(<Checkbox disabled onChange={handleChange} />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("sets indeterminate via ref", () => {
    render(<Checkbox indeterminate />);
    const input = screen.getByRole("checkbox") as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });
});
