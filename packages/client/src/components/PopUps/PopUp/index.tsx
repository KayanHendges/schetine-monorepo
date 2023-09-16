import { PopUpProps } from "@components/PopUps/PopUp/types";
import { useComponentClick } from "@hooks/dom";
import clsx from "clsx";
import { useRef } from "react";

export default function PopUp({
  isOpen = true,
  className,
  children,
  close,
  ...props
}: PopUpProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useComponentClick({
    ref: containerRef,
    onClickOutside: (e) => {
      e.preventDefault();
      isOpen && close && close();
    },
  });

  if (!isOpen) return <></>;

  return (
    <div
      ref={containerRef}
      className={clsx(
        "w-64 h-min flex flex-col py-2 rounded",
        "absolute z-10 right-0 inset-y-full overflow-hidden",
        "bg-neutral-700",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
