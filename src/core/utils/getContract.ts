import { Contract } from "@ethersproject/contracts";
import { AddressZero } from "@ethersproject/constants";
import { Web3Provider } from "@ethersproject/providers";
import isAddress from "./isAddress";
import getProviderOrSigner from "./getProviderOrSigner";

// account is optional
function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export default getContract;
