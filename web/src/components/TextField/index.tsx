import React from "react";
import MaskedInput from "react-text-mask";

import BaseInput from "../BaseInput";
import * as S from "./styled";
import type * as Types from "./types";
import { getMask } from "./config";

interface TextFieldProps extends Omit<React.HTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  value?: string | number;
  onChange: (value?: string) => void;
  isRequired?: boolean;
  error?: string;
  mask?: Types.MaskEnum;
  maskConfig?: Types.MaskConfig;
  disabled?: boolean;
  type?: string;
  "data-testid"?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  isRequired,
  error,
  mask,
  maskConfig,
  disabled = false,
  ...props
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    onChange?.(value);
  };

  const maskProps = mask ? { as: MaskedInput, ...getMask(mask, maskConfig) } : {};

  return (
    <BaseInput error={error}>
      <S.Container>
        <S.Label data-testid="label">
          {label}

          {isRequired ? " *" : ""}
        </S.Label>

        <S.InputContent>
          <S.Input
            data-testid="input"
            {...maskProps}
            disabled={disabled}
            type="text"
            onChange={handleOnChange}
            value={value || ""}
            {...props}
          />
        </S.InputContent>
      </S.Container>
    </BaseInput>
  );
};

export default TextField;
