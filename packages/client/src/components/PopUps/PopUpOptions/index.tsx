import OptionItem from "@components/Items/OptionItem";
import PopUp from "@components/PopUps/PopUp";
import { PopUpOptionProps } from "@components/PopUps/PopUpOptions/types";
import clsx from "clsx";

export default function PopUpOptions<T, R extends JSX.Element>({
  options,
  ...props
}: PopUpOptionProps<T, R>) {
  return (
    <PopUp {...props}>
      {options.map(({ value, render, action, label, className }, index) => {
        if (render) return render;
        return (
          <OptionItem
            key={index}
            className={clsx("hover:bg-neutral-500", className)}
            onClick={async () => {
              if (action) await action({ label, value });
              props.close();
            }}
          >
            {label}
          </OptionItem>
        );
      })}
    </PopUp>
  );
}
