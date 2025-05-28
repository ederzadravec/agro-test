import createNumberMask from "text-mask-addons/dist/createNumberMask";

import type * as Types from "./types";

export const getMask = (variant: Types.MaskEnum, config?: Types.MaskConfig) => {
  const masks = {
    default: () => null,
    numeric: () => ({
      mask: createNumberMask({
        prefix: "",
        includeThousandsSeparator: false,
        decimalSymbol: "",
        thousandsSeparatorSymbol: "",
        decimalLimit: 0,
        integerLimit: config?.integerLimit || 1,
      }),
    }),
    date: () => ({ mask: [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] }),
    "month-year": () => ({ mask: [/\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] }),
    timedate: () => ({
      mask: [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, ":", /\d/, /\d/],
    }),
    hhmmss: () => ({
      mask: [/\d/, /\d/, ":", /\d/, /\d/, ":", /\d/, /\d/],
    }),
    money: () => ({
      mask: createNumberMask({
        prefix: "R$",
        includeThousandsSeparator: true,
        decimalSymbol: ",",
        thousandsSeparatorSymbol: ".",
        allowDecimal: true,
        allowNegative: true,
        ...config,
      }),
    }),
    decimal: () => ({
      mask: createNumberMask({
        prefix: "",
        integerLimit: 3,
        decimalLimit: 2,
        decimalSymbol: ",",
        allowDecimal: true,
        requireDecimal: true,
        allowNegative: true,
        ...config,
      }),
    }),
    percent: () => ({
      mask: createNumberMask({
        prefix: "",
        sufix: "%",
        integerLimit: 3,
        decimalLimit: 2,
        decimalSymbol: ".",
        allowDecimal: true,
        requireDecimal: true,
        ...config,
      }),
    }),
    cpf: () => ({
      mask: [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/],
    }),
    cnpj: () => ({
      mask: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/],
    }),
    phone: () => ({
      placeholderChar: "\u2000",
      mask: ["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/],
    }),
    "postal-code": () => ({
      mask: [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/],
    }),
  };

  return masks[variant] ? masks[variant]() : masks.default();
};
