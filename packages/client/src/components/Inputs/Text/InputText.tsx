import React, { HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";
import { Check, X } from "phosphor-react";

export interface TextInputRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  validation?: string | "error";
  className?: string;
}

function TextInputRoot({
  children,
  validation,
  className,
  ...props
}: TextInputRootProps) {
  return (
    <div
      className={clsx(
        "group flex items-center gap-3 h-12 py-4 px-3 rounded  bg-gray-900 w-full",
        {
          "ring-2 ring-red-500": validation === "error",
          "focus-within:ring-2 ring-indigo-400 transition": !validation,
        },
        className
      )}
      {...props}
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
      className={clsx(
        "w-6 h-6 text-gray-500 group-focus-within:text-white transition",
        className
      )}
      {...props}
    >
      {children}
    </Slot>
  );
}

TextInputIcon.displayName = "TextInput.Icon";

export interface TextInputValidatedIconProps
  extends HTMLAttributes<HTMLOrSVGElement> {
  isValid: boolean;
}

function TextInputValidatedIcon({
  isValid,
  className,
  ...props
}: TextInputValidatedIconProps) {
  return (
    <Slot
      {...props}
      className={clsx(
        "w-6 h-6",
        {
          "text-green-500": isValid,
          "text-red-500": !isValid,
        },
        className
      )}
    >
      {isValid ? <Check /> : <X />}
    </Slot>
  );
}

TextInputIcon.displayName = "TextInput.ValidatedIcon";

export interface TextInputInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

const TextInputInput = React.forwardRef(
  (props: TextInputInputProps, ref: React.LegacyRef<HTMLInputElement>) => {
    return (
      <input
        className="bg-transparent flex-1 text-white text-xs focus:text-white placeholder:text-gray-500 outline-none autofill:bg-red-400 autofill:text-red-500"
        {...props}
        ref={ref}
      />
    );
  }
);

TextInputInput.displayName = "TextInput.Input";

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon,
  ValidatedIcon: TextInputValidatedIcon,
};
