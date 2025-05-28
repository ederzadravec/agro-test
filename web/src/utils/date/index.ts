import { parse, isValid } from 'date-fns';

export const DEFAULT_DATE_FORMAT = 'dd/MM/yyyy';
export const DEFAULT_TIME_FORMAT = 'HH:mm';

export const isValidDate = (date: Date | string, FORMAT = DEFAULT_DATE_FORMAT as string): boolean => {
  if (!date) return false;

  const newDate = date instanceof Date ? date : parse(date, FORMAT, new Date());

  return isValid(newDate);
};
