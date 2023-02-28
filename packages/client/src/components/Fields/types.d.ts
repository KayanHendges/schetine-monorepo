import { UseFormReturn } from "react-hook-form";

interface FieldProps {
  label?: string;
  placeholder?: string;
  formHook: UseFormReturn<any> & { name?: string };
}
