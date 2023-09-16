import Joi from "joi";

export const searchClientsForm = Joi.object<ISearchClientsForm>({
  name: Joi.string().allow(null, ""),
});
