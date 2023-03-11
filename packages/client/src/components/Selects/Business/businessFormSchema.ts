import { customMessages } from "@providers/joi/customMessages";
import Joi from "joi";

const businessFormSchema = Joi.object<Business>({
  id: Joi.string().uuid({ version: "uuidv4" }).required(),
  name: Joi.string().required(),
  ownerId: Joi.string().uuid({ version: "uuidv4" }).required(),
  modified: Joi.date().required(),
  created: Joi.date().required(),
}).messages(customMessages);

export { businessFormSchema };
