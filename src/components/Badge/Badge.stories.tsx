import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "info"],
    },
    size: {
      control: "select",
      options: ["md", "sm"],
    },
    dot: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Badge",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Variants ---

export const Default: Story = {
  args: { variant: "default" },
};

export const Success: Story = {
  args: { variant: "success", children: "Success" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Warning" },
};

export const Error: Story = {
  args: { variant: "error", children: "Error" },
};

export const Info: Story = {
  args: { variant: "info", children: "Info" },
};

// --- Sizes ---

export const SizeMedium: Story = {
  name: "Size / Medium",
  args: { size: "md" },
};

export const SizeSmall: Story = {
  name: "Size / Small",
  args: { size: "sm" },
};

// --- With dot ---

export const WithDot: Story = {
  name: "Dot",
  args: { dot: true, variant: "success", children: "Active" },
};

// --- Gallery ---

export const AllVariants: Story = {
  name: "Gallery / All Variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        {(["default", "success", "warning", "error", "info"] as const).map((v) => (
          <Badge key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        {(["default", "success", "warning", "error", "info"] as const).map((v) => (
          <Badge key={v} variant={v} dot>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        {(["default", "success", "warning", "error", "info"] as const).map((v) => (
          <Badge key={v} variant={v} size="sm">{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
        ))}
      </div>
    </div>
  ),
};
