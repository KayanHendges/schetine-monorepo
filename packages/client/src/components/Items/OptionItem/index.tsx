import clsx from "clsx";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function OptionItem({ children, className, ...props }: Props) {
  return (
    <div
      className={clsx(
        "w-full flex justify-center items-center py-1",
        "text-gray-400 cursor-pointer transition-all",
        "hover:bg-gray-700 hover:text-white",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
