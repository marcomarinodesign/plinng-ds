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
        "header-h1",
        "header-h2",
        "header-h3",
        "header-h4",
        "subhead",
        "subhead-bold",
        "body-editorial",
        "body-editorial-bold",
        "body-lg",
        "body-lg-bold",
        "body-sm",
        "overline",
        "caption",
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

// --- Hero ---

export const HeroXL: Story = {
  name: "Hero / Extralarge",
  args: { variant: "hero-xl", children: "Hero Extralarge" },
};

export const HeroLg: Story = {
  name: "Hero / Large",
  args: { variant: "hero-lg", children: "Hero Large" },
};

export const HeroMd: Story = {
  name: "Hero / Medium",
  args: { variant: "hero-md", children: "Hero Medium" },
};

export const HeroSm: Story = {
  name: "Hero / Small",
  args: { variant: "hero-sm", children: "Hero Small" },
};

// --- Header ---

export const HeaderH1: Story = {
  name: "Header / H1",
  args: { variant: "header-h1", children: "Header H1" },
};

export const HeaderH2: Story = {
  name: "Header / H2",
  args: { variant: "header-h2", children: "Header H2" },
};

export const HeaderH3: Story = {
  name: "Header / H3",
  args: { variant: "header-h3", children: "Header H3" },
};

export const HeaderH4: Story = {
  name: "Header / H4",
  args: { variant: "header-h4", children: "Header H4" },
};

// --- Subhead ---

export const Subhead: Story = {
  name: "Subhead / Regular",
  args: { variant: "subhead", children: "Subheading regular" },
};

export const SubheadBold: Story = {
  name: "Subhead / Bold",
  args: { variant: "subhead-bold", children: "Subheading bold" },
};

// --- Body ---

export const BodyEditorial: Story = {
  name: "Body / Editorial Regular",
  args: { variant: "body-editorial" },
};

export const BodyEditorialBold: Story = {
  name: "Body / Editorial Bold",
  args: { variant: "body-editorial-bold" },
};

export const BodyLg: Story = {
  name: "Body / Large Regular",
  args: { variant: "body-lg" },
};

export const BodyLgBold: Story = {
  name: "Body / Large Bold",
  args: { variant: "body-lg-bold" },
};

export const BodySm: Story = {
  name: "Body / Small Regular",
  args: { variant: "body-sm" },
};

// --- Utility ---

export const Overline: Story = {
  name: "Overline",
  args: { variant: "overline", children: "Overline" },
};

export const Caption: Story = {
  name: "Caption",
  args: { variant: "caption", children: "Caption text" },
};

// --- Gallery ---

const allVariants: { variant: TextVariant; label: string; sample: string }[] = [
  { variant: "hero-xl",             label: "Hero / Extralarge        · 80 Desktop / 60 Mobile · ExtraBold 800 · lh90 · ls-2", sample: "Hero Extralarge" },
  { variant: "hero-lg",             label: "Hero / Large             · 60 Desktop / 45 Mobile · Bold 700      · lh70 · ls-2", sample: "Hero Large" },
  { variant: "hero-md",             label: "Hero / Medium            · 48 Desktop / 36 Mobile · Bold 700      · lh58 · ls-2", sample: "Hero Medium" },
  { variant: "hero-sm",             label: "Hero / Small             · 34 Desktop / 30 Mobile · Bold 700      · lh44 · ls-2", sample: "Hero Small" },
  { variant: "header-h1",           label: "Header / H1              · 30 Desktop / 28 Mobile · Bold 700      · lh36", sample: "Header H1" },
  { variant: "header-h2",           label: "Header / H2              · 28 Desktop / 26 Mobile · Bold 700      · lh34", sample: "Header H2" },
  { variant: "header-h3",           label: "Header / H3              · 24 · Bold 700           · lh28", sample: "Header H3" },
  { variant: "header-h4",           label: "Header / H4              · 22 · Bold 700           · lh26", sample: "Header H4" },
  { variant: "subhead",             label: "Subhead / Regular        · 20 · Regular 400         · lh28", sample: "Subheading regular" },
  { variant: "subhead-bold",        label: "Subhead / Bold           · 20 · Bold 700            · lh28", sample: "Subheading bold" },
  { variant: "body-editorial",      label: "Body / Editorial         · 18 · Regular 400         · lh26", sample: "The quick brown fox jumps over the lazy dog" },
  { variant: "body-editorial-bold", label: "Body / Editorial Bold    · 18 · Bold 700            · lh26", sample: "The quick brown fox jumps over the lazy dog" },
  { variant: "body-lg",             label: "Body / Large Regular     · 16 · Regular 400         · lh22", sample: "The quick brown fox jumps over the lazy dog" },
  { variant: "body-lg-bold",        label: "Body / Large Bold        · 16 · Bold 700            · lh22", sample: "The quick brown fox jumps over the lazy dog" },
  { variant: "body-sm",             label: "Body / Small Regular     · 14 · Regular 400         · lh20", sample: "The quick brown fox jumps over the lazy dog" },
  { variant: "overline",            label: "Overline                 · 12 · Bold 700            · lh16 · ls+2", sample: "Overline" },
  { variant: "caption",             label: "Caption                  · 12 · Regular 400         · lh16", sample: "Caption text" },
];

export const TypeScale: Story = {
  name: "Gallery / Type Scale",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 800 }}>
      {allVariants.map(({ variant, label, sample }) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 11, color: "#b4b290", fontFamily: "monospace" }}>{label}</span>
          <Text variant={variant}>{sample}</Text>
        </div>
      ))}
    </div>
  ),
};
