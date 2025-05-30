import { render, screen } from "#/@tests/@setup";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MdCheck } from "react-icons/md";

import Button from "#/components/Button";

test("show children label and click", async () => {
  const handler = jest.fn();

  render(<Button onClick={handler}>Continuar</Button>);

  await userEvent.click(screen.getByRole("button"));
  expect(handler).toHaveBeenCalledTimes(1);

  expect(screen.getByRole("button")).toHaveTextContent("Continuar");
});

test("disabled button", async () => {
  const handler = jest.fn();

  render(
    <Button disabled onClick={handler}>
      Continuar
    </Button>
  );

  await userEvent.click(screen.getByRole("button"));

  expect(handler).toHaveBeenCalledTimes(0);
});

test("icon button", async () => {
  const { container } = render(<Button icon={MdCheck}>Continuar</Button>);

  const icon = container.querySelector("svg");

  expect(screen.getByRole("button")).toHaveTextContent("Continuar");
  expect(screen.getByRole("button")).toContainElement(icon);
});
