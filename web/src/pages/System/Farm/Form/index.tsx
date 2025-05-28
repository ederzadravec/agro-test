import React from "react";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Title, Button, FormGrid, TextField, Footer, SelectField } from "#/components";
import type { FormConfig } from "#/components";
import { useForm } from "#/hooks";
import type { Validation } from "#/hooks/form";
import validate from "#/utils/validate";
import { formatNumber } from "#/utils/formater";

const validations = {
  name: [validate.isEmpty()],
  state: [validate.isEmptySelect()],
  city: [validate.isEmpty()],
  totalArea: [
    validate.isEmpty(),
    [
      (data, form) => formatNumber(form.areableArea) + formatNumber(form.vegetationArea) > formatNumber(data),
      "A soma das áreas agricultável e de vegetação não pode ser maior que a área total",
    ] as Validation,
  ],
  areableArea: [validate.isEmpty()],
  vegetationArea: [validate.isEmpty()],
};

const Form: React.FC = () => {
  const navigate = useNavigate();
  const [form, onChange] = useForm({ validations });

  const handleOnSave = () => {
    navigate("/farm");
  };

  const formConfig: FormConfig = [
    [
      {
        schema: "name",
        size: { md: 6 },
        type: TextField,
        props: (schema): React.ComponentProps<typeof TextField> => ({
          label: "Nome",
          value: form.getValue(schema),
          error: form.getError(schema),
          onChange: onChange(schema),
        }),
      },
      {
        schema: "state",
        size: { md: 3 },
        type: SelectField,
        props: (schema): React.ComponentProps<typeof SelectField> => ({
          label: "Estado",
          value: form.getValue(schema),
          error: form.getError(schema),
          onChange: onChange(schema),
          options: [
            { label: "Sao Paulo", value: "SP" },
            { label: "Rio de Janeiro", value: "RJ" },
            { label: "Minas Gerais", value: "MG" },
          ],
        }),
      },
      {
        schema: "city",
        size: { md: 3 },
        type: TextField,
        props: (schema): React.ComponentProps<typeof TextField> => ({
          label: "Cidade",
          value: form.getValue(schema),
          error: form.getError(schema),
          onChange: onChange(schema),
        }),
      },
    ],
    [
      {
        schema: "totalArea",
        size: { md: 3 },
        type: TextField,
        props: (schema): React.ComponentProps<typeof TextField> => ({
          label: "Área Total (hectares)",
          value: form.getValue(schema),
          error: form.getError(schema),
          onChange: onChange(schema),
          mask: "numeric",
        }),
      },
      {
        schema: "areableArea",
        size: { md: 3 },
        type: TextField,
        props: (schema): React.ComponentProps<typeof TextField> => ({
          label: "Área Agricutável (hectares)",
          value: form.getValue(schema),
          error: form.getError(schema),
          onChange: onChange(schema),
          mask: "numeric",
        }),
      },
      {
        schema: "vegetationArea",
        size: { md: 3 },
        type: TextField,
        props: (schema): React.ComponentProps<typeof TextField> => ({
          label: "Área de Vegetação (hectares)",
          value: form.getValue(schema),
          error: form.getError(schema),
          onChange: onChange(schema),
          mask: "numeric",
        }),
      },
    ],
  ];

  return (
    <>
      <Title title="Nova Fazenda">
        <Button variant="outlined" icon={MdChevronLeft} to="/farm">
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
