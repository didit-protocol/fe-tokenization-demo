const truncate = (input: string, length: number, ellipsis: boolean = true) => {
  if (input.length > length) {
    return `${input.substring(0, length)}${ellipsis ? "..." : ""}`;
  }
  return input;
};

export const truncateAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};

export default truncate;
