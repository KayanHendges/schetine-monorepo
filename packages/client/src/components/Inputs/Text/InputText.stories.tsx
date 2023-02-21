/* eslint-disable react/jsx-key */
import { Meta, StoryObj } from "@storybook/react";
import { TextInput, TextInputRootProps } from "./InputText";
import { Envelope } from "phosphor-react";

export default {
  title: "Components/Inputs/Text",
  component: TextInput.Root,
  args: {
    children: [
      <TextInput.Icon>
        <Envelope />
      </TextInput.Icon>,
      <TextInput.Input placeholder="Digite o seu endereço de e-mail" />,
    ],
  },
  argTypes: {
    asChild: {
      table: { disable: true },
    },
  },
} as Meta<TextInputRootProps>;

export const Default: StoryObj<TextInputRootProps> = {};

export const WithoutIcon: StoryObj<TextInputRootProps> = {
  args: {
    children: <TextInput.Input placeholder="Digite o seu endereço de e-mail" />,
  },
};
