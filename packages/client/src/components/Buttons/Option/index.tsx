import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { DotsThreeVertical } from "phosphor-react";
import { ButtonHTMLAttributes } from "react";

export interface OptionButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  asChild?: boolean;
  isEnabled?: boolean;
}

export default function OptionButton({
  asChild,
  isEnabled = true,
  className,
  ...props
}: OptionButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={clsx(
        "w-8 h-8 rounded-full text-neutral-400 cursor-pointer",
        "flex justify-center items-center",
        "hover:bg-neutral-700 transition-colors",
        className
      )}
      {...(!isEnabled
        ? { onSubmit: () => {}, onClick: () => {}, disabled: true }
        : {})}
      onClick={() => console.log("opa")}
      {...props}
    >
      <DotsThreeVertical size={28} />
    </Component>
  );
}
