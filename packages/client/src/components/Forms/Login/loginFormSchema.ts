import { customMessages } from "@providers/joi/customMessages";
import Joi from "joi";

export interface ILoginFormSchema {
  email: string;
  password: string;
}

const loginFormSchema = Joi.object<ILoginFormSchema>({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string(),
}).messages(customMessages);

export { loginFormSchema };
