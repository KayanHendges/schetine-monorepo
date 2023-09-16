import clsx from "clsx";

export default function ListBar({}) {
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
