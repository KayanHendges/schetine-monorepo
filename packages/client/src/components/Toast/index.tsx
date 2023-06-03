import Notification from "@components/Notification";
import { INotification, onClosePayload } from "@components/Notification/types";
import { IToastProps } from "@components/Toast/types";
import { IToastNotification } from "@contexts/ToastContext/types";
import clsx from "clsx";
import { produce } from "immer";
import { useEffect } from "react";

export default function Toast({
  notifications,
  setNotifications,
}: IToastProps) {
  const maxItens = 5;
  const hiddenNotifications =
    notifications.length - maxItens > 0 ? notifications.length - maxItens : 0;

  const sortByCreated = (a: IToastNotification, b: IToastNotification) => {
    if (a.created > b.created) return 1;
    if (a.created < b.created) return -1;
    return 0;
  };

  const displayList = [...notifications]
    .sort(sortByCreated)
    .slice(0, notifications.length > maxItens ? maxItens - 1 : maxItens);

  const handleOnClose = (notification: IToastNotification) => {
    setNotifications(
      produce((draft) => {
        const notificationIndex = notifications.findIndex(
          (it) => it.hash === notification.hash
        );
        if (notificationIndex >= 0) draft.splice(notificationIndex, 1);
      })
    );
  };

  return (
    <div
      className={clsx(
        "w-96 absolute top-4 right-4 z-50",
        "flex flex-col gap-2"
      )}
    >
      {displayList.map(({ onClose, ...itemProps }) => {
        return (
          <Notification
            key={itemProps.hash}
            onClose={(notification) => {
              handleOnClose(itemProps);
              onClose && onClose(notification);
            }}
            {...itemProps}
          />
        );
      })}
      {hiddenNotifications > 0 && (
        <Notification className="mt-auto" hasIcon={false}>
          {`+${hiddenNotifications + 1} notificações`}
        </Notification>
      )}
    </div>
  );
}
