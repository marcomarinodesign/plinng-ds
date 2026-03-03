import figma from "@figma/code-connect";
import { Modal } from "./Modal";

// TODO: replace node-id once the Modal frame is added to Figma
figma.connect(
  Modal,
  "https://www.figma.com/design/wVzc4wbNrfKR9awe8UU401/Design-System?node-id=MODAL_NODE_ID",
  {
    props: {
      size: figma.enum("Size", {
        sm: "Small",
        md: "Medium",
        lg: "Large",
        xl: "Xlarge",
      }),
      hideCloseButton: figma.boolean("Close button", {
        true: false,
        false: true,
      }),
    },
    example: ({ size, hideCloseButton }) => (
      <Modal
        open
        onClose={() => {}}
        size={size}
        title="Modal title"
        description="Optional description"
        hideCloseButton={hideCloseButton}
      >
        Modal content goes here.
      </Modal>
    ),
  }
);
