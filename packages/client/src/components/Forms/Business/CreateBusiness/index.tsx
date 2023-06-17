import FormContainerProvider from "@components/Containers/Forms/FormContainer/FormContainerContext";
import { IFormContainerContext } from "@components/Containers/Forms/FormContainer/types";
import CreateBusinessFormContent from "@components/Forms/Business/CreateBusiness/CreateBusinessFormContent";
import { FormProps } from "@components/Forms/types";
import { createContext } from "react";

export const CreateBusinessFormContext = createContext(
  {} as IFormContainerContext<ICreateBusinessForm>
);

export function CreateBusinessForm(props: FormProps<ICreateBusinessForm>) {
  return (
    <FormContainerProvider Context={CreateBusinessFormContext} {...props}>
      <CreateBusinessFormContent />
    </FormContainerProvider>
  );
}
