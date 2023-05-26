import { HTMLAttributes } from "react";

type NotificationType = "success" | "warning" | "error";

interface NotiicationColorProperties {
  background: string;
  border: string;
  text: string;
}

interface INotification {
  type: NotificationType;
  duration: number;
  title: JSX.Element | string
  children?: JSX.Element | string;
}

type INotificationProps =  INotificationProps & HTMLAttributes<HTMLDivElement>
