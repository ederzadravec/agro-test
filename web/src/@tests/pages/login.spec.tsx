import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { render, screen } from "#/@tests/@setup";

import Login from "#/pages/Auth/Login";

test("render page", async () => {
  const { container } = render(<Login />);

  expect(screen.getByTestId("header")).toHaveTextContent("Login");
  expect(screen.getByTestId("input-login")).toBeInTheDocument();
  expect(screen.getByTestId("input-password")).toBeInTheDocument();
  expect(screen.getByTestId("button-login")).toBeInTheDocument();

  const errors = container.querySelectorAll("[data-testid=error]");
  expect(errors).toHaveLength(2);

  expect(errors[0]).toBeEmptyDOMElement();
  expect(errors[1]).toBeEmptyDOMElement();
});

test("submit", async () => {
  const { container } = render(<Login />);

  await userEvent.click(screen.getByTestId("button-login"));
  await userEvent.type(screen.getByTestId("input-login"), "a");
  await userEvent.type(screen.getByTestId("input-password"), "a");

  const errors = container.querySelectorAll("[data-testid=error]");
  expect(errors).toHaveLength(2);

  expect(errors[0]).toBeEmptyDOMElement();
  expect(errors[1]).toBeEmptyDOMElement();
});

test("submit error", async () => {
  const { container } = render(<Login />);

  await userEvent.click(screen.getByTestId("button-login"));

  const errors = container.querySelectorAll("[data-testid=error]");
  expect(errors).toHaveLength(2);

  expect(errors[0]).toHaveTextContent("Campo deve ser preenchido.");
  expect(errors[1]).toHaveTextContent("Campo deve ser preenchido.");
});
