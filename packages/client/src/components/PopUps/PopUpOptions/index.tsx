import OptionItem from "@components/Items/OptionItem";
import PopUp from "@components/PopUps/PopUp";
import { PopUpOptionProps } from "@components/PopUps/PopUpOptions/types";
import clsx from "clsx";

export default function PopUpOptions<T = any>({
  options,
  ...props
}: PopUpOptionProps<T>) {
  return (
    <PopUp {...props}>
      {options.map(({ value, render, action, label, className }) => {
        return (
          <OptionItem
            className={className}
            onClick={() => action && action({ label, value })}
          >
            {render ? render({ value, label, action }) : label}
          </OptionItem>
        );
      })}
    </PopUp>
  );
}
