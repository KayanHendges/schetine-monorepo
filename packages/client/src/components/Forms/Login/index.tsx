import FormContainerProvider from "@components/Containers/Forms/FormContainer/FormContainerContext";
import { IFormContainerContext } from "@components/Containers/Forms/FormContainer/types";
import LoginFormContent from "@components/Forms/Login/Content";
import { ILoginFormSchema } from "@components/Forms/Login/loginFormSchema";
import { FormProps } from "@components/Forms/types";
import { createContext } from "react";

export const LoginFormContext = createContext(
  {} as IFormContainerContext<ILoginFormSchema>
);

export function LoginForm(props: FormProps<ILoginFormSchema>) {
  return (
    <FormContainerProvider Context={LoginFormContext} {...props}>
      <LoginFormContent />
    </FormContainerProvider>
  );
}
