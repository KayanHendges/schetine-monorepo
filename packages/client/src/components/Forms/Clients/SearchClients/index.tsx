import FormContainerProvider from "@components/Containers/Forms/FormContainer/FormContainerContext";
import { IFormContainerContext } from "@components/Containers/Forms/FormContainer/types";
import SearchClientsContent from "@components/Forms/Clients/SearchClients/SearchClientsContent";
import { FormProps } from "@components/Forms/types";
import { createContext } from "react";

export const SearchClientsContext = createContext(
  {} as IFormContainerContext<ISearchClientsForm>
);

export function SearchClientsForm(props: FormProps<ISearchClientsForm>) {
  return (
    <FormContainerProvider Context={SearchClientsContext} {...props}>
      <SearchClientsContent />
    </FormContainerProvider>
  );
}
