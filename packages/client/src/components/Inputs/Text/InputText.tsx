import { HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";
import { IconProps } from "phosphor-react";

export interface TextInputRootProps {
  children: ReactNode;
  validation?: string | "error";
}

function TextInputRoot({ children, validation }: TextInputRootProps) {
  return (
    <div
      className={clsx(
        "group flex items-center gap-3 h-12 py-4 px-3 rounded  bg-gray-800 w-full",
        {
          "ring-2 ring-red-500": validation === "error",
          "focus-within:ring-2 ring-indigo-400 transition": !validation,
        }
      )}
    >
      {children}
    </div>
  );
}

TextInputRoot.displayName = "TextInput.Root";

export interface TextInputIconProps extends HTMLAttributes<HTMLOrSVGElement> {
  children: ReactNode;
}

function TextInputIcon({ children, className, ...props }: TextInputIconProps) {
  return (
    <Slot
      {...props}
      className={clsx(
        "w-6 h-6 text-gray-400 group-focus-within:text-white transition",
        className
      )}
    >
      {children}
    </Slot>
  );
}

TextInputIcon.displayName = "TextInput.Icon";

export interface TextInputInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
}

function TextInputInput(props: TextInputInputProps) {
  return (
    <input
      className="bg-transparent flex-1 text-white text-xs focus:text-white placeholder:text-gray-500 outline-none autofill:bg-red-400 autofill:text-red-500"
      {...props}
      {...(props.register ? { ...props.register } : {})}
    />
  );
}

TextInputInput.displayName = "TextInput.Input";

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon,
};
