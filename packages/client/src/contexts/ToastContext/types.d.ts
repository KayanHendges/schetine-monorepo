interface IToastNotification extends INotification {
  created: number;
  hash: number;
}

interface IToastContext {
  notify: (notification: INotification) => void;
}
