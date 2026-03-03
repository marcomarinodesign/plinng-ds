import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  args: { label: "Accept terms and conditions" },
  argTypes: {
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { indeterminate: true } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledChecked: Story = { name: "Disabled / Checked", args: { disabled: true, defaultChecked: true } };
export const WithHint: Story = { args: { hint: "You must accept to continue." } };
export const WithError: Story = { args: { error: "This field is required." } };
export const NoLabel: Story = { args: { label: undefined, "aria-label": "Accept" } };
