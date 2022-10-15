import { Meta, StoryObj } from "@storybook/react"
import { Text, TextProps } from './Text';

export default {
    title: "Components/Texts/Text",
    component: Text,
    args: {
        children: "Lorem ipsum."
    },
    argTypes: {
        asChild: {
            table: { disable: true }
        }
    }
} as Meta<TextProps>

export const Small: StoryObj<TextProps> = {
    args: {
        size: "sm"
    }
};
export const Default: StoryObj<TextProps> = {};

export const Large: StoryObj<TextProps> = {
    args: {
        size: "lg"
    }
};

export const ExtraLarge: StoryObj<TextProps> = {
    args: {
        size: "xl"
    }
};

export const CustomComponent: StoryObj<TextProps> = {
    args: {
        asChild: true,
        children: (<a>Custom Component as Anchor</a>)
    },
    argTypes: {
        children: {
            table: {
                disable: true,
            }
        },
        asChild: {
            table: {
                disable: true,
            }
        }
    },
};