import figma from "@figma/code-connect";
import { Checkbox } from "./Checkbox";

// TODO: replace node-id once the Checkbox frame is added to Figma
figma.connect(
  Checkbox,
  "https://www.figma.com/design/wVzc4wbNrfKR9awe8UU401/Design-System?node-id=CHECKBOX_NODE_ID",
  {
    props: {
      disabled: figma.enum("State", { true: "Disabled" }),
      indeterminate: figma.enum("State", { true: "Indeterminate" }),
    },
    example: ({ disabled, indeterminate }) => (
      <Checkbox label="Label" disabled={disabled} indeterminate={indeterminate} />
    ),
  }
);
