import { objectErrorToArray } from "@utils/objects";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";

export const handleSubmit = <T extends FieldValues>(
  submit: UseFormHandleSubmit<T>
): Promise<T> => {
  return new Promise((resolve, reject) => {
    submit(
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
