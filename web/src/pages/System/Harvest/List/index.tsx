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
      size: { md: 4 },
      path: "productor",
      title: "Produtor",
    },
    {
      size: { md: 4 },
      path: "farm",
      title: "Fazenda",
    },
    {
      size: { md: 2 },
      path: "name",
      title: "Safra",
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
      farm: "Fazenda Boa Vista",
      name: 2023,
    },
    {
      productor: "Maria Oliveira",
      farm: "Fazenda Esperança",
      name: 2023,
    },
    {
      productor: "Carlos Souza",
      farm: "Fazenda Santa Clara",
      name: 2023,
    },
  ];

  return (
    <>
      <Title title="Safras">
        <Button to="/harvest/new">Novo</Button>
      </Title>

      <TableList config={listConfig} data={data} />
    </>
  );
};

export default List;
