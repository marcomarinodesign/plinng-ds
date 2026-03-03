import figma from "@figma/code-connect";
import { Badge } from "./Badge";

/**
 * Figma: Design-System → frame "Badge" (node 189:16355)
 * Properties mapped from symbol names:
 *   Children  → variant  (Default/Success/Warning/Error/Info)
 *   With dot  → dot      (Yes/No)
 *   Size      → size     (Default=md / Small=sm)
 */
figma.connect(
  Badge,
  "https://www.figma.com/design/wVzc4wbNrfKR9awe8UU401/Design-System?node-id=189-16355",
  {
    props: {
      variant: figma.enum("Children", {
        default: "Default",
        success: "Success",
        warning: "Warning",
        error: "Error",
        info: "Info",
      }),
      dot: figma.enum("With dot", {
        true: "Yes",
        false: "No",
      }),
      size: figma.enum("Size", {
        md: "Default",
        sm: "Small",
      }),
    },
    example: ({ variant, dot, size }) => (
      <Badge variant={variant} dot={dot} size={size}>
        Label
      </Badge>
    ),
  }
);
