import { Button } from "@components/Buttons/Button";
import TextField from "@components/Fields/TextField";
import CreateBusinessForm from "@components/Forms/Business/CreateBusiness";
import { createBusinessFormSchema } from "@components/Forms/Business/CreateBusiness/CreateBusinessForm";
import { Heading } from "@components/Texts/Heading";
import { BusinessContext } from "@contexts/businessContext";
import { HelperBarContext } from "@contexts/helperBarContext";
import { joiResolver } from "@hookform/resolvers/joi";
import { createBusiness } from "@providers/api/business";
import { handleSubmit } from "@utils/form";
import { sleep } from "@utils/promises";
import clsx from "clsx";
import { Storefront } from "phosphor-react";
import { useContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";

interface Props {
  formHook: UseFormReturn<IAssignedBusinessSearchForm>;
  className?: string;
}

export default function AssignedBusinessSearchForm({
  formHook,
  className,
}: Props) {
  const { initCustomHelper, closeCustomHelper } = useContext(HelperBarContext);
  const { includeBusiness } = useContext(BusinessContext);

  const createBusinessForm = useForm<ICreateBusinessForm>({
    resolver: joiResolver(createBusinessFormSchema),
  });

  const handleCreateBusinessForm = async () => {
    try {
      const payload = await handleSubmit(createBusinessForm);
      const createdBusiness = await createBusiness(payload);
      includeBusiness(createdBusiness);

      createBusinessForm.reset();
      closeCustomHelper();
    } catch (error) {
      createBusinessForm.setError("root", {
        message: "Houve algum erro no servidor. Tente novamente",
      });
    }
  };

  return (
    <div className={clsx("w-full flex flex-col gap-4", className)}>
      <div className="w-full flex justify-between items-center">
        <Heading size="lg">Meus Espaços</Heading>
        <Button
          className="w-min"
          onClick={() =>
            initCustomHelper(
              <CreateBusinessForm
                formHook={createBusinessForm}
                handleSubmit={handleCreateBusinessForm}
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
        formHook={{ ...formHook, name: "name" }}
      />
    </div>
  );
}
