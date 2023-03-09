import { SelectInput } from "@components/Inputs/Select";
import { UseFormReturn } from "react-hook-form";

interface Props {
  formHook: UseFormReturn<any> & { name?: string };
}

export default function SelectBusiness() {
  return <SelectInput />;
}
