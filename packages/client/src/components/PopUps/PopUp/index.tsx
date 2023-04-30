import { PopUpProps } from "@components/PopUps/PopUp/types";
import clsx from "clsx";
import { useEffect, useRef } from "react";

export default function PopUp({
  isOpen = true,
  className,
  children,
  ...props
}: PopUpProps) {
  if (!isOpen) return <></>;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const body = document.querySelector("body");
    const { clientWidth, clientHeight } = body;

    const container = containerRef.current;
    const { offsetHeight, offsetWidth, offsetLeft, offsetTop } = container;
    console.log({ offsetTop, offsetLeft });
  }, [isOpen]);

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
