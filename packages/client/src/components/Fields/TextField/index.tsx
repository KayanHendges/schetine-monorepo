import { FieldProps } from "@components/Fields/types";
import { TextInput } from "@components/Inputs/Text/InputText";
import CircularLoader from "@components/Loaders/CircularLoader";
import { Text } from "@components/Texts/Text";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

interface Props extends FieldProps {
  isValid?: boolean;
  isLoading?: boolean;
  icon?: JSX.Element;
  onChange?: (value: string) => void;
  inputRootClassName?: string;
  onStopTypingFuncion?: (...args: any) => any;
}

export default function TextField({
  label,
  icon,
  placeholder,
  isLoading,
  isValid,
  onStopTypingFuncion,
  onChange,
  formHook: { name, register, formState, getValues, setValue },
}: Props) {
  // Todo: debounce typing function
  const [text, setText] = useState<string>(
    () => (name ? getValues(name) : getValues()) || ""
  );

  const onStopTyping = useRef(onStopTypingFuncion ? debounce(debounce) : null);

  const onHandleChanges = (value: string) => {
    if (onChange) onChange(value);
    setValue(name, value);
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
            register={register(name)}
            value={text}
            onChange={({ target }) => onHandleChanges(target.value)}
          />
          {!isLoading && isValid !== undefined && (
            <TextInput.ValidatedIcon isValid={isValid} />
          )}
          {isLoading && <CircularLoader />}
        </TextInput.Root>
        {error?.message && (
          <Text size="sm" className="text-red-400">
            {error.message.toString()}
          </Text>
        )}
      </div>
    </div>
  );
}
