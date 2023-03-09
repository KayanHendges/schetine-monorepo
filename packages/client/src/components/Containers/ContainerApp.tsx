import clsx from "clsx";
import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";
import SideBar from "@components/Sidebar";

export interface BaseComponentProps {
  children: ReactNode;
  asChild?: boolean;
}

export function ContainerApp({ children, asChild }: BaseComponentProps) {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      className={clsx(
        "w-screen h-screen bg-black flex items-start justify-start pt-3"
      )}
    >
      <SideBar />
      <div className="flex-1 h-full bg-gray-900 rounded-tl-2xl">{children}</div>
    </Component>
  );
}
