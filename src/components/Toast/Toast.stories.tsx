import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

const meta = {
  title: "Feedback/Toast",
  component: Toast,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "error", "warning", "info"],
    },
    duration: { control: "number" },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Notification",
    description: "Something happened that you should know about.",
    closable: true,
    onClose: () => console.log("closed"),
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Changes saved",
    description: "Your profile has been updated successfully.",
    closable: true,
    onClose: () => {},
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Something went wrong",
    description: "We couldn't process your request. Please try again.",
    closable: true,
    onClose: () => {},
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Action required",
    description: "Your session is about to expire. Save your work.",
    closable: true,
    onClose: () => {},
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "New update available",
    description: "Version 2.0 is ready. Refresh to apply the update.",
    closable: true,
    onClose: () => {},
  },
};

export const TitleOnly: Story = {
  args: {
    variant: "success",
    title: "Copied to clipboard!",
    closable: true,
    onClose: () => {},
  },
};

export const DescriptionOnly: Story = {
  args: {
    description: "Your file has been uploaded.",
    closable: false,
  },
};

export const NotClosable: Story = {
  args: {
    variant: "info",
    title: "Processing…",
    description: "Please wait while we generate your report.",
    closable: false,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-80">
      <Toast variant="default" title="Default" description="Neutral notification." closable onClose={() => {}} />
      <Toast variant="success" title="Success" description="Operation completed." closable onClose={() => {}} />
      <Toast variant="error" title="Error" description="Something failed." closable onClose={() => {}} />
      <Toast variant="warning" title="Warning" description="Check this out." closable onClose={() => {}} />
      <Toast variant="info" title="Info" description="Here is some info." closable onClose={() => {}} />
    </div>
  ),
};
