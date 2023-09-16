import { Button } from "@components/Buttons/Default";
import TextField from "@components/Fields/TextField";
import { SearchClientsContext } from "@components/Forms/Clients/SearchClients";
import { Heading } from "@components/Texts/Heading";
import { Storefront } from "phosphor-react";
import { useContext } from "react";

export default function SearchClientsContent() {
  const { formHook } = useContext(SearchClientsContext);

  if (!formHook)
    throw new Error("This component only works with FormContainerProvider");

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <Heading size="lg">Clientes</Heading>
        <Button className="w-min" type="button">
          Criar Cliente
        </Button>
      </div>
      <TextField
        icon={<Storefront />}
        placeholder="Pesquise pelo nome do espaço"
        formHook={formHook}
        formName={"name"}
      />
    </>
  );
}
