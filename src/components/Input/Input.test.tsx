import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<Input label="Email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("associates label with input via id", () => {
    render(<Input label="Username" id="username" />);
    expect(screen.getByLabelText("Username")).toHaveAttribute("id", "username");
  });

  it("renders hint text", () => {
    render(<Input hint="We'll never share your email" />);
    expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
  });

  it("renders error message and sets aria-invalid", () => {
    render(<Input error="This field is required" />);
    const input = screen.getByRole("textbox");
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("error takes priority over hint", () => {
    render(<Input hint="Hint text" error="Error text" />);
    expect(screen.getByText("Error text")).toBeInTheDocument();
    expect(screen.queryByText("Hint text")).not.toBeInTheDocument();
  });

  it("renders as disabled", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("renders required asterisk when required prop is set", () => {
    render(<Input label="Name" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("accepts user input", async () => {
    render(<Input placeholder="Type here" />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("renders iconLeft slot", () => {
    render(<Input iconLeft={<span data-testid="icon-l" />} />);
    expect(screen.getByTestId("icon-l")).toBeInTheDocument();
  });

  it("renders iconRight slot", () => {
    render(<Input iconRight={<span data-testid="icon-r" />} />);
    expect(screen.getByTestId("icon-r")).toBeInTheDocument();
  });

  it.each(["lg", "md", "sm"] as const)("renders %s size without throwing", (size) => {
    const { container } = render(<Input size={size} />);
    expect(container.querySelector("input")).toBeInTheDocument();
  });
});
