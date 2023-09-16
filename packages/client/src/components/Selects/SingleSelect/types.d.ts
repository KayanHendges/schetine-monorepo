import { TextInputInputProps } from "@components/Inputs/Text/InputText";
import { SetState } from "@types";
import { HTMLAttributes, ReactNode } from "react";

interface SingleSelectValueProps<T> {
  options: T[];
  selectedValue: T | null;
  onSelectedValue: (value: T | null) => void;
  renderValue: (value: T) => string;
  renderOption?: (value: T) => ReactNode;
  notAllowNull?: boolean;
  identifierKey: keyof T;
  inputValue: string;
  onInputChanges: (value: string) => void;
  isLoading?: boolean;
  validation?: "error";
}

interface ISingleSelectContext<T> extends SingleSelectValueProps<T> {
  isMenuOpen: boolean;
  setIsMenuOpen: SetState<boolean>;
  hoverItem: number | null;
  setHoverItem: SetState<number | null>;
}

interface SingleSelectRootProps<T> extends SingleSelectValueProps<T> {
  children: ReactNode;
  className?: string;
}

type SingleSelectInputProps = TextInputInputProps;

interface SingleSelectMenuProps extends HTMLAttributes<HTMLDivElement> {
  emptyListMessage?: string;
}

interface SingleSelectItemProps<T> extends HTMLAttributes<HTMLSpanElement> {
  value: T;
}

interface keyboardMenuHandler {
  hoverItem: number | null;
  setHoverItem: (item: number | null) => void;
  optionsLength: number;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  setSelectedOption: () => void;
}
