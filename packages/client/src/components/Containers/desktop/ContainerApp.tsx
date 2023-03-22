import clsx from "clsx";
import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";
import SideBar from "@components/Sidebar";
import { ArrowRight, House } from "phosphor-react";
import useClientRoutes from "@routes/index";
import { Text } from "@components/Texts/Text";
import Link from "next/link";

export interface BaseComponentProps {
  children: ReactNode;
  asChild?: boolean;
}

export function ContainerApp({ children, asChild }: BaseComponentProps) {
  const { currentRoute } = useClientRoutes();

  const Component = asChild ? Slot : "div";
  const Arrow = (
    <div className="text-gray-700">
      <ArrowRight size={24} />
    </div>
  );

  return (
    <Component
      className={clsx(
        "w-screen h-screen bg-black flex items-start justify-start pt-3"
      )}
    >
      <SideBar />
      <div className="flex-1 h-full bg-gray-800 rounded-tl-2xl">
        <div className="w-full h-12 flex justify-start items-center bg-gray-900 rounded-tl-2xl px-4">
          <div className="flex justify-center items-center gap-3">
            <Link href={"/"}>
              <div className="text-gray-500 cursor-pointer hover:text-gray-400 transition-colors">
                <House size={24} weight="fill" />
              </div>
            </Link>
            {Arrow}
            {currentRoute && <Text>{currentRoute.label}</Text>}
          </div>
        </div>
        {children}
      </div>
    </Component>
  );
}
