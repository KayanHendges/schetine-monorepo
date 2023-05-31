import IconBox from "@components/Icons/IconBox";
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

export interface OptionButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  asChild?: boolean;
  isEnabled?: boolean;
}

export default function ButtonBox({
  asChild,
  isEnabled = true,
  className,
  children,
  ...props
}: OptionButtonProps) {
  return (
    <IconBox
      className={clsx(`cursor-pointer transition-colors`, className)}
      {...(!isEnabled ? { onClick: () => {}, disabled: true } : {})}
      {...props}
    >
      {children}
    </IconBox>
  );
}
