import { Button } from "@components/Buttons/Button";
import useFormContainer from "@components/Containers/Form";
import Form from "@components/Containers/Form";
import TextField from "@components/Fields/TextField";
import { FormProps } from "@components/Forms/types";
import { Heading } from "@components/Texts/Heading";
import { Text } from "@components/Texts/Text";
import { HelperBarContext } from "@contexts/helperBarContext";
import { sleep } from "@utils/promises";
import clsx from "clsx";
import { Storefront } from "phosphor-react";
import { useContext, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

interface Props extends FormProps {
  formHook: UseFormReturn<ICreateBusinessForm>;
}

export default function CreateBusinessForm({
  formHook,
  className,
  handleSubmit,
}: Props) {
  const { closeCustomHelper } = useContext(HelperBarContext);
  const { Form, isFormLoading } = useFormContainer();

  const errorState = formHook.formState.errors;
  const hasError = !!Object.keys(errorState).length;

  return (
    <Form onSubmit={handleSubmit} className={clsx("p-3", className)}>
      <Heading size="lg" className="text-center">
        Criar novo espaço
      </Heading>
      <TextField
        icon={<Storefront />}
        placeholder="Pesquise pelo nome do espaço"
        label="Nome do Espaço"
        formHook={{ ...formHook, name: "name" }}
      />
      <div className="w-full flex flex-col gap-3">
        <Button isLoading={isFormLoading} className="w-full">
          Criar Espaço
        </Button>
        <Button
          className="w-full"
          buttonStyle="secondary"
          type="button"
          onClick={() => closeCustomHelper()}
        >
          Cancelar
        </Button>
        {hasError && (
          <Text size="sm" className="text-red-400 text-center">
            Houve algum problema. Tente novamente.
          </Text>
        )}
      </div>
    </Form>
  );
}
