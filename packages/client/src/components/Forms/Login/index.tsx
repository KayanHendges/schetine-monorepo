import { Button } from "@components/Buttons/Button";
import EmailField from "@components/Forms/Fields/Email";
import PassowordField from "@components/Forms/Fields/Password";
import { ILoginFormSchema } from "@components/Forms/Login/loginFormSchema";
import Logo from "@components/Logo";
import { Text } from "@components/Texts/Text";
import { UseFormReturn } from "react-hook-form/";

interface Props {
  onSubmit: () => void;
  formRef: UseFormReturn<ILoginFormSchema>;
}

export default function LoginForm({ formRef, onSubmit }: Props) {
  return (
    <div
      className="flex flex-col gap-9"
      onKeyDownCapture={({ key }) => (key === "Enter" ? onSubmit() : null)}
    >
      <div className="flex flex-col items-center gap-3">
        <Logo />
        <Text>Faça seu login e comece a usar</Text>
      </div>
      <div className="flex flex-col gap-4">
        <EmailField formHook={formRef} />
        <PassowordField formHook={formRef} />
      </div>
      <div className="flex flex-col items-center gap-6">
        <Button onClick={() => onSubmit()}>Entrar na plataforma</Button>
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
    </div>
  );
}
