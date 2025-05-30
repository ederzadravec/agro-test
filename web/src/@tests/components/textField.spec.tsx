import { render, screen } from "#/@tests/@setup";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import TextField from "#/components/TextField";

test("show label", async () => {
  const handler = jest.fn();

  render(<TextField label="Nome" onChange={handler} />);

  expect(screen.getByTestId("label")).toHaveTextContent("Nome");
});

test("show error", async () => {
  const handler = jest.fn();

  render(<TextField label="Nome" error="Erro" onChange={handler} />);

  expect(screen.getByTestId("error")).toHaveTextContent("Erro");
});

test("event onChange", async () => {
  const handler = jest.fn();

  render(<TextField label="Nome" onChange={handler} />);

  await userEvent.type(screen.getByTestId("input"), "Valor");

  expect(handler).toHaveBeenCalledTimes(5);
  expect(handler).toHaveBeenLastCalledWith("r");
});

test("event onChange with previous value", async () => {
  const handler = jest.fn();

  render(<TextField label="Nome" value="Valo" onChange={handler} />);

  await userEvent.type(screen.getByTestId("input"), "r");

  expect(handler).toHaveBeenCalledTimes(1);
  expect(handler).toHaveBeenLastCalledWith("Valor");
});

test("event onChange disabled", async () => {
  const handler = jest.fn();

  render(<TextField label="Nome" disabled value="" onChange={handler} />);

  await userEvent.type(screen.getByTestId("input"), "Valor");

  expect(handler).toHaveBeenCalledTimes(0);
  expect(screen.getByTestId("input")).toHaveValue("");
});

test("event onChange disabled with previous value", async () => {
  const handler = jest.fn();

  render(<TextField label="Nome" disabled value="Teste" onChange={handler} />);

  await userEvent.type(screen.getByTestId("input"), "Valor");

  expect(handler).toHaveBeenCalledTimes(0);
  expect(screen.getByTestId("input")).toHaveValue("Teste");
});
