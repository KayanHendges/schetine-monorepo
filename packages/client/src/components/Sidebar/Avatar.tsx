import clsx from "clsx";

interface Props {
  children: JSX.Element;
}

export default function Avatar({ children }: Props) {
  return (
    <div
      className={clsx(
        "w-12 h-12 bg-neutral-700 ring-4 ring-inset ring-neutral-800 rounded-full overflow-hidden relative",
        "flex justify-center items-center"
      )}
    >
      {children}
    </div>
  );
}
