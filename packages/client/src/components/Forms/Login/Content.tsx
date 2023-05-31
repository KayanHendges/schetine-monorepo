import { Button } from "@components/Buttons/Default";
import EmailField from "@components/Fields/Email";
import PassowordField from "@components/Fields/Password";
import { LoginFormContext } from "@components/Forms/Login";
import Logo from "@components/Logo";
import { Text } from "@components/Texts/Text";
import { useContext } from "react";

export default function LoginFormContent() {
  const { isFormLoading, formHook } = useContext(LoginFormContext);

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <Logo />
        <Text>Faça seu login e comece a usar</Text>
      </div>
      <div className="flex flex-col gap-4">
        <EmailField formHook={{ ...formHook, name: "email" }} />
        <PassowordField formHook={{ ...formHook, name: "password" }} />
      </div>
      <div className="flex flex-col items-center gap-6">
        <Button isLoading={isFormLoading}>Entrar na plataforma</Button>
        <div className="flex flex-col items-center gap-4">
          <Text asChild size="sm">
            <a className="underline" href="forgot-password">
              Esqueceu sua senha?
            </a>
          </Text>
          <Text size="sm">
            Não possui uma conta?{" "}
            <a className="underline" href="register">
              Crie agora
            </a>
            .
          </Text>
        </div>
      </div>
    </>
  );
}
