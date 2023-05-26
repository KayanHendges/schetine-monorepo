import FormContainer from "@components/Containers/Forms/FormContainer";
import {
  FormContainerContextProps,
  FormContainerProps,
  IFormContainerContext,
} from "@components/Containers/Forms/FormContainer/types";
import { createContext, useState } from "react";

export default function FormContainerProvider<T>({
  children,
  loadingState,
  formHook,
  errorMessage,
  Context,
  ...props
}: FormContainerContextProps<T>) {
  const useLoadingState = useState<boolean>(false);
  const [isFormLoading, setIsFormLoading] = loadingState ?? useLoadingState;

  const { formState } = formHook;

  const errorState = formState.errors;
  const hasError = !!Object.keys(errorState).length;

  return (
    <Context.Provider
      value={{
        isFormLoading,
        setIsFormLoading,
        formHook,
        errorMessage,
        hasError,
      }}
    >
      <FormContainer
        loadingState={[isFormLoading, setIsFormLoading]}
        {...props}
      >
        {children}
      </FormContainer>
    </Context.Provider>
  );
}
