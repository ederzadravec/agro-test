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

  const data = [
    {
      name: "João da Silva",
      cnpj: "12345678000190",
    },
    {
      name: "Maria Oliveira",
      cnpj: "12345678000190",
    },
    {
      name: "Carlos Souza",
      cnpj: "12345678000190",
    },
  ];

  return (
    <>
      <Title title="Produtores">
        <Button to="/productor/new">Novo</Button>
      </Title>

      <TableList config={listConfig} data={data} />
    </>
  );
};

export default List;
