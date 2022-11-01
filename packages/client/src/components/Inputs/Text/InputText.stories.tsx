import { Meta, StoryObj } from "@storybook/react"
import { InputText, InputTextProps } from './InputText';

export default {
    title: "Components/Inputs/Text",
    component: InputText,
    args: {
        children: "Lorem ipsum."
    },
    argTypes: {
        asChild: {
            table: { disable: true }
        }
    }
} as Meta<InputTextProps>

export const Default: StoryObj<InputTextProps> = {};