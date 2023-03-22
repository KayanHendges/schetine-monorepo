import { customMessages } from "@providers/joi/customMessages";
import Joi from "joi";

export const usernameRegex = /^(?=[a-z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

export interface IRegisterFormSchema {
  name: string;
  username: string;
  email: string;
  password: string;
}

const registerFormSchema = Joi.object<IRegisterFormSchema>({
  name: Joi.string()
    .regex(/^([a-zA-Z^ãõ´]+ )+[a-zA-Z^ãõ´]+$/)
    .messages({
      "string.pattern.base":
        "Formato inválido. É preciso conter seu nome e sobrenome.",
    }),
  username: Joi.string().min(8).regex(usernameRegex),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(8).max(20),
}).messages(customMessages);

export { registerFormSchema };
