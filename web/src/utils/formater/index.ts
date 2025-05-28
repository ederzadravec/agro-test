import { cnpj } from "cpf-cnpj-validator";

export const formatCNPJ = (value: string | number): string => {
  if (!value) {
    return "";
  }

  const formatted = cnpj.format(`${value}`);
  return formatted;
};

export const formatNumber = (value: string | number): number => {
  if (!value) {
    return 0;
  }

  const number = `${value}`;
  return parseInt(number.replace(/[^0-9]/g, ""), 10);
};
