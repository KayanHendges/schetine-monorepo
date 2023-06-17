import FormContainer from "@components/Containers/Forms/FormContainer";
import { FormContainerContextProps } from "@components/Containers/Forms/FormContainer/types";
import { handleSubmit } from "@utils/form";
import { FormEvent, useCallback, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function FormContainerProvider<T extends FieldValues>({
  children,
  loadingState,
  formHook,
  errorMessage,
  Context,
  onSubmit,
  onSuccess,
  onFailure,
  ...props
}: FormContainerContextProps<T>) {
  const useLoadingState = useState<boolean>(false);
  const [isFormLoading, setIsFormLoading] = loadingState ?? useLoadingState;

  const internalFormHook = useForm<T>();
  const form = formHook || internalFormHook;

  const { formState } = form;

  const errorState = formState.errors;
  const hasError = !!Object.keys(errorState).length;

  const handleOnSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        if (onSubmit) await onSubmit(event);
        const payload = await handleSubmit(form);

        if (onSuccess) onSuccess(payload);
      } catch (error) {
        if (onFailure) {
          const payload = form.getValues();
          onFailure(error, payload);
        }
      }
    },
    [form, onFailure, onSubmit, onSuccess]
  );

  return (
    <Context.Provider
      value={{
        isFormLoading,
        setIsFormLoading,
        formHook: form,
        errorMessage,
        hasError,
      }}
    >
      <FormContainer
        loadingState={[isFormLoading, setIsFormLoading]}
        onSubmit={handleOnSubmit}
        {...props}
      >
        {children}
      </FormContainer>
    </Context.Provider>
  );
}
