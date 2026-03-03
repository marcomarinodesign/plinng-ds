import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button";

const meta = {
  title: "Feedback/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  // Required props — stories that use `render` override these via local state
  args: {
    open: false,
    onClose: () => {},
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Controlled wrapper
function ModalDemo(props: Partial<React.ComponentProps<typeof Modal>>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Modal title"
        description="Short description to provide context."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </>
        }
        {...props}
      >
        <p>
          This is the modal body. You can place any content here — forms,
          summaries, confirmations, etc.
        </p>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const Small: Story = {
  render: () => <ModalDemo size="sm" title="Delete item?" description="This action cannot be undone." />,
};

export const Large: Story = {
  render: () => <ModalDemo size="lg" />,
};

export const NoDescription: Story = {
  render: () => (
    <ModalDemo
      title="Confirm action"
      description={undefined}
    />
  ),
};

export const NoFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Info">
          <p>No footer here, just informational content.</p>
        </Modal>
      </>
    );
  },
};

export const ScrollableContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Scrollable Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Long content"
          footer={<Button onClick={() => setOpen(false)}>Close</Button>}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} className="mb-3">
              Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </p>
          ))}
        </Modal>
      </>
    );
  },
};

export const NoBackdropClose: Story = {
  render: () => <ModalDemo closeOnBackdrop={false} title="Sticky modal" description="Click × to close." />,
};
