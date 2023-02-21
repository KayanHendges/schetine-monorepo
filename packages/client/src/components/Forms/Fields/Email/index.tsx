import { FieldProps } from "@components/Forms/Fields/types";
import { TextInput } from "@components/Inputs/Text/InputText";
import { Text } from "@components/Texts/Text";
import { Envelope } from "phosphor-react";

interface Props extends FieldProps {}

export default function EmailField({
  label = "Endereço de email",
  formHook: { name = "email", register },
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <Text className="text-gray-300">{label}</Text>
      <TextInput.Root>
        <TextInput.Icon>
          <Envelope />
        </TextInput.Icon>
        <TextInput.Input placeholder="Email" register={register(name)} />
      </TextInput.Root>
    </div>
  );
}
