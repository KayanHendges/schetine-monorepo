import Joi from "joi";

export const createBusinessFormSchema =
  Joi.object<ICreateBusinessForm>({
    name: Joi.string(),
  });
