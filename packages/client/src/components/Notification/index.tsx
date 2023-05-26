import {
  INotificationProps,
  NotificationType,
  NotiicationColorProperties,
} from "@components/Notification/types";
import clsx from "clsx";
import { X } from "phosphor-react";

const colorStyles = {
  success: {
    background: "bg-emerald-200",
    border: "ring-emerald-700",
    text: "text-white",
  },
  warning: {
    background: "bg-amber-400",
    border: "ring-amber-500",
    text: "text-white",
  },
  error: {
    background: "bg-red-500",
    border: "ring-red-700",
    text: "text-white",
  },
} satisfies Record<NotificationType, NotiicationColorProperties>;

export default function Notification({
  type,
  title,
  duration,
  className,
  children,
  ...props
}: INotificationProps) {
  // const style = Object.values(colorStyles[type]).join(" ");
  const style = "";

  return (
    <div
      className={clsx(
        "w-full flex flex-col justify-center items-center",
        "bg-neutral-700 rounded p-2",
        style,
        className
      )}
      {...props}
    >
      <div className="w-full flex items-center justify-between">
        <div className="w-full">{title}</div>
        <div>
          <X />
        </div>
      </div>
    </div>
  );
}
