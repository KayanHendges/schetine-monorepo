import { FieldProps } from "@components/Fields/types";
import { TextInput } from "@components/Inputs/Text/InputText";
import { Text } from "@components/Texts/Text";
import { Envelope } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { Path, PathValue, UseFormTrigger } from "react-hook-form";
import { findProfessional } from "@providers/api/professional";

interface Props<T> extends FieldProps<T> {
  validate?: boolean;
}

export default function EmailField<T>({
  label = "Endereço de email",
  placeholder = "Email",
  validate,
  onChange,
  formHook: { name, register, formState, trigger, setError, watch, setValue },
}: Props<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUnique, setIsUnique] = useState<boolean | null>(null);
  const error = formState.errors[name as string];

  const onHandleChanges = (value: string) => {
    if (onChange) onChange(value);
    setValue(name, value as PathValue<T, Path<T>>);
  };

  const validateUniqueEmail = useRef(
    debounce(
      async (
        email: string,
        name: Path<T>,
        trigger: UseFormTrigger<any>,
        setIsUnique: SetState<boolean | null>
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

  const watchedValue = watch(name);
  const typedValue = typeof watchedValue === "string" ? watchedValue : "";

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
            {...register(name)}
            onChange={({ target }) => onHandleChanges(target.value)}
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
