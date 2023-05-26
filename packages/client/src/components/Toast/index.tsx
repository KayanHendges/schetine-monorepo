import Notification from "@components/Notification";
import clsx from "clsx";

export default function Toast({ notifications }: IToastProps) {
  return (
    <div className={clsx("w-96 absolute top-4 right-4", "flex flex-col gap-2")}>
      {notifications.map((itemProps, index) => {
        return <Notification key={index} {...itemProps} />;
      })}
    </div>
  );
}
