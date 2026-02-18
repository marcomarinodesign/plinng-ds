import type { Meta, StoryObj } from "@storybook/react-vite";
import { LinkWeb } from "./LinkWeb";

const meta = {
  title: "Components/LinkWeb",
  component: LinkWeb,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
    },
    option: {
      control: "select",
      options: ["default", "alternative"],
    },
    size: {
      control: "select",
      options: ["lg", "md"],
    },
    children: { control: "text" },
  },
  args: {
    children: "Link",
    href: "#",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/wVzc4wbNrfKR9awe8UU401/DS---Buttons?node-id=1-1528",
    },
  },
} satisfies Meta<typeof LinkWeb>;

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

export const PrimaryAlternative: Story = {
  name: "Primary / Alternative",
  args: { variant: "primary", option: "alternative" },
  decorators: [
    (Story) => (
      <div style={{ background: "#000", padding: 24 }}>
        <Story />
      </div>
    ),
  ],
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

// --- States ---

export const Disabled: Story = {
  args: { "aria-disabled": true },
};

export const DisabledSecondary: Story = {
  name: "Disabled / Secondary",
  args: { variant: "secondary", "aria-disabled": true },
};

export const DisabledTertiary: Story = {
  name: "Disabled / Tertiary",
  args: { variant: "tertiary", "aria-disabled": true },
};

export const DisabledPrimaryAlternative: Story = {
  name: "Disabled / Primary Alternative",
  args: { variant: "primary", option: "alternative", "aria-disabled": true },
  decorators: [
    (Story) => (
      <div style={{ background: "#000", padding: 24 }}>
        <Story />
      </div>
    ),
  ],
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

// --- All Variants × Sizes ---

export const AllVariants: Story = {
  name: "Gallery / All Variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {(["primary", "secondary", "tertiary"] as const).map((variant) => (
        <div key={variant}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {(["lg", "md"] as const).map((size) => (
              <LinkWeb
                key={`${variant}-${size}`}
                variant={variant}
                size={size}
                href="#"
              >
                {variant} {size}
              </LinkWeb>
            ))}
            <LinkWeb variant={variant} href="#" aria-disabled>
              disabled
            </LinkWeb>
          </div>
        </div>
      ))}
      {/* Primary alternative on dark background */}
      <div style={{ background: "#000", padding: 12, borderRadius: 8 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {(["lg", "md"] as const).map((size) => (
            <LinkWeb
              key={`alt-${size}`}
              variant="primary"
              option="alternative"
              size={size}
              href="#"
            >
              alt {size}
            </LinkWeb>
          ))}
          <LinkWeb
            variant="primary"
            option="alternative"
            href="#"
            aria-disabled
          >
            alt disabled
          </LinkWeb>
        </div>
      </div>
    </div>
  ),
};
