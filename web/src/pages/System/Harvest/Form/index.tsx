import React from "react";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Title, Button, FormGrid, TextField, Footer } from "#/components";
import type { FormConfig } from "#/components";
import { useForm } from "#/hooks";
import validate from "#/utils/validate";

const validations = {
  name: [validate.isEmpty()],
};

const Form: React.FC = () => {
  const navigate = useNavigate();
  const [form, onChange] = useForm({ validations });

  const handleOnSave = () => {
    navigate("/harvest");
  };

  const formConfig: FormConfig = [
    [
      {
        schema: "name",
        size: { md: 12 },
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
      <Title title="Nova Safra">
        <Button variant="outlined" icon={MdChevronLeft} to="/harvest">
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
