import { FieldProps } from "@components/Forms/Fields/types";
import { TextInput } from "@components/Inputs/Text/InputText";
import { Text } from "@components/Texts/Text";
import { Lock } from "phosphor-react";

interface Props extends FieldProps {}

export default function PassowordField({
  label = "Senha",
  formHook: { name = "password", register },
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <Text className="text-gray-300">{label}</Text>
      <TextInput.Root>
        <TextInput.Icon>
          <Lock />
        </TextInput.Icon>
        <TextInput.Input placeholder="Senha" register={register(name)} />
      </TextInput.Root>
    </div>
  );
}
