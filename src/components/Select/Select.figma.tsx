import figma from "@figma/code-connect";
import { Select } from "./Select";

// TODO: replace node-id once the Select frame is added to Figma
figma.connect(
  Select,
  "https://www.figma.com/design/wVzc4wbNrfKR9awe8UU401/Design-System?node-id=SELECT_NODE_ID",
  {
    props: {
      size: figma.enum("Size", {
        lg: "Large",
        md: "Medium",
        sm: "Small",
      }),
      disabled: figma.enum("State", { true: "Disabled" }),
    },
    example: ({ size, disabled }) => (
      <Select
        options={[{ value: "opt", label: "Option" }]}
        label="Label"
        size={size}
        disabled={disabled}
      />
    ),
  }
);
