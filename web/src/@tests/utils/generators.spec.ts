import "@testing-library/jest-dom";

import { generateColor } from "#/utils/generators";

test("Utils:generators - generateColor", async () => {
  expect(generateColor(1)).toHaveLength(1);

  expect(generateColor(5)).toHaveLength(5);

  const colors = generateColor(1);
  expect(colors[0]).toMatch(/^#[0-9a-f]{6}$/i);
});
