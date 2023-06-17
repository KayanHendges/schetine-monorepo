import clsx from "clsx";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLButtonElement>;

export default function OptionItem({ children, className, ...props }: Props) {
  return (
    <button
      type="button"
      className={clsx(
        "w-full flex justify-center items-center py-1",
        "text-neutral-400 cursor-pointer transition-all",
        "hover:bg-neutral-700 hover:text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
