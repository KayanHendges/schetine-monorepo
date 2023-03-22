import { HTMLAttributes, InputHTMLAttributes } from "react";

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
  register?: UseFormRegisterReturn;
  renderLabel: (option: T) => string;
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
  setOpen: Dispatch<SetStateAction<boolean>>;
  emptyListMessage: string;
}

interface keyboardMenuHandler {
  hoverIndex: number;
  setHoverIndex: (index: number) => void;
  optionsLength: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  setSelectedOption: () => void;
}
