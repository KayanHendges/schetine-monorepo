import clsx from "clsx"
import { Slot } from "@radix-ui/react-slot"
import { ReactNode } from "react";

export interface BaseComponentProps {
    children: ReactNode;
    asChild: boolean;
}

export function BaseComponent({ children, asChild }: BaseComponentProps) {
    const Component = asChild? Slot : 'div';
    
    return (
        <Component className={clsx(
            'text-gray-100 font-sans',
        )}>
            {children}
        </Component>
    )
}