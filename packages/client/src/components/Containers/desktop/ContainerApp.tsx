import clsx from "clsx";
import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";
import SideBar from "@components/Sidebar";
import { HelperBarProvider } from "@contexts/helperBarContext";
import DesktopHeader from "@components/Containers/desktop/Header";

export interface BaseComponentProps {
  children: ReactNode;
  asChild?: boolean;
}

export function ContainerApp({ children, asChild }: BaseComponentProps) {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      className={clsx(
        "w-screen h-screen flex items-start justify-start pt-3 overflow-hidden"
      )}
    >
      <HelperBarProvider>
        <SideBar />
        <div
          className={clsx(
            "flex-1 h-full flex flex-col overflow-hidden",
            "bg-neutral-800 rounded-t-2xl mr-3"
          )}
        >
          <DesktopHeader />
          <div
            className={clsx(
              "flex-1 w-full overflow-auto",
              "flex flex-col items-center gap-4 p-4",
              "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700"
            )}
          >
            {children}
          </div>
        </div>
      </HelperBarProvider>
    </Component>
  );
}
