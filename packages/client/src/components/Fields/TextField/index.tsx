import { FieldProps } from "@components/Fields/types";
import { TextInput } from "@components/Inputs/Text/InputText";
import CircularLoader from "@components/Loaders/CircularLoader";
import { Text } from "@components/Texts/Text";
import { HTMLAttributes, useRef } from "react";
import { debounce } from "lodash";
import { FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> extends FieldProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onStopTypingFuncion?: (...args: any) => any;
  isValid?: boolean;
  isLoading?: boolean;
  icon?: JSX.Element;
  inputRootClassName?: string;
  inputAttributes?: HTMLAttributes<HTMLInputElement>;
}

export default function TextField<T extends FieldValues>({
  label,
  icon,
  placeholder,
  isLoading,
  isValid,
  onStopTypingFuncion,
  inputAttributes = {},
  formHook: { register, formState },
  formName,
}: Props<T>) {
  // Todo: debounce typing function
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onStopTyping = useRef(onStopTypingFuncion ? debounce(debounce) : null);

  const error = formState.errors[formName];
  return (
    <div className="flex flex-col gap-3">
      {label && <Text className="text-neutral-300">{label} </Text>}
      <div>
        <TextInput.Root validation={error && "error"}>
          {icon && <TextInput.Icon>{icon}</TextInput.Icon>}
          <TextInput.Input
            type="text"
            placeholder={placeholder}
            {...register(formName)}
            {...inputAttributes}
          />
          {!isLoading && isValid !== undefined && (
            <TextInput.ValidatedIcon isValid={isValid} />
          )}
          {isLoading && <CircularLoader />}
        </TextInput.Root>
        {error?.message && (
          <Text size="sm" className="text-red-400">
            {String(error.message)}
          </Text>
        )}
      </div>
    </div>
  );
}
