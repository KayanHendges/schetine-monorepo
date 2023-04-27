import { Button } from "@components/Buttons/Button";
import useFormContainer from "@components/Containers/Form";
import EmailField from "@components/Fields/Email";
import PassowordField from "@components/Fields/Password";
import { ILoginFormSchema } from "@components/Forms/Login/loginFormSchema";
import Logo from "@components/Logo";
import { Text } from "@components/Texts/Text";
import { UseFormReturn } from "react-hook-form/";

interface Props {
  onSubmit: () => void;
  formRef: UseFormReturn<ILoginFormSchema>;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export default function LoginForm({
  formRef,
  onSubmit,
  isLoading,
  errorMessage,
}: Props) {
  const { Form } = useFormContainer();

  return (
    <Form onSubmit={onSubmit} isLoading={isLoading}>
      <div className="flex flex-col items-center gap-3">
        <Logo />
        <Text>Faça seu login e comece a usar</Text>
      </div>
      <div className="flex flex-col gap-4">
        <EmailField formHook={formRef} />
        <PassowordField formHook={formRef} />
      </div>
      {errorMessage && (
        <Text className="text-red-500 text-center whitespace-normal" size="md">
          {errorMessage}
        </Text>
      )}
      <div className="flex flex-col items-center gap-6">
        <Button isLoading={isLoading}>Entrar na plataforma</Button>
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
    </Form>
  );
}
