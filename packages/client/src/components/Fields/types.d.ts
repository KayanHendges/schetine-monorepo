import { FieldValues, UseFormReturn } from "react-hook-form";
import { NestedKeysSatifiesType } from "types";

interface FieldProps<T extends FieldValues, FieldValueType = string> {
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  formHook: UseFormReturn<T>;
  formName: NestedKeysSatifiesType<T, FieldValueType>;
}
