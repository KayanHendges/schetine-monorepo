import { FieldProps } from "@components/Fields/types";
import { TextInput } from "@components/Inputs/Text/InputText";
import { Text } from "@components/Texts/Text";
import { Envelope } from "phosphor-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { UseFormTrigger } from "react-hook-form";
import { findProfessional } from "@providers/api/professional";

interface Props extends FieldProps {
  validate?: boolean;
}

export default function EmailField({
  label = "Endereço de email",
  placeholder = "Email",
  validate,
  formHook: { name = "email", register, formState, trigger, setError, watch },
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUnique, setIsUnique] = useState<boolean | null>(null);
  const error = formState.errors[name];

  const validateUniqueEmail = useRef(
    debounce(
      async (
        email: string,
        name: string,
        trigger: UseFormTrigger<any>,
        setIsUnique: Dispatch<SetStateAction<boolean | null>>
      ) => {
        const isValid = await trigger(name, { shouldFocus: true });

        if (!isValid) return setIsUnique(null);
        setIsLoading(true);
        try {
          const { data } = await findProfessional({ email });
          if (data.email === email) {
            setIsUnique(false);
            setError(name, { message: "Usuário já existente" });
          }
        } catch (err) {
          if (err?.message?.includes("404")) setIsUnique(true);
        }
        setIsLoading(false);
      },
      1000
    )
  );

  const typedValue = watch(name);
  useEffect(() => {
    if (!validate || !typedValue?.length) {
      setIsUnique(null);
      return;
    }

    validateUniqueEmail.current(typedValue, name, trigger, setIsUnique);
  }, [name, trigger, typedValue, validate]);

  return (
    <div className="flex flex-col gap-3">
      <Text className="text-gray-300">{label}</Text>
      <div>
        <TextInput.Root validation={error && "error"}>
          <TextInput.Icon>
            <Envelope />
          </TextInput.Icon>
          <TextInput.Input
            type="email"
            placeholder={placeholder}
            register={register(name)}
          />
          {!isLoading && isUnique !== null && (
            <TextInput.ValidatedIcon isValid={isUnique} />
          )}
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
