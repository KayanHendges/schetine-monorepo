import { Meta, StoryObj } from "@storybook/react";
import { Heading, HeadingProps } from "./Heading";

export default {
  title: "Components/Texts/Heading",
  component: Heading,
  args: {
    children: "Lorem ipsum.",
  },
  argTypes: {
    asChild: {
      table: { disable: true },
    },
  },
} as Meta<HeadingProps>;

export const Small: StoryObj<HeadingProps> = {
  args: {
    size: "sm",
  },
};
export const Default: StoryObj<HeadingProps> = {};

export const Large: StoryObj<HeadingProps> = {
  args: {
    size: "lg",
  },
};

export const CustomComponent: StoryObj<HeadingProps> = {
  args: {
    asChild: true,
    children: <h1>Custom Component as H1</h1>,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
};
