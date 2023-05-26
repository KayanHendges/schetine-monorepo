import { FieldProps } from "@components/Fields/types";
import { TextInput } from "@components/Inputs/Text/InputText";
import CircularLoader from "@components/Loaders/CircularLoader";
import { Text } from "@components/Texts/Text";
import { At } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { findProfessional } from "@providers/api/professional";
import { usernameRegex } from "@components/Forms/Register/registerFormSchema";
import { Path, PathValue, UseFormTrigger, UseFormWatch } from "react-hook-form";

interface Props<T> extends FieldProps<T> {
  validate?: boolean;
  icon?: JSX.Element;
}

export default function Username<T extends Record<string, any>>({
  label = "Nome do usuário",
  icon = <At />,
  placeholder,
  validate,
  formHook: { name, register, formState, watch, setError, trigger, setValue },
}: Props<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUnique, setIsUnique] = useState<boolean | null>(null);
  const error = formState.errors[name];

  const validateUniqueUsername = useRef(
    debounce(
      async (
        username: string,
        name: Path<T>,
        trigger: UseFormTrigger<any>,
        setIsUnique: SetState<boolean | null>
      ) => {
        const isValid = await trigger(name, { shouldFocus: true });

        if (!isValid) return setIsUnique(null);
        setIsLoading(true);
        try {
          const { data } = await findProfessional({ username });
          if (data.username === username) {
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

  const validateOnChange = (value: string) => {
    const cleanValue = value
      .replace(" ", "_")
      .replace(/[Çç]/g, "c")
      .replaceAll(/([^a-z0-9._])|((?<=[_.])[_.])/g, "");
    setValue(name, cleanValue as PathValue<T, Path<T>>);
  };

  const typedValue = watch(name);
  useEffect(() => {
    if (!validate || !typedValue?.length) {
      setIsUnique(null);
      return;
    }

    validateUniqueUsername.current(typedValue, name, trigger, setIsUnique);
  }, [name, trigger, typedValue, validate]);

  return (
    <div className="flex flex-col gap-3">
      <Text className="text-neutral-300">{label}</Text>
      <div>
        <TextInput.Root validation={error && "error"}>
          <TextInput.Icon>{icon && icon}</TextInput.Icon>
          <TextInput.Input
            type="text"
            placeholder={placeholder}
            {...register(name)}
            onChange={({ target }) => validateOnChange(target.value)}
          />
          {!isLoading && isUnique !== null && (
            <TextInput.ValidatedIcon isValid={isUnique} />
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
