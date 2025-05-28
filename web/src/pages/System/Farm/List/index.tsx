import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

import { Title, TableList, Button, TableListButtons } from "#/components";
import type { TableListButtonsProps } from "#/components";

const List: React.FC = () => {
  const listButtons: TableListButtonsProps["config"] = [
    {
      icon: () => MdEdit,
      label: "Editar",
      onClick: (data) => {
        console.log("Edit action clicked for:", data);
        // Navigate to edit page or perform edit action
      },
    },
    {
      icon: () => MdDelete,
      label: "Excluir",
      onClick: (data) => {
        console.log("Delete action clicked for:", data);
        // Perform delete action
      },
    },
  ];

  const listConfig = [
    {
      size: { md: 5 },
      path: "productor",
      title: "Produtor",
    },
    {
      size: { md: 5 },
      path: "name",
      title: "Nome",
    },

    {
      size: { md: 2 },
      path: (data) => <TableListButtons data={data} config={listButtons} />,
      title: "",
    },
  ];

  const data = [
    {
      productor: "João da Silva",
      name: "Fazenda Boa Vista",
    },
    {
      productor: "Maria Oliveira",
      name: "Fazenda Esperança",
    },
    {
      productor: "Carlos Souza",
      name: "Fazenda Santa Clara",
    },
  ];

  return (
    <>
      <Title title="Fazendas">
        <Button to="/farm/new">Novo</Button>
      </Title>

      <TableList config={listConfig} data={data} />
    </>
  );
};

export default List;
