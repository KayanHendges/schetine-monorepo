import { FormContainerProps } from "@components/Containers/Forms/FormContainer/types";
import clsx from "clsx";
import { FormEvent, useState } from "react";

export default function FormContainer({
  children,
  className,
  onSubmit,
  loadingState,
  disabled,
  ...props
}: FormContainerProps) {
  const [isLoading, setIsLoading] = loadingState || useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading || disabled) return;
    if (onSubmit) {
      setIsLoading(true);
      await onSubmit(event);
      setIsLoading(false);
    }
  };

  return (
    <form
      className={clsx("flex flex-col gap-8", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      {children}
    </form>
  );
}
