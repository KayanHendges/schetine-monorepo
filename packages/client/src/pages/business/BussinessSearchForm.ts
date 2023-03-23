import Joi from "joi";

export const businessSearchFormSchema = Joi.object<IBusinessSearchForm>({
  name: Joi.string(),
});
