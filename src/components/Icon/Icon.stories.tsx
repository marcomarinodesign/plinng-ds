import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";

const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    size: { control: "number" },
    color: { control: "color" },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: "activity", size: 24 },
};

export const Small: Story = {
  args: { name: "star", size: 16 },
};

export const Large: Story = {
  args: { name: "star", size: 32 },
};

export const Colored: Story = {
  args: { name: "heart", size: 24, color: "#BEFF50" },
};

export const CommonIcons: Story = {
  args: { name: "activity" },
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      {(["search", "settings", "user", "home", "mail", "bell", "heart", "star", "check", "x", "plus", "minus", "arrow-right", "arrow-left", "chevron-down", "chevron-up", "edit", "trash", "copy", "download", "upload", "eye", "eye-off", "lock", "unlock", "info", "alert-circle", "alert-triangle", "check-circle"] as const).map(
        (name) => (
          <div key={name} className="flex flex-col items-center gap-1.5">
            <Icon name={name} size={24} />
            <span className="text-[10px] text-gray-500 font-mono">{name}</span>
          </div>
        )
      )}
    </div>
  ),
};
