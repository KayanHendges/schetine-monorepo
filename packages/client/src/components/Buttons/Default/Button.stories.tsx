import { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonProps } from ".";

export default {
  title: "Components/Buttons/Button",
  component: Button,
  args: {
    children: "Lorem ipsum.",
  },
  argTypes: {
    asChild: {
      table: { disable: true },
    },
  },
} as Meta<ButtonProps>;

export const Default: StoryObj<ButtonProps> = {};
