import figma from "@figma/code-connect";
import { Toast } from "./Toast";

// TODO: replace node-id once the Toast frame is added to Figma
figma.connect(
  Toast,
  "https://www.figma.com/design/wVzc4wbNrfKR9awe8UU401/Design-System?node-id=TOAST_NODE_ID",
  {
    props: {
      variant: figma.enum("Variant", {
        default: "Default",
        success: "Success",
        error: "Error",
        warning: "Warning",
        info: "Info",
      }),
      closable: figma.boolean("Closable"),
    },
    example: ({ variant, closable }) => (
      <Toast
        variant={variant}
        title="Notification title"
        description="Description goes here."
        closable={closable}
        onClose={() => {}}
      />
    ),
  }
);
