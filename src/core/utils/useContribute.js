import { useMemo } from "react";
import getContract from "./getContract";
import { useWeb3React } from "@web3-react/core";
import ERC20_ABI from "../abis/erc20-ctb.json";

// returns null on errors
function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useWeb3React();

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
    "0xd5e728655c0eccca37f4c245e6a9f55bd4eae802",
    ERC20_ABI,
    false
  );
}

export default useContract;
