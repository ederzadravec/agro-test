import React from "react";
import { useTheme } from "styled-components";
import ReactSelect, { components } from "react-select";
import type { IndicatorsContainerProps, Props, MultiValueProps, SingleValueProps, SelectInstance } from "react-select";
import * as R from "ramda";

import BaseInput from "../BaseInput";
import * as S from "./styled";

interface SelectFieldProps extends Omit<Props, "onChange"> {
  label: string;
  value?: any;
  onChange: (value?: MultiValueProps | SingleValueProps) => void;
  isRequired?: boolean;
  error?: string;
  format?: { label?: string; value?: string };
}

const SelectField: React.FC<SelectFieldProps> = ({ label, value, onChange, isRequired, error, options, format, ...props }) => {
  const theme = useTheme();

  const inputRef = React.useRef<SelectInstance<any> | null>(null);

  const handleOnChange = (values) => {
    onChange?.(values);
  };

  const customStyles = {
    container: (prev) => ({
      ...prev,
      width: "100%",
    }),
    control: (prev) => ({
      ...prev,
      height: "48px",
      color: "#666666",
      borderColor: theme!.palette.primary.main,
      boxShadow: "none",
      "&:active": {
        borderColor: theme!.palette.primary.main,
      },
      "&:hover": {
        borderColor: theme!.palette.primary.main,
      },
    }),
    indicatorsContainer: (prev) => ({
      ...prev,
      display: "flex",
      flexDirection: "row",
    }),
    indicatorSeparator: (prev) => ({
      ...prev,
      display: "none",
    }),
    valueContainer: (prev) => ({
      ...prev,
      padding: "10px 15px",
    }),
    input: (prev) => ({
      ...prev,
      fontSize: "14px",
      color: "#666666",
      margin: "0",
    }),
    singleValue: (prev) => ({
      ...prev,
      fontSize: "14px",
      color: "#666666",
      margin: "0",
    }),
    menu: (prev) => ({
      ...prev,
      marginTop: "none",
    }),
  };

  const IndicatorsContainer: React.FC<IndicatorsContainerProps> = ({ children, ...rest }) => {
    return <components.IndicatorsContainer {...rest}>{children}</components.IndicatorsContainer>;
  };

  const formatedOptions = React.useMemo(() => {
    const { value, label } = { value: "value", label: "label", ...format };

    return options?.map((item: any) => ({ ...item, value: item?.[value], label: item?.[label] }));
  }, [format, options]);

  const formatedValue = React.useMemo(() => {
    if (!value || R.type(value) !== "Object") return;

    const newFormat = { value: "value", label: "label", ...format };

    return { ...value, value: value?.[newFormat.value], label: value?.[newFormat.label] };
  }, [format, value]);

  React.useEffect(() => {
    if (!value) {
      inputRef.current?.clearValue();
    }
  }, [value]);

  return (
    <BaseInput error={error}>
      <S.Container>
        <S.Label>
          {label}
          {isRequired ? " *" : ""}
        </S.Label>

        <S.InputContent>
          <ReactSelect
            ref={inputRef}
            styles={customStyles}
            placeholder=""
            noOptionsMessage={() => "Lista vazia"}
            components={{ IndicatorsContainer }}
            isClearable
            onChange={handleOnChange}
            value={formatedValue}
            options={formatedOptions}
            {...props}
          />
        </S.InputContent>
      </S.Container>
    </BaseInput>
  );
};

export default SelectField;
