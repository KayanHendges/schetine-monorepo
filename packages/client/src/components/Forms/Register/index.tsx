import { Button } from "@components/Buttons/Button";
import EmailField from "@components/Fields/Email";
import IconTextField from "@components/Fields/IconTextField";
import PassowordField from "@components/Fields/Password";
import Logo from "@components/Logo";
import { Text } from "@components/Texts/Text";
import { UseFormReturn } from "react-hook-form/";
import { User } from "phosphor-react";
import { IRegisterFormSchema } from "@components/Forms/Register/registerFormSchema";
import Username from "@components/Fields/Username";

interface Props {
  onSubmit: () => void;
  formRef: UseFormReturn<IRegisterFormSchema>;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export default function RegisterForm({
  formRef,
  onSubmit,
  isLoading,
  errorMessage,
}: Props) {
  const { formState } = formRef;

  const errorState = formState.errors;
  const hasError = !!Object.keys(errorState).length;

  const handleSubmit = () => {
    if (isLoading || hasError) return;
    onSubmit();
  };

  return (
    <div
      className="flex flex-col gap-9"
      onKeyDownCapture={({ key }) => (key === "Enter" ? handleSubmit() : null)}
    >
      <div className="flex flex-col items-center gap-3">
        <Logo />
        <Text>Faça seu login e comece a usar</Text>
      </div>
      <div className="flex flex-col gap-4">
        <IconTextField
          formHook={{ ...formRef, name: "name" }}
          label={"Nome completo"}
          icon={<User />}
          placeholder={"Ex: João Silva"}
        />
        <Username formHook={formRef} placeholder="Ex: joao_silva" validate />
        <EmailField
          formHook={formRef}
          placeholder="Ex: joao.silva@email.com"
          validate
        />
        <PassowordField
          formHook={formRef}
          placeholder="Mínimo de 8 caracteres"
        />
      </div>
      {errorMessage && (
        <Text className="text-red-500 text-center" size="md">
          {errorMessage}
        </Text>
      )}
      <Button
        isLoading={isLoading}
        isEnabled={!hasError}
        onClick={() => handleSubmit()}
      >
        Criar conta
      </Button>
    </div>
  );
}
