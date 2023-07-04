import { customMessages } from "@providers/joi/customMessages";
import Joi from "joi";

const ownerFormSchema = Joi.object<Professional>({
  id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: false }).required(),
  username: Joi.string().required(),
  modified: Joi.date().required(),
  created: Joi.date().required(),
});

const businessFormSchema = Joi.object<AssignedBusiness>({
  id: Joi.string().uuid({ version: "uuidv4" }).required(),
  name: Joi.string().required(),
  ownerId: Joi.string().uuid({ version: "uuidv4" }).required(),
  owner: ownerFormSchema.required(),
  modified: Joi.date().required(),
  created: Joi.date().required(),
}).messages(customMessages);

export { businessFormSchema };
