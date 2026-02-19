import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 14l-3.5-3.5M11 6.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 8s2.667-5 7-5 7 5 7 5-2.667 5-7 5-7-5-7-5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const meta = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    size: {
      control: "select",
      options: ["lg", "md", "sm"],
    },
    block: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Placeholder...",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Default ---

export const Default: Story = {};

// --- With Label ---

export const WithLabel: Story = {
  name: "Label",
  args: {
    label: "Email",
    placeholder: "you@example.com",
  },
};

// --- With Hint ---

export const WithHint: Story = {
  name: "Hint",
  args: {
    label: "Username",
    hint: "Must be at least 3 characters.",
    placeholder: "johndoe",
  },
};

// --- Error ---

export const Error: Story = {
  args: {
    label: "Email",
    error: "This field is required.",
    placeholder: "you@example.com",
  },
};

// --- Sizes ---

export const SizeLarge: Story = {
  name: "Size / Large",
  args: { size: "lg" },
};

export const SizeMedium: Story = {
  name: "Size / Medium",
  args: { size: "md" },
};

export const SizeSmall: Story = {
  name: "Size / Small",
  args: { size: "sm" },
};

// --- States ---

export const Disabled: Story = {
  args: { label: "Email", disabled: true, placeholder: "you@example.com" },
};

// --- Icons ---

export const IconLeft: Story = {
  name: "Icon / Left",
  args: { iconLeft: <SearchIcon /> },
};

export const IconRight: Story = {
  name: "Icon / Right",
  args: { iconRight: <EyeIcon /> },
};

export const IconBoth: Story = {
  name: "Icon / Both",
  args: { iconLeft: <SearchIcon />, iconRight: <EyeIcon /> },
};

// --- Block ---

export const Block: Story = {
  args: { block: true, label: "Full width" },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
};

// --- Gallery ---

export const AllVariants: Story = {
  name: "Gallery / All Variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      {(["lg", "md", "sm"] as const).map((size) => (
        <Input key={size} size={size} label={`Size ${size}`} placeholder="Placeholder..." />
      ))}
      <Input label="With hint" hint="This is a helper text." placeholder="Placeholder..." />
      <Input label="With error" error="Something went wrong." placeholder="Placeholder..." />
      <Input label="Disabled" disabled placeholder="Placeholder..." />
      <Input label="Icon left" iconLeft={<SearchIcon />} placeholder="Search..." />
      <Input label="Icon right" iconRight={<EyeIcon />} placeholder="Password" type="password" />
    </div>
  ),
};
