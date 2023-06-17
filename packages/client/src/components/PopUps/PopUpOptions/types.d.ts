import { PopUpProps } from "@components/PopUps/PopUp/types";

interface PopUpOptionPayload<T> {
  label?: string;
  value?: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PopUpAction<T = any> = (
  payload: PopUpOptionPayload<T>
) => Promise<void> | void;

interface PopUpOption<T, R extends JSX.Element> extends PopUpOptionPayload<T> {
  action?: R extends JSX.Element ? PopUpAction<T> : never;
  className?: R extends JSX.Element ? string : never;
  render?: R;
}

interface PopUpOptionProps<T, R extends JSX.Element> extends PopUpProps {
  options: PopUpOption<T, R>[];
}
