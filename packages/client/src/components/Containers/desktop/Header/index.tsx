import useClientRoutes from "@routes/index";
import { Text } from "@components/Texts/Text";
import Link from "next/link";
import { useContext } from "react";
import { HelperBarContext } from "@contexts/helperBarContext";
import { ArrowRight, House, SquareHalf } from "phosphor-react";
import clsx from "clsx";

export default function DesktopHeader() {
  const { currentRoute } = useClientRoutes();
  const { open, close, isOpen } = useContext(HelperBarContext);

  const Arrow = (
    <div className="text-gray-700">
      <ArrowRight size={24} />
    </div>
  );

  return (
    <div className="w-full h-12 flex justify-between items-center bg-gray-900 rounded-t-2xl px-4">
      <div className="flex justify-center items-center gap-3">
        <Link href={"/"}>
          <div className="text-gray-500 cursor-pointer hover:text-gray-400 transition-colors">
            <House size={24} weight="fill" />
          </div>
        </Link>
        {Arrow}
        {currentRoute && <Text>{currentRoute.label}</Text>}
      </div>
      <div
        className={clsx(
          "w-8 h-8 flex justify-center items-center rounded-full cursor-pointer",
          "transition-colors",
          isOpen
            ? "bg-gray-700 text-gray-400"
            : "text-gray-500 hover:bg-gray-700 hover:text-gray-400"
        )}
        onClick={() => (isOpen ? close() : open())}
      >
        <SquareHalf size={24} />
      </div>
    </div>
  );
}
