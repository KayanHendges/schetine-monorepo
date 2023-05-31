import ButtonBox from "@components/Buttons/Box";
import IconBox from "@components/Icons/IconBox";
import {
  INotificationProps,
  NotificationType,
  NotiicationColorProperties,
} from "@components/Notification/types";
import { Text } from "@components/Texts/Text";
import { sleep } from "@utils/promises";
import clsx from "clsx";
import { Check, Info, Warning, X } from "phosphor-react";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Notification({
  onClose,
  ...notification
}: INotificationProps) {
  const {
    type = "success",
    header,
    duration,
    className,
    children,
    closeButton,
    hasIcon = true,
    ...props
  } = notification;

  const colorStyles = {
    success: {
      background: "bg-emerald-600",
      icon: <Check className="text-emerald-100" />,
    },
    warning: {
      background: "bg-amber-600",
      icon: <Warning className="text-amber-100" />,
    },
    error: {
      background: "bg-red-600",
      icon: <X className="text-red-100" />,
    },
    info: {
      background: "bg-neutral-900",
      icon: <Info className="text-neutral-400" />,
    },
  } satisfies Record<NotificationType, NotiicationColorProperties>;
  const style = colorStyles[type];
  const transitionMs = 300;

  const [render, setRender] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const isOpening = isOpen && !render;
  const isClosing = !isOpen && render;
  const display = isOpen && render;
  const hidden = !render && !isOpen;

  const initial = async () => {
    await sleep(transitionMs);
    setRender(true);
    if (duration) setTimeout(() => internalClose(), duration);
  };

  const internalClose = async () => {
    setIsOpen(false);
    await sleep(1);
    onClose && onClose(notification);
    await sleep(transitionMs);
    setRender(false);
  };

  useLayoutEffect(() => {
    if (isOpen) {
      initial();
    }
  }, [isOpen]);

  if (hidden) return <></>;

  return (
    <div
      className={clsx(
        "w-full flex justify-between items-start gap-3",
        "rounded-lg p-3 bg-neutral-700 transition-all",
        { "opacity-100": display },
        { "opacity-0 -translate-y-8": isOpening || isClosing || hidden },
        { absolute: isOpening },
        className
      )}
      {...props}
    >
      {hasIcon && (
        <IconBox size="md" className={style.background}>
          {style.icon}
        </IconBox>
      )}
      <div className="flex-1 h-full flex flex-col gap-3 justify-center items-center truncate">
        {header && (
          <div className="w-full h-8 flex items-center truncate">
            <Text
              title={typeof header === "string" ? header : ""}
              className="flex-1 text-gray-300"
            >
              {header}
            </Text>
          </div>
        )}
        {children && children}
      </div>
      {closeButton && (
        <ButtonBox
          className="hover:bg-neutral-600 hover:text-white ml-auto"
          onClick={internalClose}
        >
          <X />
        </ButtonBox>
      )}
    </div>
  );
}
