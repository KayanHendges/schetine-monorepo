import { FieldProps } from "@components/Fields/types";
import { TextInput } from "@components/Inputs/Text/InputText";
import CircularLoader from "@components/Loaders/CircularLoader";
import { Text } from "@components/Texts/Text";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { Path, PathValue } from "react-hook-form";

interface Props<T> extends FieldProps<T> {
  isValid?: boolean;
  isLoading?: boolean;
  icon?: JSX.Element;
  inputRootClassName?: string;
  onStopTypingFuncion?: (...args: any) => any;
  inputAttributes?: HTMLAttributes<HTMLInputElement>;
}

export default function TextField<T extends Record<string, any>>({
  label,
  icon,
  placeholder,
  isLoading,
  isValid,
  onStopTypingFuncion,
  onChange,
  inputAttributes = {},
  formHook: { name, register, formState, getValues, setValue, trigger },
}: Props<T>) {
  // Todo: debounce typing function
  const [text, setText] = useState<string>(
    (() => getValues(name)) || ""
  );

  const onStopTyping = useRef(onStopTypingFuncion ? debounce(debounce) : null);

  const onHandleChanges = (value: string) => {
    if (onChange) onChange(value);
    setValue(name, value as PathValue<T, Path<T>>);
    setText(value);
  };

  const error = formState.errors[name];
  return (
    <div className="flex flex-col gap-3">
      {label && <Text className="text-gray-300">{label} </Text>}
      <div>
        <TextInput.Root validation={error && "error"}>
          {icon && <TextInput.Icon>{icon}</TextInput.Icon>}
          <TextInput.Input
            type="text"
            placeholder={placeholder}
            {...register(name)}
            value={text}
            onChange={({ target }) => onHandleChanges(target.value)}
            onBlur={async () => await trigger()}
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
