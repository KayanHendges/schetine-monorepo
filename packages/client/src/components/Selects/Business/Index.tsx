import { SelectInput } from "@components/Inputs/Select";
import { SelectOption } from "@components/Inputs/Select/types";
import { businessFormSchema } from "@components/Selects/Business/businessFormSchema";
import { BusinessContext } from "@contexts/businessContext";
import { joiResolver } from "@hookform/resolvers/joi";
import { handleSubmit } from "@utils/form";
import Joi from "joi";
import { Storefront } from "phosphor-react";
import { useContext, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";

interface Props {}

export default function SelectBusiness({}: Props) {
  const { assignedBusiness } = useContext(BusinessContext);
  const { currentBusiness, handleCurrentBusiness } =
    useContext(BusinessContext);

  const currentBusinessForm = useForm<{ business: Business | null }>({
    resolver: joiResolver(
      Joi.object<{ business: Business | null }>({
        business: businessFormSchema,
      })
    ),
    values: { business: currentBusiness },
  });

  const { getValues, reset, setValue, formState, clearErrors } =
    currentBusinessForm;
  const errorState = formState.errors;

  useEffect(() => {
    setValue("business", currentBusiness);
  }, [currentBusiness, setValue]);

  const handleSelected = async (option: Business) => {
    try {
      setValue("business", option);
      const { business } = await handleSubmit(currentBusinessForm.handleSubmit);
      handleCurrentBusiness(business);
      setValue("business", business);
    } catch (error) {
      setValue("business", currentBusiness);
      setTimeout(() => clearErrors("business"), 500);
    }
  };

  const renderOptions = (): SelectOption<Business>[] => {
    return assignedBusiness.map((business) => {
      return { key: business.id, value: business };
    });
  };

  return (
    <SelectInput<Business>
      leftIcon={<Storefront />}
      renderLabel={(option) => option.name}
      options={renderOptions()}
      selectedOption={getValues().business}
      onSelectOption={handleSelected}
      optionKey={"id"}
      placeholder={"Escolha um espaço"}
      allowNull={false}
      validation={Object.keys(errorState).length ? "error" : undefined}
    />
  );
}
