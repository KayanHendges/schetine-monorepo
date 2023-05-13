import { HTMLAttributes, InputHTMLAttributes } from "react";
import { FormRef } from "types";

interface SelectOption<T> {
  key: string | number;
  value: T;
  element?: JSX.Element;
}

interface SelectProps<T> {
  leftIcon?: JSX.Element;
  validation?: string | "error";
  placeholder?: string;
  isDropdownOpen?: boolean;
  formRef?: FormRef<T>;
  renderLabel: (option: T | null) => string;
  options: SelectOption<T>[];
  selectedOption: T | null;
  onSelectOption: (option: T | null) => void;
  optionKey: keyof T;
  allowNull?: boolean;
  emptyListMessage?: string;
}

interface InputMenuProps<T> {
  options: SelectOption<T>[];
  renderLabel: (option: T) => string;
  hoverIndex: number | null;
  selectedIndex: number | null;
  handleSelectOption: (option: T) => void;
  open: boolean;
  setOpen: SetState<boolean>;
  emptyListMessage: string;
}

interface keyboardMenuHandler {
  hoverIndex: number | null;
  setHoverIndex: (index: number | null) => void;
  optionsLength: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  setSelectedOption: () => void;
}
