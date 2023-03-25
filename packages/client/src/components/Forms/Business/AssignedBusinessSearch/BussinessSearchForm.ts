import Joi from "joi";

export const assignedBusinessSearchFormSchema =
  Joi.object<IAssignedBusinessSearchForm>({
    name: Joi.string(),
  });
