import { toast } from "react-toastify";

export const getErrors = (data: { errors: { message: string }[] }, show?: boolean): { [field: string]: string } => {
  const errors = data.errors.reduce((acc, item) => {
    const match = item.message.match(/the ([a-z]*) \w/i) || [];

    if (!match[1]) return acc;

    const field = match[1];

    return { ...acc, [field]: "Algo de errado com estes dados" };
  }, {});

  if (show) {
    data.errors.forEach((item) => toast.error(item.message));
  }

  return errors;
};
