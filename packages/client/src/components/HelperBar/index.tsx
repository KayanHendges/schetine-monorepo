import { HelperBarContext } from "@contexts/helperBarContext";
import clsx from "clsx";
import { Dispatch, SetStateAction, useContext, useState } from "react";

interface Props {
  customHelper?: JSX.Element;
  isCustomHelperOpen: boolean;
  setIsCustomHelperOpen: Dispatch<SetStateAction<boolean>>;
}

export default function HelperBar({ customHelper, isCustomHelperOpen }: Props) {
  const { isOpen } = useContext(HelperBarContext);

  return (
    <div
      className={clsx(
        "h-full max-w-md transition-all relative overflow-hidden",
        isOpen ? "flex-1 min-w-fit mr-3" : "flex-none"
      )}
    >
      {/* {!customHelper && (
        <div
          className={clsx(
            "h-full max-w-md",
            isOpen ? "flex-1 min-w-fit" : "flex-none",
            "flex flex-col bg-gray-800",
            "rounded-t-2xl mr-3 transition-all"
          )}
        >
          <div className={clsx("w-full h-12 rounded-t-2xl bg-gray-900")}></div>
        </div>
      )} */}
      {(customHelper || isCustomHelperOpen) && (
        <div
          className={clsx(
            "flex w-full h-full flex-col",
            "absolute overflow-auto",
            "bg-gray-750 rounded-t-2xl mr-3 transition-all",
            { "translate-y-full": isOpen && !isCustomHelperOpen }
          )}
        >
          {customHelper}
        </div>
      )}
    </div>
  );
}
