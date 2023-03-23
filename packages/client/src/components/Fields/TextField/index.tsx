import { FieldProps } from "@components/Fields/types";
import { TextInput } from "@components/Inputs/Text/InputText";
import CircularLoader from "@components/Loaders/CircularLoader";
import { Text } from "@components/Texts/Text";

interface Props extends FieldProps {
  isValid?: boolean;
  isLoading?: boolean;
  icon?: JSX.Element;
  inputRootClassName?: string;
}

export default function TextField({
  label,
  icon,
  placeholder,
  isLoading,
  isValid,
  formHook: { name, register, formState },
}: Props) {
  const error = formState.errors[name];
  return (
    <div className="flex flex-col gap-3">
      {label && <Text className="text-gray-300">{label}</Text>}
      <div>
        <TextInput.Root validation={error && "error"}>
          {icon && <TextInput.Icon>{icon}</TextInput.Icon>}
          <TextInput.Input
            type="text"
            placeholder={placeholder}
            register={register(name)}
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
