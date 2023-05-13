import FormContainerProvider from "@components/Containers/Forms/FormContainer/FormContainerContext";
import { IFormContainerContext } from "@components/Containers/Forms/FormContainer/types";
import RegisterContentForm from "@components/Forms/Register/Content";
import { IRegisterFormSchema } from "@components/Forms/Register/registerFormSchema";
import { createContext } from "react";

export const FormRegisterContext = createContext(
  {} as IFormContainerContext<IRegisterFormSchema>
);

export function RegisterForm(props: FormProps<IRegisterFormSchema>) {
  return (
    <FormContainerProvider
      Context={FormRegisterContext}
      {...props}
    >
      <RegisterContentForm />
    </FormContainerProvider>
  );
}
