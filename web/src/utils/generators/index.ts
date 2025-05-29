export const generateColor = (size: number = 1): string[] => {
  const colors: string[] = [];

  for (let i = 0; i < size; i++) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    colors.push(`#${randomColor.padStart(6, "0")}`);
  }

  return colors;
};
