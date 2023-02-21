import { FieldProps } from "@components/Fields/types";
import { TextInput } from "@components/Inputs/Text/InputText";
import { Text } from "@components/Texts/Text";
import { Lock, EyeClosed, Eye } from "phosphor-react";
import { useState } from "react";

interface Props extends FieldProps {
  
}

export default function PassowordField({
  label = "Senha",
  formHook: { name = "password", register, formState },
}: Props) {
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const error = formState.errors[name];
  return (
    <div className="flex flex-col gap-3">
      <Text className="text-gray-300">{label}</Text>
      <TextInput.Root validation={error && "error"}>
        <TextInput.Icon>
          <Lock />
        </TextInput.Icon>
        <TextInput.Input
          type={hidePassword ? "password" : "text"}
          placeholder="Senha"
          register={register(name)}
        />
        <TextInput.Icon className="hover:text-indigo-400 cursor-pointer" onClick={() => setHidePassword(!hidePassword)}>
          {hidePassword ? <EyeClosed /> : <Eye />}
        </TextInput.Icon>
      </TextInput.Root>
      {error?.message && (
        <Text size="sm" className="text-red-400">
          {error.message.toString()}
        </Text>
      )}
    </div>
  );
}
