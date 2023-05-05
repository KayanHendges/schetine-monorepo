import { HTMLAttributes } from "react";

interface IFormContainerContext {
  isFormLoading: boolean;
  setIsFormLoading: SetState<boolean>;
}

interface FormContainerProps extends HTMLAttributes<HTMLFormElement> {
  children: JSX.Element | JSX.Element[];
  onSubmit?: (event?: FormEvent<HTMLFormElement>) => Promise<void> | void;
  disabled?: boolean;
  isLoading?: boolean;
}
