export const onlyNumbers = (data: string): string | undefined => {
  if (!data) {
    return;
  }

  return `${data}`.replace(/[^\d\,]/g, '').replace(',', '.');
};

export const stringToDecimal = (data) => {
  if (!data) {
    return;
  }

  const numberString = onlyNumbers(data.replace('.', ''));

  return parseFloat(numberString || '0');
};

interface DecimalToStringOpt {
  precision?: number;
  prefix?: string;
  suffix?: string;
  thousandsSeparator?: string;
  decimalSeparator?: string;
}

export const decimalToString = (data, opts?: DecimalToStringOpt) => {
  if (!data && data !== 0) {
    return null;
  }

  const precision = opts?.precision === undefined ? 2 : opts?.precision;
  const prefix = opts?.prefix || '';
  const suffix = opts?.suffix || '';
  const decimalSeparator = opts?.decimalSeparator || ',';

  const formated = data.toFixed(precision).toString().replace('.', decimalSeparator);

  return `${prefix}${formated}${suffix}`;
};

export const decimalToCurrency = (data: number) => {
  return decimalToString(data, { prefix: 'R$ ' });
};
