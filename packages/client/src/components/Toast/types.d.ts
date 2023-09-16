import { IToastNotification } from "@contexts/ToastContext/types";
import { SetState } from "@types";

interface IToastProps {
  notifications: IToastNotification[];
  setNotifications: SetState<IToastNotification[]>;
}
