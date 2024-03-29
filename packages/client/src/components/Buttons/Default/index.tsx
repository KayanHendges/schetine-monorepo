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
        "transition-colors font-semibold truncate disabled:cursor-not-allowed",
        buttonStyle === "primary"
          ? "bg-indigo-400 focus:ring-2 ring-white text-neutral-950"
          : "bg-transparent ring-inset ring-2 ring-indigo-400 text-indigo-400 focus:ring-white focus:ring-offset-0",
        {
          "hover:bg-indigo-300": isEnabled && buttonStyle === "primary",
          "hover:bg-indigo-300 hover:ring-indigo-300 hover:text-neutral-950":
            isEnabled && buttonStyle === "secondary",
          "bg-indigo-500": !isEnabled,
        },
        className
      )}
      {...props}
      {...(!isEnabled || isLoading
        ? { onSubmit: undefined, onClick: undefined, disabled: true }
        : {})}
    >
      {isLoading ? <CircularLoader /> : children}
    </Component>
  );
}
