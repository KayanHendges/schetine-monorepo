import { UseFormReturn } from "react-hook-form";
import { FormRef } from "types";

interface FieldProps<T = Record<string, any>> {
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  formHook: FormRef<T>;
}
