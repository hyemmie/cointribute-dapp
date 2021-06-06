import { AddressZero } from "@ethersproject/constants";
import isAddress from "./isAddress";
import getProviderOrSigner from "./getProviderOrSigner";
import { ethers } from "ethers";

// account is optional
function getContract(
  address: string,
  ABI: any,
  library: ethers.providers.Web3Provider,
  account?: string
): ethers.Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new ethers.Contract(
    address,
    ABI,
    getProviderOrSigner(library, account)
  );
}

export default getContract;
