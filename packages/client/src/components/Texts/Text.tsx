import clsx from "clsx";
import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";

export interface TextProps {
  size?: "sm" | "md" | "lg" | "xl";
  children: ReactNode;
  asChild?: boolean;
  className?: string;
  title?: string;
}

export function Text({
  size = "md",
  children,
  asChild,
  className,
  title,
}: TextProps) {
  const Component = asChild ? Slot : "span";

  return (
    <Component
      className={clsx(
        "font-sans truncate",
        {
          "text-xs": size === "sm",
          "text-sm": size === "md",
          "text-md": size === "lg",
          "text-lg": size === "xl",
        },
        className
      )}
      title={title}
    >
      {children}
    </Component>
  );
}
