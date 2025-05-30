import "@testing-library/jest-dom";

import { formatNumber, formatCNPJ } from "#/utils/formater";

test("Utils:formater - formatCNPJ", async () => {
  expect(formatCNPJ("00000000000191")).toBe("00.000.000/0001-91");
});

test("Utils:formater - formatNumber", async () => {
  expect(formatNumber("abc123")).toBe(123);
});
