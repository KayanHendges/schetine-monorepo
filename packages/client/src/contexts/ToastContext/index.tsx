"use client";
import { INotification } from "@components/Notification/types";
import Toast from "@components/Toast";
import {
  IToastNotification,
  IToastContext,
} from "@contexts/ToastContext/types";
import { produce } from "immer";
import { createContext, useEffect, useState } from "react";

export const ToastContext = createContext({} as IToastContext);

export function ToastProvider({ children }) {
  const [notifications, setNotifications] = useState<IToastNotification[]>([]);

  const notify = ({
    duration = 5 * 1000,
    closeButton = true,
    type = "success",
    ...notification
  }: INotification) => {
    const hash = Math.floor(Math.random() * 1000);
    const created = new Date().getTime();

    setNotifications(
      produce((draft) => {
        draft.unshift({
          ...notification,
          type,
          duration,
          hash,
          closeButton,
          created,
        });
      })
    );
  };

  return (
    <ToastContext.Provider value={{ notify }}>
      <Toast
        notifications={notifications}
        setNotifications={setNotifications}
      />
      {children}
    </ToastContext.Provider>
  );
}
