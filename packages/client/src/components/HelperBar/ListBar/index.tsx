import { sleep } from "@utils/promises";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {}

export default function ListBar({}: Props) {
  return (
    <div
      className={clsx(
        "w-full h-full",
        "flex flex-col bg-gray-800",
        "rounded-t-2xl transition-all"
      )}
    >
      <div className={clsx("w-full h-12 rounded-t-2xl bg-gray-900")}></div>
    </div>
  );
}
