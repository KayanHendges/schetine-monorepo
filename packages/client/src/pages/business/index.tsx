import { Button } from "@components/Buttons/Button";
import TextField from "@components/Fields/TextField";
import { Text } from "@components/Texts/Text";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { joiResolver } from "@hookform/resolvers/joi";
import { businessFormSchema } from "@components/Selects/Business/businessFormSchema";
import { Heading } from "@components/Texts/Heading";

export default function Appointments() {
  const searchForm = useForm<IBusinessSearchForm>({
    resolver: joiResolver(businessFormSchema),
  });

  return (
    <div className={clsx("w-full flex flex-col p-4 gap-4")}>
      <div className="w-full flex justify-between items-center">
        <Heading size="lg">Meus Espaços</Heading>
        <Button className="w-min">Criar Espaço</Button>
      </div>
      <TextField formHook={{ ...searchForm, name: "name" }} />
    </div>
  );
}
