import React from "react";
import { useNavigate } from "react-router-dom";

import { FormGrid, TextField, Button, Footer } from "#/components";
import type { FormConfig } from "#/components";
import { useForm } from "#/hooks";

import * as S from "./styled";
import validate from "#/utils/validate";

const validations = {
  login: [validate.isEmpty()],
  password: [validate.isEmpty()],
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, onChange] = useForm({ validations });

  const handelOnSubmit = (data: Record<string, any>) => {
    navigate("/dashboard");
  };

  const formConfig: FormConfig = [
    [
      {
        schema: "login",
        size: { md: 12 },
        type: TextField,
        props: (schema): React.ComponentProps<typeof TextField> => ({
          label: "Login",
          value: form.getValue(schema),
          error: form.getError(schema),
          onChange: onChange(schema),
        }),
      },
      {
        schema: "password",
        size: { md: 12 },
        type: TextField,
        props: (schema): React.ComponentProps<typeof TextField> => ({
          label: "Senha",
          value: form.getValue(schema),
          error: form.getError(schema),
          onChange: onChange(schema),
          type: "password",
        }),
      },
    ],
  ];
  return (
    <>
      <S.Title>Login</S.Title>

      <FormGrid config={formConfig} />

      <Footer>
        <Button onClick={form.trySave(handelOnSubmit)}>Entrar</Button>
      </Footer>
    </>
  );
};

export default Login;
