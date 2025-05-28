import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import type { To } from "react-router-dom";
import type { IconType } from "react-icons";

import type * as Types from "./types";
import * as S from "./styled";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: any;
  color?: Types.Color;
  variant?: Types.Variant;
  disabled?: boolean;
  loading?: boolean;
  width?: number | string;
  to?: To;
  icon?: IconType;
  progress?: number;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  color = "primary",
  variant = "default",
  disabled = false,
  loading = false,
  width = "unset",
  icon,
  children,
  to,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return null;

    if (to) return;

    e.preventDefault();
    e.stopPropagation();

    onClick?.();
  };

  const linkProps: { as: React.Component; to: To } | {} = to ? { as: Link, to } : {};

  return (
    <S.Container {...linkProps} width={width}>
      <S.Content onClick={handleOnClick} color={color} variant={variant} disabled={isDisabled} type="button" {...props}>
        {!loading ? (
          <>
            {!icon ? null : <S.Icon as={icon} color={color} variant={variant} />}
            {children}
          </>
        ) : (
          <S.Loader colorProp={color} variant={variant} as={PulseLoader} size={12} speedMultiplier={0.75} />
        )}
      </S.Content>
    </S.Container>
  );
};

export default Button;
