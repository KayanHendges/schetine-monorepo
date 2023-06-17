import { Button } from "@components/Buttons/Default";
import TextField from "@components/Fields/TextField";
import { updateBusinessFormContext } from "@components/Forms/Business/UpdateBusiness";
import { Heading } from "@components/Texts/Heading";
import { HelperBarContext } from "@contexts/helperBarContext";
import { Storefront } from "phosphor-react";
import { useContext, useEffect } from "react";

export default function UpdateBusinessFormContent({
  business,
}: UpdateBusinessFormProps) {
  const { closeCustomHelper } = useContext(HelperBarContext);
  const { isFormLoading, formHook, hasError } = useContext(
    updateBusinessFormContext
  );

  useEffect(() => {
    formHook.reset(business, { keepDefaultValues: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [business]);

  return (
    <>
      <Heading size="lg" className="text-center">
        Editar Espaço
      </Heading>
      <TextField
        icon={<Storefront />}
        placeholder="Pesquise pelo nome do espaço"
        label="Nome do Espaço"
        formHook={formHook}
        formName="name"
      />
      <div className="w-full flex flex-col gap-3">
        <Button
          isLoading={isFormLoading}
          className="w-full"
          disabled={hasError}
        >
          Salvar
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
          Voltar
        </Button>
      </div>
    </>
  );
}
