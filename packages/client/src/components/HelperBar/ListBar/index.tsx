import { sleep } from "@utils/promises";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {}

export default function ListBar({}: Props) {
  return (
    <div
      className={clsx(
        "w-full h-full",
        "flex flex-col bg-neutral-800",
        "rounded-t-2xl transition-all"
      )}
    >
      <div className={clsx("w-full h-12 rounded-t-2xl bg-neutral-900")}></div>
    </div>
  );
}
