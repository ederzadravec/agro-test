import React from "react";

import type { PaletteColorsEnum } from "types/styled-components/enuns";
import { useState } from "#/hooks";

import Button from "../Button";
import * as S from "./styled";

interface ConfirmDialogAction {
  label: string;
  color?: PaletteColorsEnum;
  onClick: () => void;
}

interface ConfirmDialog {
  type: PaletteColorsEnum;
  title?: string;
  message: string;
  actions: ConfirmDialogAction[];
}

let open = (_: ConfirmDialog) => {};

const ConfirmDialog: React.FC = () => {
  const [message, setMessage] = useState<ConfirmDialog>();
  const [loading, setLoading] = useState<boolean>(false);

  open = (data: ConfirmDialog) => {
    setMessage(data);
    setLoading(false);
  };

  const handleOnAction = (action: () => void) => async () => {
    setLoading(true);

    await action();

    setLoading(false);
    setMessage(undefined);
  };

  if (!message) return null;

  return (
    <S.Overlay>
      <S.Container type={message.type || "success"}>
        <S.Content>
          <S.Title>{message.title || "Confirmar ação"}</S.Title>

          <S.Message>{message.message}</S.Message>
          <S.Footer>
            <Button color="white" variant="outlined" onClick={() => setMessage(undefined)}>
              Voltar
            </Button>

            {message.actions.map((action) => (
              <Button color={action.color || "white"} onClick={handleOnAction(action.onClick)} loading={loading}>
                {action.label}
              </Button>
            ))}
          </S.Footer>
        </S.Content>
      </S.Container>
    </S.Overlay>
  );
};

export default { Provider: ConfirmDialog, open: (data: ConfirmDialog) => open(data) };
