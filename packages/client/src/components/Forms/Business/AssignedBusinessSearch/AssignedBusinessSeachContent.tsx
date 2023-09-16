import { Button } from "@components/Buttons/Default";
import TextField from "@components/Fields/TextField";
import { AssignedBusinessSearchContext } from "@components/Forms/Business/AssignedBusinessSearch";
import { CreateBusinessForm } from "@components/Forms/Business/CreateBusiness";
import { createBusinessFormSchema } from "@components/Forms/Business/CreateBusiness/CreateBusinessForm";
import { Heading } from "@components/Texts/Heading";
import { ToastContext } from "@contexts/ToastContext";
import { BusinessContext } from "@contexts/businessContext";
import { HelperBarContext } from "@contexts/helperBarContext";
import { joiResolver } from "@hookform/resolvers/joi";
import { createBusiness } from "@providers/api/business";
import { handleSubmit } from "@utils/form";
import { Storefront } from "phosphor-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";

export default function AssignedBusinessSeachContent() {
  const { formHook } = useContext(AssignedBusinessSearchContext);
  const { initCustomHelper, closeCustomHelper } = useContext(HelperBarContext);
  const { includeBusiness } = useContext(BusinessContext);
  const { notify } = useContext(ToastContext);

  const createBusinessForm = useForm<ICreateBusinessForm>({
    resolver: joiResolver(createBusinessFormSchema),
  });

  const handleCreateBusinessForm = async () => {
    try {
      const payload = await handleSubmit(createBusinessForm);
      const createdBusiness = await createBusiness(payload);
      includeBusiness(createdBusiness);
      notify({ header: "Espaço criado com sucesso!" });
      createBusinessForm.reset();
      closeCustomHelper();
    } catch (error) {
      notify({
        header: "Erro ao criar espaço. Tente novamente",
        type: "error",
      });
    }
  };

  if (!formHook)
    throw new Error("This component only works with FormContainerProvider");

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <Heading size="lg">Meus Espaços</Heading>
        <Button
          className="w-min"
          type="button"
          onClick={() =>
            initCustomHelper(
              <CreateBusinessForm
                formHook={createBusinessForm}
                onSubmit={handleCreateBusinessForm}
              />
            )
          }
        >
          Criar Espaço
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
