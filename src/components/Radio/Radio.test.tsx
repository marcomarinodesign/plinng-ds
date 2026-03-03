import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Radio, RadioGroup } from "./Radio";

const OPTIONS = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C", disabled: true },
];

describe("Radio", () => {
  it("renders a radio input", () => {
    render(<Radio />);
    expect(screen.getByRole("radio")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<Radio label="Option A" />);
    expect(screen.getByText("Option A")).toBeInTheDocument();
  });

  it("renders as disabled", () => {
    render(<Radio disabled />);
    expect(screen.getByRole("radio")).toBeDisabled();
  });

  it("renders hint text", () => {
    render(<Radio hint="Some info" />);
    expect(screen.getByText("Some info")).toBeInTheDocument();
  });

  it("renders error and sets aria-invalid", () => {
    render(<Radio error="Required" />);
    expect(screen.getByRole("radio")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("calls onChange when clicked", async () => {
    const handleChange = vi.fn();
    render(<Radio onChange={handleChange} />);
    await userEvent.click(screen.getByRole("radio"));
    expect(handleChange).toHaveBeenCalledOnce();
  });
});

describe("RadioGroup", () => {
  it("renders all options", () => {
    render(<RadioGroup name="test" options={OPTIONS} />);
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("renders group label as legend", () => {
    render(<RadioGroup name="test" options={OPTIONS} label="Choose plan" />);
    expect(screen.getByText("Choose plan")).toBeInTheDocument();
  });

  it("marks the correct option as checked", () => {
    render(<RadioGroup name="test" options={OPTIONS} value="b" onChange={vi.fn()} />);
    expect(screen.getByLabelText("Option B")).toBeChecked();
    expect(screen.getByLabelText("Option A")).not.toBeChecked();
  });

  it("calls onChange with the selected value", async () => {
    const handleChange = vi.fn();
    render(<RadioGroup name="test" options={OPTIONS} value="a" onChange={handleChange} />);
    await userEvent.click(screen.getByLabelText("Option B"));
    expect(handleChange).toHaveBeenCalledWith("b");
  });

  it("disabled option cannot be clicked", async () => {
    const handleChange = vi.fn();
    render(<RadioGroup name="test" options={OPTIONS} value="a" onChange={handleChange} />);
    expect(screen.getByLabelText("Option C")).toBeDisabled();
  });

  it("renders error message", () => {
    render(<RadioGroup name="test" options={OPTIONS} error="Pick one" />);
    expect(screen.getByText("Pick one")).toBeInTheDocument();
  });

  it("renders hint message", () => {
    render(<RadioGroup name="test" options={OPTIONS} hint="Select your plan" />);
    expect(screen.getByText("Select your plan")).toBeInTheDocument();
  });

  it("renders horizontal layout", () => {
    const { container } = render(
      <RadioGroup name="test" options={OPTIONS} direction="horizontal" />
    );
    expect(container.querySelector(".flex-row")).toBeInTheDocument();
  });
});
