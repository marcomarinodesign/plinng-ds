import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      control: "select",
      options: ["lg", "md", "sm"],
    },
    block: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Button",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/wVzc4wbNrfKR9awe8UU401/DS---Buttons?node-id=0-1",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Variants ---

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Tertiary: Story = {
  args: { variant: "tertiary" },
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
  args: { disabled: true },
};

export const DisabledSecondary: Story = {
  name: "Disabled / Secondary",
  args: { variant: "secondary", disabled: true },
};

export const DisabledTertiary: Story = {
  name: "Disabled / Tertiary",
  args: { variant: "tertiary", disabled: true },
};

export const Loading: Story = {
  args: { loading: true },
};

export const LoadingSecondary: Story = {
  name: "Loading / Secondary",
  args: { variant: "secondary", loading: true },
};

export const LoadingTertiary: Story = {
  name: "Loading / Tertiary",
  args: { variant: "tertiary", loading: true },
};

// --- Icons ---

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.333 8h9.334M8 3.333 12.667 8 8 12.667"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 3.333v9.334M3.333 8h9.334"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconLeft: Story = {
  name: "Icon / Left",
  args: { iconLeft: <PlusIcon /> },
};

export const IconRight: Story = {
  name: "Icon / Right",
  args: { iconRight: <ArrowIcon /> },
};

export const IconBoth: Story = {
  name: "Icon / Both",
  args: { iconLeft: <PlusIcon />, iconRight: <ArrowIcon /> },
};

// --- Block Mode ---

export const Block: Story = {
  args: { block: true },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
};

// --- All Variants × Sizes ---

export const AllVariants: Story = {
  name: "Gallery / All Variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {(["primary", "secondary", "tertiary"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {(["lg", "md", "sm"] as const).map((size) => (
            <Button key={`${variant}-${size}`} variant={variant} size={size}>
              {variant} {size}
            </Button>
          ))}
          <Button variant={variant} disabled>
            disabled
          </Button>
          <Button variant={variant} loading>
            loading
          </Button>
        </div>
      ))}
    </div>
  ),
};
