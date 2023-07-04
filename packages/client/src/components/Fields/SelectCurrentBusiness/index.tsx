import { businessFormSchema } from "@components/Fields/SelectCurrentBusiness/businessFormSchema";
import { SingleSelect } from "@components/Selects/SingleSelect";
import { ToastContext } from "@contexts/ToastContext";
import { BusinessContext } from "@contexts/businessContext";
import { joiResolver } from "@hookform/resolvers/joi";
import { handleSubmit } from "@utils/form";
import Joi from "joi";
import { useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export default function SelectCurrentBusiness() {
  const {
    assignedBusiness,
    currentBusiness,
    handleCurrentBusiness,
    fetchingAssignedBusiness,
  } = useContext(BusinessContext);
  const { notify } = useContext(ToastContext);

  const form = useForm<{ business: Business | null }>({
    resolver: joiResolver(
      Joi.object<{ business: Business | null }>({
        business: businessFormSchema,
      })
    ),
    values: { business: currentBusiness },
  });

  const [inputValue, setInputValue] = useState<string>("");
  const errorState = form.formState.errors.business;
  const hasError = Object.keys(errorState || {}).length ? "error" : undefined;

  const onSelectBusiness = async (option: Business) => {
    try {
      form.setValue("business", option);
      const { business } = await handleSubmit(form);
      handleCurrentBusiness(business);
    } catch (error) {
      form.setValue("business", currentBusiness);
      notify({ type: "error", header: "Falha ao selecionar espaço" });
    }
  };

  const filtetedAssignedBusiness = useMemo(
    () =>
      assignedBusiness.filter((business) =>
        business.name
          .toLocaleLowerCase()
          .includes(inputValue.toLocaleLowerCase())
      ),
    [inputValue, assignedBusiness]
  );

  return (
    <SingleSelect.Root
      selectedValue={currentBusiness}
      onSelectedValue={onSelectBusiness}
      renderValue={(business) => business.name}
      identifierKey={"id"}
      options={filtetedAssignedBusiness}
      inputValue={inputValue}
      onInputChanges={setInputValue}
      isLoading={fetchingAssignedBusiness}
      validation={hasError}
      notAllowNull
    >
      <SingleSelect.Input />
      <SingleSelect.Menu />
    </SingleSelect.Root>
  );
}
