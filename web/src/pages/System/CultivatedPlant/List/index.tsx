import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

import { Title, TableList, Button, TableListButtons } from "#/components";
import type { TableListButtonsProps } from "#/components";
import { formatCNPJ } from "#/utils/formater";

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
      size: { md: 3 },
      path: "productor",
      title: "Produtor",
    },
    {
      size: { md: 3 },
      path: "farm",
      title: "Fazenda",
    },
    {
      size: { md: 1 },
      path: "harvest",
      title: "Safra",
    },
    {
      size: { md: 2 },
      path: "name",
      title: "Cultura Plantada",
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
      harvest: "2023",
      name: "Arroz",
    },
    {
      productor: "João da Silva",
      farm: "Fazenda Boa Vista",
      harvest: "2023",
      name: "Milho",
    },
    {
      productor: "João da Silva",
      farm: "Fazenda Boa Vista",
      harvest: "2023",
      name: "Soja",
    },
  ];

  return (
    <>
      <Title title="Culturas Plantadas">
        <Button to="/cultivated-plant/new">Novo</Button>
      </Title>

      <TableList config={listConfig} data={data} />
    </>
  );
};

export default List;
