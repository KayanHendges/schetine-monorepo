import {
  FormContainerProps,
  IFormContainerContext,
} from "@components/Containers/Form/types";
import clsx from "clsx";
import { FormEvent, createContext, useState } from "react";

export const FormContainerContext = createContext({} as IFormContainerContext);

export function FormContainerProvider({
  children,
  className,
  onSubmit,
  isLoading,
  disabled,
  ...props
}: FormContainerProps) {
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading || isFormLoading || disabled) return;
    if (onSubmit) {
      setIsFormLoading(true);
      await onSubmit(event);
      setIsFormLoading(false);
    }
  };

  return (
    <FormContainerContext.Provider value={{ isFormLoading, setIsFormLoading }}>
      <form
        className={clsx("flex flex-col gap-8", className)}
        onSubmit={handleSubmit}
        {...props}
      >
        {children}
      </form>
    </FormContainerContext.Provider>
  );
}
