import FormContainerProvider from "@components/Containers/Forms/FormContainer/FormContainerContext";
import { IFormContainerContext } from "@components/Containers/Forms/FormContainer/types";
import AssignedBusinessSeachContent from "@components/Forms/Business/AssignedBusinessSearch/AssignedBusinessSeachContent";
import { createContext } from "react";

export const AssignedBusinessSearchContext = createContext(
  {} as IFormContainerContext<IAssignedBusinessSearchForm>
);

export function AssignedBusinessSearchForm(
  props: FormProps<ICreateBusinessForm>
) {
  return (
    <FormContainerProvider Context={AssignedBusinessSearchContext} {...props}>
      <AssignedBusinessSeachContent />
    </FormContainerProvider>
  );
}
