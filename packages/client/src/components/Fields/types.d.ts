import { UseFormReturn } from "react-hook-form";

interface FieldProps {
  label?: string;
  formHook: UseFormReturn<any> & { name?: string };
}
