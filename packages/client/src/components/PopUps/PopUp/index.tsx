import { PopUpProps } from "@components/PopUps/PopUp/types";
import { useComponentClick } from "@hooks/dom";
import clsx from "clsx";
import { useEffect, useRef } from "react";

export default function PopUp({
  isOpen = true,
  className,
  children,
  close,
  ...props
}: PopUpProps) {
  if (!isOpen) return <></>;

  const containerRef = useRef<HTMLDivElement>(null);
  useComponentClick({ref: containerRef, onClickOutside: (e) => {
    e.preventDefault()
    close && close()
  }})

  return (
    <div
      ref={containerRef}
      className={clsx(
        "w-64 h-min flex flex-col py-2 rounded",
        "absolute z-10 right-0 inset-y-full overflow-hidden",
        "bg-gray-750",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
