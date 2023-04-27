import clsx from "clsx";
import { FormEvent, HTMLAttributes, useState } from "react";

interface Props extends HTMLAttributes<HTMLFormElement> {
  children: JSX.Element | JSX.Element[];
  onSubmit?: (event?: FormEvent<HTMLFormElement>) => Promise<void> | void;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function useFormContainer() {
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

  function Form({
    children,
    className,
    onSubmit,
    isLoading,
    disabled,
    ...props
  }: Props) {
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
      <form
        className={clsx("flex flex-col gap-8", className)}
        onSubmit={handleSubmit}
        {...props}
      >
        {children}
      </form>
    );
  }

  return {
    isFormLoading,
    Form,
  };
}
