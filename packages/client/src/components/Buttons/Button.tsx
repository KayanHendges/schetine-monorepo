import clsx from "clsx"
import { Slot } from "@radix-ui/react-slot"
import { ReactNode } from "react";

export interface ButtonProps {
    children: ReactNode;
    asChild: boolean;
}

export function Button({ children, asChild }: ButtonProps) {
    const Component = asChild? Slot : 'button';
    
    return (
        <Component className={clsx(
            'w-full px-1 py-3 gap-3 rounded',
            'bg-indigo-400 transition-colors hover:bg-indigo-300',
            'focus:ring-2 ring-gray-100',
            'text-gray-900 font-semibold',
        )}>
            {children}
        </Component>
    )
}