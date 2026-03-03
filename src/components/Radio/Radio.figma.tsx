import figma from "@figma/code-connect";
import { Radio } from "./Radio";

// TODO: replace node-id once the Radio frame is added to Figma
figma.connect(
  Radio,
  "https://www.figma.com/design/wVzc4wbNrfKR9awe8UU401/Design-System?node-id=RADIO_NODE_ID",
  {
    props: {
      disabled: figma.enum("State", { true: "Disabled" }),
    },
    example: ({ disabled }) => (
      <Radio label="Label" disabled={disabled} />
    ),
  }
);
