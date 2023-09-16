import FormContainerProvider from "@components/Containers/Forms/FormContainer/FormContainerContext";
import { IFormContainerContext } from "@components/Containers/Forms/FormContainer/types";
import UpdateBusinessFormContent from "@components/Forms/Business/UpdateBusiness/UpdateBusinessFormContent";
import { FormProps } from "@components/Forms/types";
import { createContext } from "react";

interface Props
  extends FormProps<IUpdateBusinessForm>,
    UpdateBusinessFormProps {}

export const updateBusinessFormContext = createContext(
  {} as IFormContainerContext<IUpdateBusinessForm>
);

export function UpdateBusinessForm(props: Props) {
  return (
    <FormContainerProvider Context={updateBusinessFormContext} {...props}>
      <UpdateBusinessFormContent business={props.business} />
    </FormContainerProvider>
  );
}
