import { HTMLAttributes } from "react";

type NotificationType = "success" | "warning" | "error" | "info";

interface NotiicationColorProperties {
  background: string;
  icon: JSX.Element;
}

interface onClosePayload extends Omit<INotification, "onClose"> {}

interface INotification {
  type?: NotificationType;
  duration?: number;
  header?: JSX.Element | string
  children?: JSX.Element | string;
  closeButton?: boolean;
  className?: string;
  hasIcon?: boolean;
  onClose?: (notificaiton: onClosePayload) => void;
}

interface INotificationProps extends INotification {}
