export const truncate = (
  input: string,
  length: number,
  ellipsis: boolean = true
) => {
  if (input.length > length) {
    return `${input.substring(0, length)}${ellipsis ? "..." : ""}`;
  }
  return input;
};
