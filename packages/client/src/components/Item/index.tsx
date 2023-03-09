import { HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";
import { Check, X } from "phosphor-react";

export interface ItemRootProps {
  children: ReactNode;
  className?: string;
}

function ItemRoot({ children, className }: ItemRootProps) {
  return (
    <div
      className={clsx(
        "group flex flex-1 h-12 gap-3 justify-start items-center p-3 rounded-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

ItemRoot.displayName = "Item.Root";

export interface ItemIconProps extends HTMLAttributes<HTMLOrSVGElement> {
  children: ReactNode;
}

function ItemIcon({ children, className, ...props }: ItemIconProps) {
  return (
    <Slot
      {...props}
      className={clsx(
        "w-6 h-6 text-gray-400 group-focus-within:text-gray-700 transition",
        className
      )}
    >
      {children}
    </Slot>
  );
}

ItemIcon.displayName = "Item.Icon";

export const Item = {
  Root: ItemRoot,
  Icon: ItemIcon,
};
