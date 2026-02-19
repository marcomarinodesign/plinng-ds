import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text, type TextVariant } from "./Text";

const meta = {
  title: "Components/Text",
  component: Text,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "display",
        "heading-1",
        "heading-2",
        "heading-3",
        "heading-4",
        "body-lg",
        "body-md",
        "body-sm",
        "label",
        "caption",
        "overline",
      ],
    },
    children: { control: "text" },
  },
  args: {
    children: "The quick brown fox jumps over the lazy dog",
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Variants ---

export const Display: Story = {
  args: { variant: "display", children: "Display" },
};

export const Heading1: Story = {
  name: "Heading 1",
  args: { variant: "heading-1", children: "Heading 1" },
};

export const Heading2: Story = {
  name: "Heading 2",
  args: { variant: "heading-2", children: "Heading 2" },
};

export const Heading3: Story = {
  name: "Heading 3",
  args: { variant: "heading-3", children: "Heading 3" },
};

export const Heading4: Story = {
  name: "Heading 4",
  args: { variant: "heading-4", children: "Heading 4" },
};

export const BodyLg: Story = {
  name: "Body LG",
  args: { variant: "body-lg" },
};

export const BodyMd: Story = {
  name: "Body MD",
  args: { variant: "body-md" },
};

export const BodySm: Story = {
  name: "Body SM",
  args: { variant: "body-sm" },
};

export const Label: Story = {
  args: { variant: "label", children: "Label" },
};

export const Caption: Story = {
  args: { variant: "caption", children: "Caption text" },
};

export const Overline: Story = {
  args: { variant: "overline", children: "Overline" },
};

// --- Gallery ---

const allVariants: { variant: TextVariant; label: string; sample: string }[] = [
  { variant: "display",   label: "Display   · 48 · Bold 700",      sample: "Display" },
  { variant: "heading-1", label: "Heading 1 · 36 · Bold 700",      sample: "Heading 1" },
  { variant: "heading-2", label: "Heading 2 · 30 · Bold 700",      sample: "Heading 2" },
  { variant: "heading-3", label: "Heading 3 · 24 · Semibold 600",  sample: "Heading 3" },
  { variant: "heading-4", label: "Heading 4 · 20 · Semibold 600",  sample: "Heading 4" },
  { variant: "body-lg",   label: "Body LG   · 18 · Regular 400",   sample: "The quick brown fox jumps over the lazy dog" },
  { variant: "body-md",   label: "Body MD   · 16 · Regular 400",   sample: "The quick brown fox jumps over the lazy dog" },
  { variant: "body-sm",   label: "Body SM   · 14 · Regular 400",   sample: "The quick brown fox jumps over the lazy dog" },
  { variant: "label",     label: "Label     · 14 · Semibold 600",  sample: "Label text" },
  { variant: "caption",   label: "Caption   · 12 · Regular 400",   sample: "Caption text" },
  { variant: "overline",  label: "Overline  · 11 · Semibold 600",  sample: "Overline" },
];

export const TypeScale: Story = {
  name: "Gallery / Type Scale",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 680 }}>
      {allVariants.map(({ variant, label, sample }) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 11, color: "#b4b290", fontFamily: "monospace" }}>{label}</span>
          <Text variant={variant}>{sample}</Text>
        </div>
      ))}
    </div>
  ),
};
