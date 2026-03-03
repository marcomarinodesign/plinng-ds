import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";

const COUNTRIES: { value: string; label: string }[] = [
  { value: "es", label: "España" },
  { value: "mx", label: "México" },
  { value: "ar", label: "Argentina" },
  { value: "co", label: "Colombia" },
];

const meta = {
  title: "Components/Select",
  component: Select,
  args: {
    options: COUNTRIES,
    label: "País",
    placeholder: "Selecciona un país",
  },
  argTypes: {
    size: { control: "select", options: ["lg", "md", "sm"] },
    block: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "mx" },
};

export const SizeLarge: Story = { name: "Size / Large", args: { size: "lg" } };
export const SizeMedium: Story = { name: "Size / Medium", args: { size: "md" } };
export const SizeSmall: Story = { name: "Size / Small", args: { size: "sm" } };

export const WithHint: Story = {
  args: { hint: "Selecciona el país donde resides actualmente." },
};

export const WithError: Story = {
  args: { error: "Este campo es obligatorio." },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "es" },
};

export const Block: Story = {
  args: { block: true },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
};

export const Required: Story = {
  args: { required: true },
};
