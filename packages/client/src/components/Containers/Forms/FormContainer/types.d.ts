import { Context, HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";

interface IFormContainerContext<T> {
  isFormLoading: boolean;
  setIsFormLoading: SetState<boolean>;
  formHook: UseFormReturn<T>;
  errorMessage?: string | null;
  hasError: boolean;
  opa?: T;
}

interface FormContainerProps extends HTMLAttributes<HTMLFormElement> {
  onSubmit?: (event?: FormEvent<HTMLFormElement>) => Promise<void> | void;
  disabled?: boolean;
  loadingState: UseState<boolean>;
}

interface FormContainerContextProps<T> extends FormContainerProps {
  Context: Context<IFormContainerContext<T>>;
  onSubmit?: (event?: FormEvent<HTMLFormElement>) => Promise<void> | void;
  formHook?: UseFormReturn<T>;
  errorMessage?: string | null;
  onSuccess?: (value: T) => Promise<void> | void;
  onFailure?: (error: T, formValue: T) => Promise<void> | void;
  loadingState?: UseState<boolean>;
}
