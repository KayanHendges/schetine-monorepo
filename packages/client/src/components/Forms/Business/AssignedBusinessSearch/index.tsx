import { Button } from "@components/Buttons/Button";
import TextField from "@components/Fields/TextField";
import CreateBusinessForm from "@components/Forms/Business/CreateBusiness";
import { createBusinessFormSchema } from "@components/Forms/Business/CreateBusiness/CreateBusinessForm";
import { Heading } from "@components/Texts/Heading";
import { HelperBarContext } from "@contexts/helperBarContext";
import { joiResolver } from "@hookform/resolvers/joi";
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
  const { isOpen, open, close, initCustomHelper } =
    useContext(HelperBarContext);

  const createBusiness = useForm<ICreateBusinessForm>({
    resolver: joiResolver(createBusinessFormSchema),
  });

  return (
    <div className={clsx("w-full flex flex-col gap-4", className)}>
      <div className="w-full flex justify-between items-center">
        <Heading size="lg">Meus Espaços</Heading>
        <Button
          className="w-min"
          onClick={() =>
            initCustomHelper(<CreateBusinessForm formHook={createBusiness} />)
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
