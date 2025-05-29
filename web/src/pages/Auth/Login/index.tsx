import React from "react";
import { useNavigate } from "react-router-dom";

import { FormGrid, TextField, Button, Footer } from "#/components";
import type { FormConfig } from "#/components";
import { useForm, useService } from "#/hooks";
import { AuthContext } from "#/contexts";
import { getErrors } from "#/utils/api";

import * as S from "./styled";
import validate from "#/utils/validate";

const validations = {
  login: [validate.isEmpty()],
  password: [validate.isEmpty()],
};

const Login: React.FC = () => {
  const { state, setAuth } = AuthContext.useAuth();
  const navigate = useNavigate();
  const [form, onChange] = useForm({ validations });

  const loginService = useService("post", "/session", null, false);

  const handelOnSubmit = async () => {
    const data = {
      login: form.getValue("login"),
      password: form.getValue("password"),
    };

    const response = await loginService.fetch(data);

    if (response.errors) {
      const errors = getErrors(response, true);
      form.setErrors(errors);
      return;
    }

    const token = response.token;

    setAuth({ isLogged: true, token });

    navigate("/dashboard");
  };

  React.useEffect(() => {
    if (state.isLogged && state.token) {
      navigate("/dashboard");
    }
  }, [state]);

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
        <Button onClick={form.trySave(handelOnSubmit)} loading={loginService.loading}>
          Entrar
        </Button>
      </Footer>
    </>
  );
};

export default Login;
