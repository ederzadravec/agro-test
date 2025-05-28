import React from 'react';
import * as R from 'ramda';

import useState from '../state';

type TFieldValue = any;

export type TFormFields = { [field: string]: TFieldValue };

export type Validation = [(field: TFieldValue, form: TFormFields) => boolean, string];

export type ValidationsArray = Array<Validation>;

export type ValidationsFunction = (form: TFormFields) => ValidationsArray;

export type Validations = {
  [field: string]: ValidationsFunction | ValidationsArray;
};

interface IFormProps {
  initialValues?: {
    [field: string]: TFieldValue;
  };
  validations?: Validations;
}

export interface IForm {
  values: {
    [field: string]: TFieldValue;
  };
  errors: {
    [field: string]: string;
  };
  touched: string[];
  hasErrors: boolean;

  getValue: (field: string) => TFieldValue;
  getError: (field: string) => string | undefined;

  setValues: (fields: TFormFields, remove?: string[]) => void;
  setErrors: (fields: { [field: string]: string }) => void;

  setValidations: (setValidations: Validations) => void;

  trySave: (callback: () => void) => () => boolean;
  clear: (initialValues: TFormFields) => void;
}

export type IFormChange = (field: string, remove?: string[]) => (value: TFieldValue) => void;

export default ({ initialValues = {}, validations = {} }: IFormProps): [IForm, IFormChange] => {
  const [{ values, errors, touched, triedSave, newValidations }, setState] = useState<{
    values: IForm['values'];
    errors: IForm['errors'];
    touched: string[];
    triedSave: boolean;
    newValidations?: Validations;
  }>({
    values: {},
    errors: {},
    touched: [],
    triedSave: false,
    newValidations: {},
  });

  React.useEffect(() => {
    const data = initialValues || {};

    const newErrors = validateData(data);
    setState({ values: data, errors: newErrors });
  }, []);

  const getValue = (name: string, data: TFormFields = values): TFieldValue => {
    return data[name] === undefined ? null : data[name];
  };

  const validateData = (data = {}, customValidations = newValidations) => {
    const combinedValidations = { ...validations, ...customValidations };

    return Object.keys(combinedValidations).reduce((acc, key) => {
      const validationList =
        typeof combinedValidations[key] === 'function'
          ? (combinedValidations[key] as ValidationsFunction)(data)
          : (combinedValidations[key] as ValidationsArray);

      const error = R.reduceWhile<Validation, string | null>(
        (acc) => !acc,
        (acc, validation) => (validation[0](getValue(key, data), data) ? validation[1] : acc),
        null,
        validationList
      );

      return { ...acc, ...(error ? { [key]: error } : {}) };
    }, []);
  };

  const onChange = React.useCallback(
    (name: string, remove: string[] = []) =>
      (value: TFieldValue) => {
        const data = { [name]: value };

        setValues(data, remove);
      },
    [values, newValidations]
  );

  const setValues = (data: { [field: string]: TFieldValue }, remove: string[] = []) => {
    setState((prev) => {
      const newValues = { ...R.omit(remove, prev!.values), ...data };
      const newErrors = { ...validateData(newValues) };
      const newTouched = [...touched, ...Object.keys(data)];

      return { ...prev, values: newValues, errors: newErrors, touched: [...newTouched] };
    });
  };

  const setErrors = (errors: { [field: string]: string }) => {
    const newTouched = [...touched, ...Object.keys(errors || {})];
    setState({
      errors,
      touched: [...newTouched],
    });
  };

  const getError = (name: string) => {
    return errors[name] && (touched.indexOf(name) !== -1 || triedSave) ? errors[name] : undefined;
  };

  const setValidations = (customValidations: Validations) => {
    const errors = { ...validateData(values, customValidations) };
    setState({ newValidations: customValidations, errors });
  };

  const trySave =
    (callback = () => {}) =>
    () => {
      if (!R.isEmpty(errors) && !R.isNil(errors)) {
        setState({ triedSave: true });
        return false;
      }

      callback();
      return true;
    };

  const clear = (data = {}) => {
    setState(() => ({
      values: data,
      errors: validateData(data),
      touched: [],
      triedSave: false,
    }));
  };

  const form = {
    hasErrors: !R.isEmpty(errors) && !R.isNil(errors),
    getValue,
    getError,
    setErrors,
    setValues,
    setValidations,
    errors,
    values,
    touched,
    trySave,
    clear,
  };

  return [form, onChange];
};
