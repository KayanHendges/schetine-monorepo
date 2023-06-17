type NotificationType = "success" | "warning" | "error" | "info";

interface NotiicationColorProperties {
  background: string;
  icon: JSX.Element;
}

type onClosePayload = Omit<INotification, "onClose">;

interface INotification {
  type?: NotificationType;
  duration?: number;
  header?: JSX.Element | string;
  children?: JSX.Element | string;
  closeButton?: boolean;
  className?: string;
  hasIcon?: boolean;
  onClose?: (notificaiton: onClosePayload) => void;
}

type INotificationProps = INotification;
