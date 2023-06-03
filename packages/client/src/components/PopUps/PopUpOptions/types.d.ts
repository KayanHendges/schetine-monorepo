import { PopUpProps } from "@components/PopUps/PopUp/types";
import { HTMLAttributes } from "react";

interface PopUpOptionPayload<T> {
  label?: string;
  value?: T;
}

type PopUpAction<T = any> = (payload: PopUpOptionPayload<T>) => Promise<void> | void;

interface PopUpOption<T, R extends JSX.Element> extends PopUpOptionPayload<T> {
  action?: R extends JSX.Element ? PopUpAction<T> : never;
  className?: R extends JSX.Element ? string : never;
  render?: R
}

interface PopUpOptionProps<T extends any, R extends JSX.Element> extends PopUpProps {
  options: PopUpOption<T, R>[];
}
