import { cpf, cnpj } from "cpf-cnpj-validator";
import * as R from "ramda";

import type { TFormFields, ValidationsArray } from "#/hooks/form";

import { onlyNumbers } from "../number";
import * as date from "../date";

export type TValidate = [(value: any, form?: any) => any, string];

const isEmpty = (message?: string): TValidate => [
  (value: string) => R.isEmpty(value) || R.isNil(value),
  message || "Campo deve ser preenchido.",
];

const isEmptySelect = (message?: string): TValidate => [
  (value: { value?: any; id?: string }) => !value || (!value?.value && !value?.id),
  message || "Campo deve ser preenchido.",
];

const isDate = (format?: string, message?: string): TValidate => [
  (value: string) => value && !date.isValidDate(value, format),
  message || "Data inválida.",
];

const isCPF = (message?: string): TValidate => [(value: string) => value && !cpf.isValid(`${value}`), message || "CPF inválido."];

const isCNPJ = (message?: string): TValidate => [(value: string) => value && !cnpj.isValid(`${value}`), message || "CNPJ inválido."];

const isEmail = (message?: string): TValidate => [
  (value) => value && !`${value}`.match(/^[a-z0-9._-]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)?.length,
  message || "Email inválido.",
];

const isCellphone = (message?: string): TValidate => [
  (value) => value && !((onlyNumbers(value) as string).length === 11),
  message || "Celular inválido.",
];

const isPostalCode = (message?: string): TValidate => [
  (value) => value && !((onlyNumbers(value) as string).length === 8),
  message || "CEP inválido.",
];

const isTellphone = (message?: string): TValidate => [
  (value) => {
    const newValue = onlyNumbers(value);

    return newValue && !(newValue.length === 10 || newValue.length === 11);
  },
  message || "Telefone inválido.",
];

const isChecked = (message?: string): TValidate => {
  return [(value) => !value, message || "Não selecionado"];
};

const isName = (message?: string): TValidate => [(value) => value && `${value}`.split(" ").length < 2, message || "Sobrenome obrigatório."];

const isEqual = (field: string, message: string): TValidate => [(value: any, form: any) => value !== form[field], message];

const isPin = (digits: number = 6, message?: string): TValidate => [(value) => value && value.length < digits, message || "Pin incompleto"];

const isUploadFile = (message?: string): TValidate => [
  (value: DropFileFile[]) => {
    return value?.length && value.reduce((acc, item) => acc || (!item?.base64 && !item?.path && !item?.file), false);
  },
  message || "Selecione um arquivo",
];

const validateIf = (callback: (form: TFormFields) => boolean, caseTrue: ValidationsArray, caseFalse?: ValidationsArray) => {
  return (form: TFormFields) => {
    if (callback(form)) {
      return caseTrue;
    }

    return caseFalse || [];
  };
};

const isLessThan = (max: number, message?: string): TValidate => {
  return [(value) => value && parseInt(onlyNumbers(value) || "0") > max, message || `Deve ser menor ou igual a ${max}`];
};

const isMoreThan = (min: number, message?: string): TValidate => {
  return [(value) => value && parseInt(onlyNumbers(value) || "0") < min, message || `Deve ser maior ou igual a ${min}`];
};

const hasMinLength = (size: number, message?: string): TValidate => [
  (value: string) => value?.length < size,
  message || "Campo com poucos caracteres.",
];

const hasImagesError = (message?: string): TValidate => [
  (value) => value?.find((item) => item.error),
  message || "Uma ou mais imagens com erro",
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
  isUploadFile,
  isLessThan,
  isMoreThan,
  hasMinLength,
  hasImagesError,
};
