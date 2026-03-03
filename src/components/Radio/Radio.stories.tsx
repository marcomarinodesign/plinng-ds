import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Radio, RadioGroup } from "./Radio";

const meta = {
  title: "Components/Radio",
  component: Radio,
  args: { label: "Option A" },
  argTypes: { disabled: { control: "boolean" } },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledChecked: Story = { name: "Disabled / Checked", args: { disabled: true, defaultChecked: true } };
export const WithHint: Story = { args: { hint: "Additional info about this option." } };
export const WithError: Story = { args: { error: "Please select an option." } };

const OPTIONS = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Enterprise", disabled: true },
];

export const Group: StoryObj = {
  render: () => {
    const [value, setValue] = useState("free");
    return (
      <RadioGroup
        name="plan"
        label="Plan"
        value={value}
        onChange={setValue}
        options={OPTIONS}
      />
    );
  },
};

export const GroupHorizontal: StoryObj = {
  name: "Group / Horizontal",
  render: () => {
    const [value, setValue] = useState("free");
    return (
      <RadioGroup
        name="plan-h"
        label="Plan"
        value={value}
        onChange={setValue}
        options={OPTIONS}
        direction="horizontal"
      />
    );
  },
};

export const GroupWithError: StoryObj = {
  name: "Group / With Error",
  render: () => (
    <RadioGroup
      name="plan-err"
      label="Plan"
      options={OPTIONS}
      error="Please select a plan."
    />
  ),
};
