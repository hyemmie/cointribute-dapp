import { ethers } from "ethers";

function getProviderOrSigner(
  library: ethers.providers.Web3Provider,
  account?: string
): ethers.providers.Web3Provider | ethers.providers.JsonRpcSigner {
  return account ? library.getSigner(account).connectUnchecked() : library;
}

export default getProviderOrSigner;
