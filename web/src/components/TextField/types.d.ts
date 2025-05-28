export type MaskEnum =
  | 'numeric'
  | 'date'
  | 'month-year'
  | 'timedate'
  | 'hhmmss'
  | 'money'
  | 'decimal'
  | 'percent'
  | 'cpf'
  | 'cnpj'
  | 'phone';

export type MaskConfig = {
  prefix?: string;
  includeThousandsSeparator?: boolean;
  decimalSymbol?: string;
  thousandsSeparatorSymbol?: string;
  decimalLimit?: number;
  integerLimit?: number;
};
