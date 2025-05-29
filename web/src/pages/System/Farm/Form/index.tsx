import React from "react";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Title, Button, FormGrid, TextField, Footer, SelectField } from "#/components";
import type { FormConfig } from "#/components";
import { useForm, useService } from "#/hooks";
import type { Validation } from "#/hooks/form";
import validate from "#/utils/validate";
import { formatNumber } from "#/utils/formater";
import { getErrors } from "#/utils/api";

const validations = {
  productor: [validate.isEmptySelect()],
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
  const params = useParams() as { id: string };
  const [form, onChange] = useForm({ validations });

  const isEditing = !!params.id;

  const createService = useService("post", "/farm", null, false);
  const updateService = useService("put", `/farm/${params.id}`, null, false);
  const loadService = useService("get", `/farm/${params.id}`, null, isEditing);
  const loadProductorService = useService("get", `/productor`, { limit: 100 }, true);
  const loadStateService = useService("get", `/info-state`, { limit: 100 }, true);

  const handleOnSave = async () => {
    const data = {
      productor: form.getValue("productor").id,
      name: form.getValue("name"),
      state: form.getValue("state").id,
      city: form.getValue("city"),
      totalArea: parseInt(form.getValue("totalArea")),
      areableArea: parseInt(form.getValue("areableArea")),
      vegetationArea: parseInt(form.getValue("vegetationArea")),
    };

    const response = isEditing ? await updateService.fetch(data) : await createService.fetch(data);

    if (response.errors) {
      const errors = getErrors(response, true);
      form.setErrors(errors);
      return;
    }

    toast.success("Salvo com sucesso");
    navigate("/farm");
  };

  React.useEffect(() => {
    if (loadService.data) {
      form.setValues({
        productor: loadService.data.productor,
        name: loadService.data.name,
        state: loadService.data.state,
        city: loadService.data.city,
        totalArea: loadService.data.totalArea,
        areableArea: loadService.data.areableArea,
        vegetationArea: loadService.data.vegetationArea,
      });
    }
  }, [loadService.data]);

  const formConfig: FormConfig = [
    [
      {
        schema: "productor",
        size: { md: 6 },
        type: SelectField,
        props: (schema): React.ComponentProps<typeof SelectField> => ({
          label: "Produtor",
          value: form.getValue(schema),
          error: form.getError(schema),
          onChange: onChange(schema),
          options: loadProductorService.data?.data || [],
          format: { value: "id", label: "name" },
        }),
      },
    ],
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
          options: loadStateService.data?.data || [],
          format: { value: "id", label: "name" },
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
          maskConfig: {
            integerLimit: 4,
          },
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
          maskConfig: {
            integerLimit: 4,
          },
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
          maskConfig: {
            integerLimit: 4,
          },
        }),
      },
    ],
  ];

  return (
    <>
      <Title title={isEditing ? "Alterar Fazenda" : "Nova Fazenda"}>
        <Button variant="outlined" icon={MdChevronLeft} to="/farm">
          Voltar
        </Button>
      </Title>

      <FormGrid config={formConfig} loading={loadService.loading}>
        <Footer>
          <Button onClick={form.trySave(handleOnSave)} loading={createService.loading}>
            Salvar
          </Button>
        </Footer>
      </FormGrid>
    </>
  );
};

export default Form;
