import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text, type TextVariant } from "./Text";

const meta = {
  title: "Components/Text",
  component: Text,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "hero-xl",
        "hero-lg",
        "hero-md",
        "hero-sm",
        "h1",
        "h2",
        "h3",
        "h4",
        "subhead",
        "body-editorial",
        "body-lg",
        "body-sm",
        "caption-lg",
        "caption-sm",
        "overline",
      ],
    },
    bold: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "The quick brown fox jumps over the lazy dog",
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Individual stories ---

export const HeroXL: Story = {
  name: "Hero / XL",
  args: { variant: "hero-xl", children: "Hero Extralarge" },
};

export const HeroLG: Story = {
  name: "Hero / LG",
  args: { variant: "hero-lg", children: "Hero Large" },
};

export const HeroMD: Story = {
  name: "Hero / MD",
  args: { variant: "hero-md", children: "Hero Medium" },
};

export const HeroSM: Story = {
  name: "Hero / SM",
  args: { variant: "hero-sm", children: "Hero Small" },
};

export const H1: Story = {
  name: "H1",
  args: { variant: "h1", children: "Heading 1" },
};

export const H2: Story = {
  name: "H2",
  args: { variant: "h2", children: "Heading 2" },
};

export const H3: Story = {
  name: "H3",
  args: { variant: "h3", children: "Heading 3" },
};

export const H4: Story = {
  name: "H4",
  args: { variant: "h4", children: "Heading 4" },
};

export const Subhead: Story = {
  name: "Subhead",
  args: { variant: "subhead", children: "Subheading text" },
};

export const SubheadBold: Story = {
  name: "Subhead / Bold",
  args: { variant: "subhead", bold: true, children: "Subheading bold" },
};

export const BodyEditorial: Story = {
  name: "Body / Editorial",
  args: { variant: "body-editorial" },
};

export const BodyEditorialBold: Story = {
  name: "Body / Editorial Bold",
  args: { variant: "body-editorial", bold: true },
};

export const BodyLg: Story = {
  name: "Body / LG",
  args: { variant: "body-lg" },
};

export const BodyLgBold: Story = {
  name: "Body / LG Bold",
  args: { variant: "body-lg", bold: true },
};

export const BodySm: Story = {
  name: "Body / SM",
  args: { variant: "body-sm" },
};

export const BodySmBold: Story = {
  name: "Body / SM Bold",
  args: { variant: "body-sm", bold: true },
};

export const CaptionLg: Story = {
  name: "Caption / LG",
  args: { variant: "caption-lg", children: "Caption large text" },
};

export const CaptionSm: Story = {
  name: "Caption / SM",
  args: { variant: "caption-sm", children: "Caption small text" },
};

export const Overline: Story = {
  args: { variant: "overline", children: "Overline label" },
};

// --- Gallery ---

type ScaleEntry = { variant: TextVariant; label: string; sample: string; bold?: boolean };

const allVariants: ScaleEntry[] = [
  { variant: "hero-xl",        label: "Hero XL         · 80 Desktop / 60 Mobile · ExtraBold 800", sample: "Hero Extralarge" },
  { variant: "hero-lg",        label: "Hero LG         · 60 Desktop / 45 Mobile · Bold 700",      sample: "Hero Large" },
  { variant: "hero-md",        label: "Hero MD         · 48 Desktop / 36 Mobile · Bold 700",      sample: "Hero Medium" },
  { variant: "hero-sm",        label: "Hero SM         · 34 Desktop / 30 Mobile · Bold 700",      sample: "Hero Small" },
  { variant: "h1",             label: "H1              · 30 Desktop / 28 Mobile · Bold 700",      sample: "Heading 1" },
  { variant: "h2",             label: "H2              · 28 Desktop / 26 Mobile · Bold 700",      sample: "Heading 2" },
  { variant: "h3",             label: "H3              · 24 · Bold 700",                          sample: "Heading 3" },
  { variant: "h4",             label: "H4              · 22 · Bold 700",                          sample: "Heading 4" },
  { variant: "subhead",        label: "Subhead         · 20 · Regular 400",                       sample: "Subheading regular" },
  { variant: "subhead",        label: "Subhead         · 20 · Bold 700",                          sample: "Subheading bold",    bold: true },
  { variant: "body-editorial", label: "Body Editorial  · 18 · Regular 400",                       sample: "The quick brown fox jumps over the lazy dog" },
  { variant: "body-editorial", label: "Body Editorial  · 18 · Bold 700",                          sample: "The quick brown fox jumps over the lazy dog", bold: true },
  { variant: "body-lg",        label: "Body LG         · 16 · Regular 400",                       sample: "The quick brown fox jumps over the lazy dog" },
  { variant: "body-lg",        label: "Body LG         · 16 · Bold 700",                          sample: "The quick brown fox jumps over the lazy dog", bold: true },
  { variant: "body-sm",        label: "Body SM         · 14 · Regular 400",                       sample: "The quick brown fox jumps over the lazy dog" },
  { variant: "body-sm",        label: "Body SM         · 14 · Bold 700",                          sample: "The quick brown fox jumps over the lazy dog", bold: true },
  { variant: "caption-lg",     label: "Caption LG      · 12 · Regular 400",                       sample: "Caption large text" },
  { variant: "caption-lg",     label: "Caption LG      · 12 · Bold 700",                          sample: "Caption large bold",  bold: true },
  { variant: "caption-sm",     label: "Caption SM      · 11 · Regular 400",                       sample: "Caption small text" },
  { variant: "caption-sm",     label: "Caption SM      · 11 · Bold 700",                          sample: "Caption small bold",  bold: true },
  { variant: "overline",       label: "Overline        · 12 · Bold 700 · Uppercase · ls 2px",     sample: "Overline label" },
];

export const TypeScale: Story = {
  name: "Gallery / Type Scale",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 800 }}>
      {allVariants.map(({ variant, label, sample, bold }, i) => (
        <div key={`${variant}-${i}`} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 11, color: "#b4b290", fontFamily: "monospace" }}>{label}</span>
          <Text variant={variant} bold={bold}>{sample}</Text>
        </div>
      ))}
    </div>
  ),
};
