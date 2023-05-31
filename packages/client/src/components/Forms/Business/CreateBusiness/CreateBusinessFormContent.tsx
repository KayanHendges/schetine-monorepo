import { Button } from "@components/Buttons/Default";
import TextField from "@components/Fields/TextField";
import { CreateBusinessFormContext } from "@components/Forms/Business/CreateBusiness";
import { Heading } from "@components/Texts/Heading";
import { Text } from "@components/Texts/Text";
import { HelperBarContext } from "@contexts/helperBarContext";
import { Storefront } from "phosphor-react";
import { useContext } from "react";

export default function CreateBusinessFormContent() {
  const { closeCustomHelper } = useContext(HelperBarContext);
  const { isFormLoading, formHook, hasError } = useContext(
    CreateBusinessFormContext
  );

  return (
    <>
      <Heading size="lg" className="text-center">
        Criar novo espaço
      </Heading>
      <TextField
        icon={<Storefront />}
        placeholder="Pesquise pelo nome do espaço"
        label="Nome do Espaço"
        formHook={{ ...formHook, name: "name" }}
      />
      <div className="w-full flex flex-col gap-3">
        <Button
          isLoading={isFormLoading}
          className="w-full"
          disabled={hasError}
        >
          Criar Espaço
        </Button>
        <Button
          className="w-full"
          buttonStyle="secondary"
          type="button"
          onClick={() => {
            closeCustomHelper();
            formHook.reset();
          }}
        >
          Cancelar
        </Button>
      </div>
    </>
  );
}
