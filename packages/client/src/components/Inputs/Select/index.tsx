import {
  Dispatch,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";
import { CaretDown, Check, X } from "phosphor-react";

export interface SelectProps {
  leftIcon?: JSX.Element;
  validation?: string | "error";
  isDropdownOpen?: boolean;
  register?: UseFormRegisterReturn;
}

export function SelectInput({
  leftIcon,
  validation,
  register,
  isDropdownOpen,
}: SelectProps) {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof isDropdownOpen !== "undefined") setOpen(isDropdownOpen);
  }, [isDropdownOpen]);

  return (
    <div
      className={clsx(
        "group flex items-center gap-3 h-12 py-4 px-3 rounded  bg-gray-800 w-full",
        {
          "ring-2 ring-red-500": validation === "error",
          "focus-within:ring-2 ring-indigo-400 transition": !validation,
        }
      )}
    >
      {leftIcon && <SelectIcon>{leftIcon}</SelectIcon>}
      <Input register={register} />
      <SelectCaretIcon open={open} setOpen={setOpen} />
    </div>
  );
}

export interface SelectIconProps extends HTMLAttributes<HTMLOrSVGElement> {
  children: ReactNode;
}

function SelectIcon({ children, className, ...props }: SelectIconProps) {
  return (
    <Slot
      {...props}
      className={clsx(
        "w-6 h-6 text-gray-500 group-focus-within:text-white transition",
        className
      )}
    >
      {children}
    </Slot>
  );
}

export interface SelectValidatedCaretProps
  extends HTMLAttributes<HTMLOrSVGElement> {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function SelectCaretIcon({
  open,
  setOpen,
  className,
  ...props
}: SelectValidatedCaretProps) {
  return (
    <Slot
      className={clsx(
        "w-6 h-6 text-gray-500 transition-all",
        "group-focus-within:text-white hover:text-white",
        { "rotate-180 text-white": open },
        className
      )}
      onClick={() => setOpen(!open)}
      {...props}
    >
      <CaretDown />
    </Slot>
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
}

function Input(props: InputProps) {
  return (
    <input
      className="bg-transparent flex-1 text-white text-xs focus:text-white placeholder:text-gray-500 outline-none autofill:bg-red-400 autofill:text-red-500"
      {...(props.register ? { ...props.register } : {})}
      {...props}
    />
  );
}
