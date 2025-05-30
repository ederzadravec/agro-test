import { cpf, cnpj } from "cpf-cnpj-validator";
import * as R from "ramda";

import type { TFormFields, ValidationsArray } from "#/hooks/form";

import { onlyNumbers } from "../number";
import * as date from "../date";

export type TValidate = [(value: any, form?: any) => any, string];

export const isEmpty = (message?: string): TValidate => [
  (value: string) => R.isEmpty(value) || R.isNil(value),
  message || "Campo deve ser preenchido.",
];

export const isEmptySelect = (message?: string): TValidate => [
  (value: { value?: any; id?: string }) => !value || (!value?.value && !value?.id),
  message || "Campo deve ser preenchido.",
];

export const isDate = (format?: string, message?: string): TValidate => [
  (value: string) => value && !date.isValidDate(value, format),
  message || "Data inválida.",
];

export const isCPF = (message?: string): TValidate => [(value: string) => !!value && !cpf.isValid(`${value}`), message || "CPF inválido."];

export const isCNPJ = (message?: string): TValidate => [(value: string) => !!value && !cnpj.isValid(`${value}`), message || "CNPJ inválido."];

export const isEmail = (message?: string): TValidate => [
  (value) => value && !`${value}`.match(/^[a-z0-9._-]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)?.length,
  message || "Email inválido.",
];

export const isCellphone = (message?: string): TValidate => [
  (value) => value && !((onlyNumbers(value) as string).length === 11),
  message || "Celular inválido.",
];

export const isPostalCode = (message?: string): TValidate => [
  (value) => value && !((onlyNumbers(value) as string).length === 8),
  message || "CEP inválido.",
];

export const isTellphone = (message?: string): TValidate => [
  (value) => {
    const newValue = onlyNumbers(value);

    return newValue && !(newValue.length === 10 || newValue.length === 11);
  },
  message || "Telefone inválido.",
];

export const isChecked = (message?: string): TValidate => {
  return [(value) => !value, message || "Não selecionado"];
};

export const isName = (message?: string): TValidate => [
  (value) => value && `${value}`.split(" ").length < 2,
  message || "Sobrenome obrigatório.",
];

export const isEqual = (field: string, message: string): TValidate => [(value: any, form: any) => value !== form[field], message];

export const isPin = (digits: number = 6, message?: string): TValidate => [
  (value) => value && value.length < digits,
  message || "Pin incompleto",
];

export const validateIf = (callback: (form: TFormFields) => boolean, caseTrue: ValidationsArray, caseFalse?: ValidationsArray) => {
  return (form: TFormFields) => {
    if (callback(form)) {
      return caseTrue;
    }

    return caseFalse || [];
  };
};

export const isLessThan = (max: number, message?: string): TValidate => {
  return [(value) => value && parseInt(onlyNumbers(value) || "0") > max, message || `Deve ser menor ou igual a ${max}`];
};

export const isMoreThan = (min: number, message?: string): TValidate => {
  return [(value) => value && parseInt(onlyNumbers(value) || "0") < min, message || `Deve ser maior ou igual a ${min}`];
};

export const hasMinLength = (size: number, message?: string): TValidate => [
  (value: string) => value?.length < size,
  message || "Campo com poucos caracteres.",
];

export default {
  isEmpty,
  isEmptySelect,
  isDate,
  isCPF,
  isCNPJ,
  isEmail,
  isCellphone,
  isTellphone,
  isPostalCode,
  isChecked,
  isName,
  isEqual,
  isPin,
  validateIf,
  isLessThan,
  isMoreThan,
  hasMinLength,
};
