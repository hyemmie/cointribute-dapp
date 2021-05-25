/// <reference types="react-scripts" />

interface Window {
  ethereum?: {
    isMetaMask?: true;
    isImToken?: true;
    on?: (...args: any[]) => void;
    removeListener?: (...args: any[]) => void;
    enable?: () => Promise<void>;
  };
  web3?: {};
}
