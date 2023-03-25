import { Button } from "@components/Buttons/Button";
import TextField from "@components/Fields/TextField";
import { Heading } from "@components/Texts/Heading";
import { BusinessContext } from "@contexts/businessContext";
import clsx from "clsx";
import { useContext } from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  formHook: UseFormReturn<IAssignedBusinessSearchForm>;
  className?: string;
}

export default function AssignedBusinessSearchForm({
  formHook,
  className,
}: Props) {
  const { assignedBusiness } = useContext(BusinessContext);

  return (
    <div className={clsx("w-full flex flex-col gap-4")}>
      <div className="w-full flex justify-between items-center">
        <Heading size="lg">Meus Espaços</Heading>
        <Button className="w-min">Criar Espaço</Button>
      </div>
      <TextField formHook={{ ...formHook, name: "name" }} />
    </div>
  );
}
