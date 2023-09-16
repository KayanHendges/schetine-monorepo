import { FormContainerProps } from "@components/Containers/Forms/FormContainer/types";
import clsx from "clsx";
import { FormEvent } from "react";

export default function FormContainer({
  children,
  className,
  onSubmit,
  loadingState,
  disabled,
  ...props
}: FormContainerProps) {
  const [isLoading, setIsLoading] = loadingState;

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
