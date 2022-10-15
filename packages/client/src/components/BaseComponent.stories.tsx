import { Meta, StoryObj } from "@storybook/react"
import { BaseComponent, BaseComponentProps } from './BaseComponent';

export default {
    title: "Components/BaseComponent",
    component: BaseComponent,
    args: {
        children: "Lorem ipsum."
    },
    argTypes: {
        asChild: {
            table: { disable: true }
        }
    }
} as Meta<BaseComponentProps>

export const Default: StoryObj<BaseComponentProps> = {};