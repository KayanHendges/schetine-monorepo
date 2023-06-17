import { FieldProps } from "@components/Fields/types";
import { TextInput } from "@components/Inputs/Text/InputText";
import { Text } from "@components/Texts/Text";
import { Lock, EyeClosed, Eye } from "phosphor-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { FormValueType } from "types";

type Props<T extends FieldValues> = FieldProps<T>;

export default function PassowordField<T extends FieldValues>({
  label = "Senha",
  placeholder = "",
  onChange,
  formHook: { register, formState, setValue },
  formName,
}: Props<T>) {
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const onHandleChanges = (value: string) => {
    if (onChange) onChange(value);
    setValue(formName, value as FormValueType<T>);
  };

  const error = formState.errors[formName];
  return (
    <div className="flex flex-col gap-3">
      <Text className="text-neutral-300">{label}</Text>
      <div>
        <TextInput.Root validation={error && "error"}>
          <TextInput.Icon>
            <Lock />
          </TextInput.Icon>
          <TextInput.Input
            type={hidePassword ? "password" : "text"}
            placeholder={placeholder}
            {...register(formName)}
            onChange={({ target }) => onHandleChanges(target.value)}
          />
          <TextInput.Icon
            className="hover:text-indigo-400 cursor-pointer"
            onClick={() => setHidePassword(!hidePassword)}
          >
            {hidePassword ? <EyeClosed /> : <Eye />}
          </TextInput.Icon>
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
