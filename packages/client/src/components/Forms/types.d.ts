interface FormProps<T extends Record<string, any>> {
  formHook: UseFormReturn<T>;
  errorMessage?: string | null;
  formLoadingState?: SetState<boolean>;
  onSubmit?: (event?: FormEvent<HTMLFormElement>) => Promise<void> | void;
  className?: string;
}
