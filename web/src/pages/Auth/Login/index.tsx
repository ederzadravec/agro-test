import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

    if (response?.errors) {
      const errors = getErrors(response, true);
      form.setErrors(errors);
      return;
    }

    if (response?.data?.token) {
      const token = response.data.token;

      setAuth({ isLogged: true, token });

      navigate("/dashboard");
      return;
    }

    toast.error("Alguma coisa deu errado");
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
          "data-testid": "input-login",
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
          "data-testid": "input-password",
        }),
      },
    ],
  ];
  return (
    <>
      <S.Title data-testid="header">Login</S.Title>

      <FormGrid config={formConfig} />

      <Footer>
        <Button onClick={form.trySave(handelOnSubmit)} loading={loginService.loading} data-testid="button-login">
          Entrar
        </Button>
      </Footer>
    </>
  );
};

export default Login;
