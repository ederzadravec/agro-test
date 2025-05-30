import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Title, TableList, Button, TableListButtons, ConfirmDialog } from "#/components";
import type { TableListButtonsProps } from "#/components";
import { useService } from "#/hooks";

const List: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams({ page: "1", limit: "10" });

  const listService = useService("GET", "/farm", query, true, [query]);
  const removeService = useService("DELETE", (id) => `/farm/${id}`, {}, false);

  const handleOnRemove = async (data: { id: string }) => {
    const response = await removeService.fetch({}, data.id);

    if (response?.status === "OK") {
      toast.success("Removido com sucesso");
      listService.fetch();
      return;
    }
    toast.error("Erro ao remover");
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
        navigate(`/farm/${data.id}`);
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
      path: "productor.name",
      title: "Produtor",
    },
    {
      size: { md: 4 },
      path: "name",
      title: "Nome",
    },
    {
      size: { md: 1 },
      path: "state.uf",
      title: "Estado",
    },
    {
      size: { md: 2 },
      path: (data) => <TableListButtons data={data} config={listButtons} />,
      title: "",
    },
  ];

  return (
    <>
      <Title title="Fazendas">
        <Button to="/farm/new">Nova</Button>
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
