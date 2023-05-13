import clsx from "clsx";
import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes, ReactNode } from "react";
import CircularLoader from "@components/Loaders/CircularLoader";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  asChild?: boolean;
  isLoading?: boolean;
  isEnabled?: boolean;
  buttonStyle?: "primary" | "secondary";
}

export function Button({
  children,
  asChild,
  isLoading,
  isEnabled = true,
  className,
  buttonStyle = "primary",
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={clsx(
        "w-full px-4 py-3 gap-3 rounded",
        "transition-colors font-semibold truncate",
        buttonStyle === "primary"
          ? "bg-indigo-400 focus:ring-2 ring-white text-black"
          : "bg-transparent ring-inset ring-2 ring-indigo-400 text-indigo-400 focus:ring-white focus:ring-offset-0",
        {
          "hover:bg-indigo-300": isEnabled && buttonStyle === "primary",
          "hover:bg-indigo-300 hover:ring-indigo-300 hover:text-black":
            isEnabled && buttonStyle === "secondary",
          "bg-indigo-500": !isEnabled,
          "cursor-not-allowed": !isEnabled,
        },
        className
      )}
      {...(!isEnabled
        ? { onSubmit: () => {}, onClick: () => {}, disabled: true }
        : {})}
      {...props}
    >
      {isLoading ? <CircularLoader /> : children}
    </Component>
  );
}
