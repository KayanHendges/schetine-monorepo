import { LanguageMessages } from "joi";

const requiredFieldMessage = "Campo obrigatório";

export const customMessages: LanguageMessages = {
  "any.required": requiredFieldMessage,
  "any.unknown": "Esse campo não é parte do formulário",
  "object.base": requiredFieldMessage,
  "object.min": "Esse campo deve ter no mínimo {{#limit}} propriedades",
  "object.max": "Esse campo deve ter no máximo {{#limit}} propriedades",
  "object.length": "Esse campo deve ter exatamente {{#limit}} propriedades",
  "object.unknown":
    "Esse campo contém propriedades desconhecidas: {{#unknown}}",
  "string.min": "Esse campo deve ter no mínimo {{#limit}} caracteres",
  "string.max": "Esse campo deve ter no máximo {{#limit}} caracteres",
  "string.alphanum": "Esse campo deve conter somente caracteres alfanuméricos",
  "string.empty": "Campo Obrigatório",
  "string.email": "Email inválido",
  "string.uri": "Url inválida",
  "string.length": "Esse campo deve ter exatamente {{#limit}} caracteres",
  "string.lowercase": "Esse campo deve conter somente letras minúsculas",
  "string.uppercase": "Esse campo deve conter somente letras maiúsculas",
  "string.regex.base": "Esse campo não corresponde ao padrão esperado",
  "array.includesRequiredUnknowns": "Esse campo contém itens obrigatórios",
  "array.min": "Esse campo deve ter no mínimo {{#limit}} itens",
  "array.max": "Esse campo deve ter no máximo {{#limit}} itens",
  "array.unique": "Esse campo deve conter itens únicos",
  "array.items": "Esse campo contém itens inválidos",
  "number.min": "Esse campo deve ser no mínimo {{#limit}}",
  "number.max": "Esse campo deve ser no máximo {{#limit}}",
  "number.integer": "Esse campo deve ser um número inteiro",
  "number.greater": "Esse campo deve ser maior que {{#limit}}",
  "number.less": "Esse campo deve ser menor que {{#limit}}",
  "number.precision": "Esse campo deve ter no máximo {{#limit}} casas decimais",
};
