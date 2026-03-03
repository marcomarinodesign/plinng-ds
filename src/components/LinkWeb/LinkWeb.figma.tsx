import figma from "@figma/code-connect";
import { LinkWeb } from "./LinkWeb";

/**
 * Figma: DS---Buttons → frame "link_web" (node 1:1529)
 * Properties mapped from symbol names:
 *   Style         → variant   (Primary/Secondary/Tertiary)
 *   Option        → option    (Default/Alternative)
 *   Size          → size      (Large=lg / Medium=md)
 *   State         → aria-disabled
 *   Icon Position → iconLeft / iconRight
 */
figma.connect(
  LinkWeb,
  "https://www.figma.com/design/wVzc4wbNrfKR9awe8UU401/DS---Buttons?node-id=1-1529",
  {
    props: {
      variant: figma.enum("Style", {
        primary: "Primary",
        secondary: "Secondary",
        tertiary: "Tertiary",
      }),
      option: figma.enum("Option", {
        default: "Default",
        alternative: "Alternative",
      }),
      size: figma.enum("Size", {
        lg: "Large",
        md: "Medium",
      }),
      disabled: figma.enum("State", {
        true: "Disabled",
      }),
      iconLeft: figma.boolean("Icon", {
        true: figma.enum("Icon Position", {
          left: "False",  // Icon Position=False means icon on left in Figma naming
        }),
        false: undefined,
      }),
      iconRight: figma.boolean("Icon", {
        true: figma.enum("Icon Position", {
          right: "True",  // Icon Position=True means icon on right in Figma naming
        }),
        false: undefined,
      }),
    },
    example: ({ variant, option, size, disabled }) => (
      <LinkWeb
        href="#"
        variant={variant}
        option={option}
        size={size}
        aria-disabled={disabled}
      >
        Link label
      </LinkWeb>
    ),
  }
);
