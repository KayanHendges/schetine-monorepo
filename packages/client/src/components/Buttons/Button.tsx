import clsx from "clsx";
import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes, ReactNode } from "react";
import CircularLoader from "@components/Loaders/CircularLoader";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  children: ReactNode;
  asChild?: boolean;
  isLoading?: boolean;
}

export function Button({
  children,
  asChild,
  isLoading,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={clsx(
        "w-full px-1 py-3 gap-3 rounded",
        "bg-indigo-400 transition-colors hover:bg-indigo-300",
        "focus:ring-2 ring-white",
        "text-black font-semibold"
      )}
      {...props}
    >
      {isLoading ? <CircularLoader /> : children}
    </Component>
  );
}
