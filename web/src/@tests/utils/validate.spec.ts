import "@testing-library/jest-dom";

import { isEmpty, isCNPJ, isLessThan, isEqual, isEmail, isDate } from "#/utils/validate";

// As funções de validação returna
// true: caso tenha erro
// false: caso esteja correto

test("Utils:validate - isCNPJ", async () => {
  expect(isCNPJ()[0]("12345678909")).toBe(true);
  expect(isCNPJ()[0]("34324234232")).toBe(true);

  expect(isCNPJ()[0]("")).toBe(false);
  expect(isCNPJ()[0]("00000000000191")).toBe(false);
});

test("Utils:validate - isEmpty", async () => {
  expect(isEmpty()[0](undefined)).toBe(true);
  expect(isEmpty()[0](null)).toBe(true);
  expect(isEmpty()[0]("")).toBe(true);

  expect(isEmpty()[0]("123")).toBe(false);
});

test("Utils:validate - isLessThan", async () => {
  expect(isLessThan(5)[0](6)).toBe(true);
  expect(isLessThan(1)[0](2)).toBe(true);

  expect(isLessThan(5)[0](4)).toBe(false);
});

test("Utils:validate - isEqual", async () => {
  expect(isEqual("password", "msg de erro")[0]("123", { password: "" })).toBe(true);
  expect(isEqual("password", "msg de erro")[0]("123", { password: "12" })).toBe(true);

  expect(isEqual("password", "msg de erro")[0]("123", { password: "123" })).toBe(false);
});

test("Utils:validate - isEmail", async () => {
  expect(isEmail()[0]("fulano")).toBe(true);
  expect(isEmail()[0]("fulano@de")).toBe(true);

  expect(isEmail()[0]("fulano@de.tal")).toBe(false);
  expect(isEmail()[0]("fulano@de.tal.br")).toBe(false);
});

test("Utils:validate - isDate", async () => {
  expect(isDate()[0]("01")).toBe(true);
  expect(isDate()[0]("01/01")).toBe(true);
  expect(isDate()[0]("01/13/2025")).toBe(true);
  expect(isDate('HH:mm:ss')[0]("23")).toBe(true);
  expect(isDate('HH:mm:ss')[0]("23:50")).toBe(true);
  expect(isDate('HH:mm:ss')[0]("23:50:61")).toBe(true);
  
  expect(isDate()[0]("01/01/2025")).toBe(false);
  expect(isDate('HH:mm:ss')[0]("23:50:51")).toBe(false);
});
