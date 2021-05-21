import { Contract } from "@ethersproject/contracts";
import { AddressZero } from "@ethersproject/constants";
import isAddress from "./isAddress";
import getProviderOrSigner from "./getProviderOrSigner";

// account is optional
function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export default getContract;
