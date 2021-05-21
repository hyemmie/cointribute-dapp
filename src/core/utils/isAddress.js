import { getAddress } from "@ethersproject/address";

export default function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}
