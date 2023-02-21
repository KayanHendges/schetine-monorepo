import { FieldProps } from "@components/Fields/types";
import { TextInput } from "@components/Inputs/Text/InputText";
import { Text } from "@components/Texts/Text";
import { Envelope } from "phosphor-react";

interface Props extends FieldProps {}

export default function EmailField({
  label = "Endereço de email",
  formHook: { name = "email", register, formState },
}: Props) {
  const error = formState.errors[name];
  return (
    <div className="flex flex-col gap-3">
      <Text className="text-gray-300">{label}</Text>
      <TextInput.Root  validation={error && "error"}>
        <TextInput.Icon>
          <Envelope />
        </TextInput.Icon>
        <TextInput.Input type="email" placeholder="Email" register={register(name)} />
      </TextInput.Root>
      {error?.message && (
        <Text size="sm" className="text-red-400">
          {error.message.toString()}
        </Text>
      )}
    </div>
  );
}
