import figma from "@figma/code-connect";
import { Text } from "./Text";

/**
 * Figma: Design-System → frame "Typography" (node 145:443)
 * Each instance name maps to a Text variant:
 *   "Hero / Extralarge"        → hero-xl
 *   "Hero / Large"             → hero-lg
 *   "Hero / Medium"            → hero-md
 *   "Hero / Small"             → hero-sm
 *   "Header / H1"              → header-h1
 *   "Header / H2"              → header-h2
 *   "Header / H3"              → header-h3
 *   "Header / H4"              → header-h4
 *   "Header / Subhead regular" → subhead
 *   "Header / Subhead bold"    → subhead-bold
 *   "Body / Editorial regular" → body-editorial
 *   "Body / Editorial bold"    → body-editorial-bold
 *   "Body / Large regular"     → body-lg
 *   "Body / Large bold"        → body-lg-bold
 *   "Body / Small regular"     → body-sm
 */
figma.connect(
  Text,
  "https://www.figma.com/design/wVzc4wbNrfKR9awe8UU401/Design-System?node-id=145-443",
  {
    props: {
      variant: figma.enum("Variant", {
        "hero-xl":             "Hero / Extralarge",
        "hero-lg":             "Hero / Large",
        "hero-md":             "Hero / Medium",
        "hero-sm":             "Hero / Small",
        "header-h1":           "Header / H1",
        "header-h2":           "Header / H2",
        "header-h3":           "Header / H3",
        "header-h4":           "Header / H4",
        "subhead":             "Header / Subhead regular",
        "subhead-bold":        "Header / Subhead bold",
        "body-editorial":      "Body / Editorial regular",
        "body-editorial-bold": "Body / Editorial bold",
        "body-lg":             "Body / Large regular",
        "body-lg-bold":        "Body / Large bold",
        "body-sm":             "Body / Small regular",
        "overline":            "Overline",
        "caption":             "Caption",
      }),
    },
    example: ({ variant }) => (
      <Text variant={variant}>Your text here</Text>
    ),
  }
);
