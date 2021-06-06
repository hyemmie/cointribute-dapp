import { useMemo } from "react";
import getContract from "./getContract";
import { useWeb3React } from "@web3-react/core";
import ERC20_ABI from "../abis/erc20-ctb.json";
import { ethers } from "ethers";

// returns null on errors
function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): ethers.Contract | null {
  const { library, account } = useWeb3React<ethers.providers.Web3Provider>();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}

export function useCTBToken() {
  return useContract(
    "0xb60C4f4Ce173b6d34E937E1B944821558DA332F1",
    ERC20_ABI,
    true
  );
}

export default useContract;
