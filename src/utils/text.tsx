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

export const truncateAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};

export const convertDataFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}-${month}-${day}T${hour}:${minute}`;
};

export const convertStatusToStatusText = (status: string) => {
  switch (status) {
    case "S":
      return "Sale";
    case "T":
      return "Tradeable";
    case "R":
      return "Refund";
    case "P":
      return "Paused";
    default:
      return "Paused";
  }
};

export const convertNumberToMillion = (number: number) => {
  return number / 1000000;
};

export const TokenToUSD = (token: number) => {
  return token * 0.04916;
};

export const USDToToken = (usd: number) => {
  return usd / 0.04916;
};
