import { Button } from "@components/Buttons/Button";
import TextField from "@components/Fields/TextField";
import { Heading } from "@components/Texts/Heading";
import { HelperBarContext } from "@contexts/helperBarContext";
import clsx from "clsx";
import { Storefront } from "phosphor-react";
import { useContext } from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  formHook: UseFormReturn<ICreateBusinessForm>;
  className?: string;
}

export default function CreateBusinessForm({ formHook, className }: Props) {
  const { close } = useContext(HelperBarContext);

  return (
    <div className={clsx("w-full flex flex-col gap-8 p-3", className)}>
      <Heading size="lg" className="text-center">Criar novo espaço</Heading>
      <TextField
        icon={<Storefront />}
        placeholder="Pesquise pelo nome do espaço"
        label="Nome do Espaço"
        formHook={{ ...formHook, name: "name" }}
      />
      <div className="w-full flex justify-between items-center">
        <Button className="w-min ma" onClick={() => close()}>Cancelar</Button>
        <Button className="w-min ma">Criar Espaço</Button>
      </div>
    </div>
  );
}
