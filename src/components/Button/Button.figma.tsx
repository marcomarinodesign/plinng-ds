import figma from "@figma/code-connect";
import { Button } from "./Button";

/**
 * Figma: DS---Buttons → frame "button_web" (node 1:62)
 * Properties mapped from symbol names:
 *   Style   → variant
 *   Size    → size
 *   Block   → block
 *   State   → disabled / loading
 *   Icon + Icon Position → iconLeft / iconRight
 */
figma.connect(
  Button,
  "https://www.figma.com/design/wVzc4wbNrfKR9awe8UU401/DS---Buttons?node-id=1-62",
  {
    props: {
      variant: figma.enum("Style", {
        primary: "Primary",
        secondary: "Secondary",
        tertiary: "Tertiary",
      }),
      size: figma.enum("Size", {
        lg: "Large",
        md: "Medium",
        sm: "Small",
      }),
      block: figma.boolean("Block"),
      disabled: figma.enum("State", {
        true: "Disabled",
      }),
      loading: figma.enum("State", {
        true: "Loading",
      }),
      iconLeft: figma.boolean("Icon", {
        true: figma.enum("Icon Position", {
          left: "Left",
        }),
        false: undefined,
      }),
      iconRight: figma.boolean("Icon", {
        true: figma.enum("Icon Position", {
          right: "Right",
        }),
        false: undefined,
      }),
    },
    example: ({ variant, size, block, disabled, loading }) => (
      <Button
        variant={variant}
        size={size}
        block={block}
        disabled={disabled}
        loading={loading}
      >
        Label
      </Button>
    ),
  }
);
