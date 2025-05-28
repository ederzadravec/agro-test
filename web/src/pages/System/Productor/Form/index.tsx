import React from "react";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Title, Button, FormGrid, TextField, Footer } from "#/components";
import type { FormConfig } from "#/components";
import { useForm } from "#/hooks";
import validate from "#/utils/validate";

const validations = {
  cnpj: [validate.isEmpty(), validate.isCNPJ()],
  name: [validate.isEmpty()],
};

const Form: React.FC = () => {
  const navigate = useNavigate();
  const [form, onChange] = useForm({ validations });

  const handleOnSave = () => {
    navigate("/productor");
  };

  const formConfig: FormConfig = [
    [
      {
        schema: "cnpj",
        size: { md: 4 },
        type: TextField,
        props: (schema): React.ComponentProps<typeof TextField> => ({
          label: "CNPJ",
          value: form.getValue(schema),
          error: form.getError(schema),
          onChange: onChange(schema),
          mask: "cnpj",
        }),
      },
      {
        schema: "name",
        size: { md: 8 },
        type: TextField,
        props: (schema): React.ComponentProps<typeof TextField> => ({
          label: "Nome",
          value: form.getValue(schema),
          error: form.getError(schema),
          onChange: onChange(schema),
        }),
      },
    ],
  ];

  return (
    <>
      <Title title="Novo Produtor">
        <Button variant="outlined" icon={MdChevronLeft} to="/productor">
          Voltar
        </Button>
      </Title>

      <FormGrid config={formConfig}>
        <Footer>
          <Button onClick={form.trySave(handleOnSave)}>Salvar</Button>
        </Footer>
      </FormGrid>
    </>
  );
};

export default Form;
