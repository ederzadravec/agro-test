import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Title, TableList, Button, TableListButtons, ConfirmDialog } from "#/components";
import type { TableListButtonsProps } from "#/components";
import { formatCNPJ } from "#/utils/formater";
import { useService } from "#/hooks";

const List: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams({ page: "1", limit: "10" });

  const listService = useService("GET", "/productor", query, true, [query]);
  const removeService = useService("DELETE", (id) => `/productor/${id}`, {}, false);

  const handleOnRemove = async (data: { id: string }) => {
    await removeService.fetch({}, data.id);
    toast.success("Removido com sucesso");

    listService.fetch();
  };

  const onChangePage = (page: number) => {
    query.set("page", page.toString());
    setQuery(query);
  };

  const listButtons: TableListButtonsProps["config"] = [
    {
      icon: () => MdEdit,
      label: "Editar",
      onClick: (data) => {
        navigate(`/productor/${data.id}`);
      },
    },
    {
      icon: () => MdDelete,
      label: "Excluir",
      onClick: (data) => {
        ConfirmDialog.open({
          type: "error",
          message: `Deseja apagar ${data.name}?`,
          actions: [
            {
              label: "Confirmar",
              onClick: () => handleOnRemove(data),
            },
          ],
        });
      },
    },
  ];

  const listConfig = [
    {
      size: { md: 5 },
      path: "name",
      title: "Nome",
    },
    {
      size: { md: 5 },
      path: (row) => formatCNPJ(row.cnpj),
      title: "CNPJ",
    },
    {
      size: { md: 2 },
      path: (data) => <TableListButtons data={data} config={listButtons} />,
      title: "",
    },
  ];

  return (
    <>
      <Title title="Produtores">
        <Button to="/productor/new">Novo</Button>
      </Title>

      <TableList
        config={listConfig}
        data={listService?.data}
        dataPath="data"
        paginate
        paginatePath="meta"
        onChangePage={onChangePage}
        loading={listService.loading || removeService.loading}
      />
    </>
  );
};

export default List;
