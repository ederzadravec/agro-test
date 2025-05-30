import React from "react";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Title, Button, FormGrid, TextField, Footer, SelectField } from "#/components";
import type { FormConfig } from "#/components";
import { useForm, useService } from "#/hooks";
import validate from "#/utils/validate";
import { getErrors } from "#/utils/api";

const validations = {
  productor: [validate.isEmptySelect()],
  farm: [validate.isEmptySelect()],
  name: [validate.isEmpty()],
};

const Form: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams() as { id: string };
  const [form, onChange] = useForm({ validations });

  const isEditing = !!params.id;

  const createService = useService("post", "/harvest", null, false);
  const updateService = useService("put", `/harvest/${params.id}`, null, false);
  const loadService = useService("get", `/harvest/${params.id}`, null, isEditing);
  const loadProductorService = useService("get", `/productor`, { limit: 100 }, true);
  const loadFarmService = useService("get", `/farm`, { limit: 100, productor: form.values.productor?.id }, !!form.values.productor?.id, [
    form.values.productor,
  ]);

  const handleOnSave = async () => {
    const data = {
      productor: form.getValue("productor").id,
      farm: form.getValue("farm").id,
      name: form.getValue("name"),
    };

    const response = isEditing ? await updateService.fetch(data) : await createService.fetch(data);

    if (response.errors) {
      const errors = getErrors(response, true);
      form.setErrors(errors);
      return;
    }

    if (response?.status === "OK") {
      toast.success("Salvo com sucesso");
      return navigate("/harvest");
    }
    toast.error("Erro inexperado ao salvar");
  };

  React.useEffect(() => {
    if (loadService.data) {
      form.setValues({
        productor: loadService.data.productor,
        farm: loadService.data.farm,
        name: loadService.data.name,
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
          onChange: onChange(schema, ["farm"]),
          options: loadProductorService.data?.data || [],
          format: { value: "id", label: "name" },
          isLoading: loadProductorService.loading,
        }),
      },
      {
        schema: "farm",
        size: { md: 6 },
        type: SelectField,
        props: (schema): React.ComponentProps<typeof SelectField> => ({
          label: "Fazenda",
          value: form.getValue(schema),
          error: form.getError(schema),
          onChange: onChange(schema),
          options: loadFarmService.data?.data || [],
          format: { value: "id", label: "name" },
          isDisabled: !form.getValue("productor")?.id,
          isLoading: loadFarmService.loading,
        }),
      },
    ],
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
      <Title title={isEditing ? "Alterar Safra" : "Nova Safra"}>
        <Button variant="outlined" icon={MdChevronLeft} to="/harvest">
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
