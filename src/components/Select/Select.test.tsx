import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Select } from "./Select";

const OPTIONS = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C", disabled: true },
];

describe("Select", () => {
  it("renders a combobox", () => {
    render(<Select options={OPTIONS} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders all options", () => {
    render(<Select options={OPTIONS} />);
    expect(screen.getByRole("option", { name: "Option A" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Option B" })).toBeInTheDocument();
  });

  it("renders placeholder as first disabled option", () => {
    render(<Select options={OPTIONS} placeholder="Choose one" />);
    const opt = screen.getByRole("option", { name: "Choose one" });
    expect(opt).toBeDisabled();
  });

  it("renders label and associates it with select", () => {
    render(<Select options={OPTIONS} label="Country" />);
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
  });

  it("renders hint text", () => {
    render(<Select options={OPTIONS} hint="Pick any option" />);
    expect(screen.getByText("Pick any option")).toBeInTheDocument();
  });

  it("renders error and sets aria-invalid", () => {
    render(<Select options={OPTIONS} error="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
  });

  it("error takes priority over hint", () => {
    render(<Select options={OPTIONS} hint="Hint" error="Error" />);
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.queryByText("Hint")).not.toBeInTheDocument();
  });

  it("renders as disabled", () => {
    render(<Select options={OPTIONS} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("renders required asterisk", () => {
    render(<Select options={OPTIONS} label="Field" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("allows selecting a value", async () => {
    render(<Select options={OPTIONS} />);
    await userEvent.selectOptions(screen.getByRole("combobox"), "b");
    expect(screen.getByRole("combobox")).toHaveValue("b");
  });

  it.each(["lg", "md", "sm"] as const)("renders size %s without throwing", (size) => {
    const { container } = render(<Select options={OPTIONS} size={size} />);
    expect(container.querySelector("select")).toBeInTheDocument();
  });
});
