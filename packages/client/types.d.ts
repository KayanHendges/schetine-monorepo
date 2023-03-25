import { UseFormReturn, Path } from "react-hook-form";

interface FormRef<T = Record<string, any>> extends UseFormReturn<T> {
  name: keyof T;
}
