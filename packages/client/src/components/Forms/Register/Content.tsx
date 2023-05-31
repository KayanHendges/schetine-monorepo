import { Button } from "@components/Buttons/Default";
import EmailField from "@components/Fields/Email";
import TextField from "@components/Fields/TextField";
import PassowordField from "@components/Fields/Password";
import Logo from "@components/Logo";
import { Text } from "@components/Texts/Text";
import { User } from "phosphor-react";
import Username from "@components/Fields/Username";
import { useContext } from "react";
import { FormRegisterContext } from "@components/Forms/Register";

export default function RegisterContentForm() {
  const { isFormLoading, formHook, hasError } = useContext(FormRegisterContext);

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <Logo />
        <Text>Faça seu login e comece a usar</Text>
      </div>
      <div className="flex flex-col gap-4">
        <TextField
          formHook={{ ...formHook, name: "name" }}
          label={"Nome completo"}
          icon={<User />}
          placeholder={"Ex: João Silva"}
        />
        <Username
          formHook={{ ...formHook, name: "username" }}
          placeholder="Ex: joao_silva"
          validate
        />
        <EmailField
          formHook={{ ...formHook, name: "email" }}
          placeholder="Ex: joao.silva@email.com"
          validate
        />
        <PassowordField
          formHook={{ ...formHook, name: "password" }}
          placeholder="Mínimo de 8 caracteres"
        />
      </div>
      <Button isLoading={isFormLoading} isEnabled={!hasError}>
        Criar conta
      </Button>
    </>
  );
}
