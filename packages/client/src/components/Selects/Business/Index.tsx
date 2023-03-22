import { SelectInput } from "@components/Inputs/Select";
import { SelectOption } from "@components/Inputs/Select/types";
import { ProfessionalContext } from "@contexts/professionalContext";
import { Storefront } from "phosphor-react";
import { useContext } from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  formHook: UseFormReturn<any> & { name?: string };
}

export default function SelectBusiness({ formHook }: Props) {
  const { assignedBusiness } = useContext(ProfessionalContext);
  const { setValue, getValues, name, reset } = formHook;

  const renderOptions = (): SelectOption<Business>[] => {
    return assignedBusiness.map((business) => {
      return { key: business.id, value: business };
    });
  };

  const handleSelected = (option: Business | null) => {
    if (name) setValue(name, option);
    else reset(option);
  };

  return (
    <SelectInput<Business>
      leftIcon={<Storefront />}
      renderLabel={(option) => option.name}
      options={renderOptions()}
      selectedOption={getValues()}
      onSelectOption={(option) => handleSelected(option)}
      optionKey={"id"}
      placeholder={"Escolha um espaço"}
      allowNull={false}
    />
  );
}
