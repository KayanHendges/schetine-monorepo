import { customMessages } from "@providers/joi/customMessages";
import Joi from "joi";

export const updateBusinessFormSchema = Joi.object<IUpdateBusinessForm>({
  name: Joi.string(),
}).messages(customMessages);
