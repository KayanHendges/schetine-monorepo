import { objectErrorToArray } from "@utils/objects";
import { FieldValues, UseFormReturn } from "react-hook-form";

export const handleSubmit = <T extends FieldValues>(
  form: UseFormReturn<T>
): Promise<T> => {
  return new Promise((resolve, reject) => {
    form.handleSubmit(
      (data) => {
        resolve(data);
      },
      (err) => {
        const messages = objectErrorToArray(err);
        reject({ ...err, messages });
      }
    )();
  });
};
