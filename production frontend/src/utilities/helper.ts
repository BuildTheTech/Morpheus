import { isAddress } from "viem";

export const shortenAddress = (address: string, chars = 5) => {
  if (!isAddress(address)) return "";

  const prefix = address.slice(0, chars);
  const suffix = address.slice(-chars);
  return `${prefix}...${suffix}`;
};

export const shortenDecimal = (val: number, decimal = 2) => {
  const str = val.toString();
  if (str.indexOf(".") < 0) {
    return str;
  }

  const [int, dec] = str.split(".");
  return `${int}.${dec.slice(0, decimal)}`;
};

export const formatNumber = (value: number | bigint): string => {
  if (typeof value === "bigint") {
    value = Number(value);
  }

  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(3)}M`;
  }

  return value.toLocaleString();
};

export const rankStrFromNumber = (value: number) => {
  if (value % 10 == 1) return `${value}st`;
  if (value % 10 == 2) return `${value}nd`;
  if (value % 10 == 3) return `${value}rd`;

  return `${value}th`;
};

export const formatTimeDiff = (difference: number): string => {
  if (difference > 0) {
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${hours}h:${minutes}m:${seconds}s`;
  } else {
    return "00h:00m:0s";
  }
};
