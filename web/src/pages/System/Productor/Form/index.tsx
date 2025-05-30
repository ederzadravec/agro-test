import React from "react";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Title, Button, FormGrid, TextField, Footer } from "#/components";
import type { FormConfig } from "#/components";
import { useForm, useService } from "#/hooks";
import validate from "#/utils/validate";
import { getErrors } from "#/utils/api";

const validations = {
  cnpj: [validate.isEmpty(), validate.isCNPJ()],
  name: [validate.isEmpty()],
};

const Form: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams() as { id: string };
  const [form, onChange] = useForm({ validations });

  const isEditing = !!params.id;

  const createService = useService("post", "/productor", null, false);
  const updateService = useService("put", `/productor/${params.id}`, null, false);
  const loadService = useService("get", `/productor/${params.id}`, null, isEditing);

  const handleOnSave = async () => {
    const data = {
      cnpj: form.getValue("cnpj"),
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
      return navigate("/productor");
    }
    toast.error("Erro inexperado ao salvar");
  };

  React.useEffect(() => {
    if (loadService.data) {
      form.setValues({
        cnpj: loadService.data.cnpj,
        name: loadService.data.name,
      });
    }
  }, [loadService.data]);

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
      <Title title={isEditing ? "Alterar Produtor" : "Novo Produtor"}>
        <Button variant="outlined" icon={MdChevronLeft} to="/productor">
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
