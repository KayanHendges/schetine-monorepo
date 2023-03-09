import clsx from "clsx";

interface Props {
  children: JSX.Element;
}

export default function Avatar({ children }: Props) {
  return (
    <div
      className={clsx(
        "w-12 h-12 bg-gray-700 ring-4 ring-inset ring-gray-800 rounded-full overflow-hidden relative",
        "flex justify-center items-center"
      )}
    >
      {children}
    </div>
  );
}
