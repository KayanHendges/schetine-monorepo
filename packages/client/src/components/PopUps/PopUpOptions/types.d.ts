import { PopUpProps } from "@components/PopUps/PopUp/types";
import { HTMLAttributes } from "react";

interface PopUpOptionPayload<T = any> {
  label?: string;
  value?: T;
}

type PopUpAction<T = any> = (payload: PopUpOptionPayload<T>) => void;

interface PopUpOption<T = any> extends PopUpOptionPayload<T> {
  action?: PopUpAction<T>;
  className?: string;
  render?: (
    payload: PopUpOption & { action?: PopUpAction }
  ) => JSX.Element | string | number;
}

interface PopUpOptionProps<T = any> extends PopUpProps {
  options: PopUpOption<T>[];
}
