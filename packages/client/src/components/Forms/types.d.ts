import { FormContainerContextProps } from "@components/Containers/Forms/FormContainer/types";
import { FieldValues } from "react-hook-form";

interface FormProps<T extends FieldValues>
  extends Omit<FormContainerContextProps<T>, "Context"> {
  className?: string;
}
