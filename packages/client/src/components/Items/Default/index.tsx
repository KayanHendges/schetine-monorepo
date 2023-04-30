import { HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";
import { Check, X } from "phosphor-react";
import { Text, TextProps } from "@components/Texts/Text";

export interface ItemRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  selected?: boolean;
  className?: string;
}

function ItemRoot({ children, className, selected, ...props }: ItemRootProps) {
  return (
    <div
      className={clsx(
        "group flex w-full h-12 gap-3 justify-start items-center p-3 rounded-lg",
        "cursor-pointer transition-all",
        selected ? "bg-indigo-400" : "hover:bg-gray-700",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

ItemRoot.displayName = "Item.Root";

export interface ItemIconProps extends HTMLAttributes<HTMLOrSVGElement> {
  selected?: boolean;
  children: ReactNode;
}

function ItemIcon({ children, className, selected, ...props }: ItemIconProps) {
  return (
    <Slot
      {...props}
      className={clsx(
        "w-6 h-6 text-gray-400 group-focus-within:text-gray-700 transition",
        { "text-white": selected },
        className
      )}
    >
      {children}
    </Slot>
  );
}

ItemIcon.displayName = "Item.Icon";

export interface ItemTextProps extends TextProps {
  selected?: boolean;
  children: ReactNode;
  className?: string;
}

function ItemText({ children, selected, className, ...props }: ItemTextProps) {
  return (
    <Text className={clsx({ "text-white": selected }, className)} {...props}>
      {children}
    </Text>
  );
}

ItemIcon.displayName = "Item.Icon";

export const Item = {
  Root: ItemRoot,
  Icon: ItemIcon,
  Text: ItemText,
};
