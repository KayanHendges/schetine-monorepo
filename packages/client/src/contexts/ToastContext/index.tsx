"use client";
import { INotification } from "@components/Notification/types";
import Toast from "@components/Toast";
import { createContext, useState } from "react";

export const ToastContext = createContext({} as IToastContext);

export function ToastProvider({ children }) {
  const [notifications, setNotifications] = useState<INotification[]>([
    { title: "uepa", type: "success", duration: 1000 },
    { title: "upa", type: "warning", duration: 1000 },
    { title: "inhain", type: "error", duration: 1000 },
  ]);

  return (
    <ToastContext.Provider value={{}}>
      <Toast
        notifications={notifications}
        setNotifications={setNotifications}
      />
      {children}
    </ToastContext.Provider>
  );
}
