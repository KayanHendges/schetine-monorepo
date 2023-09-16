import { IconBoxProps } from "@components/Icons/IconBox/types";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

export default function IconBox({
  children,
  size = "md",
  className,
  ...props
}: IconBoxProps) {
  return (
    <div
      className={clsx(
        {
          "w-6 h-6": size === "sm",
          "w-8 h-8": size === "md",
          "w-10 h-10": size === "lg",
        },
        "flex justify-center items-center p-1 rounded-lg",
        className
      )}
      {...props}
    >
      <Slot className="w-full h-full">{children}</Slot>
    </div>
  );
}
