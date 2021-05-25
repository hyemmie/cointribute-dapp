import React from "react";
// import { useHistory, useParams } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "../core/utils/getLibrary";
import Index from "../components/Index";

function Main() {
  if (window.ethereum?.isMetaMask) {
    return (
      <div>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Index />
        </Web3ReactProvider>
      </div>
    );
  } else {
    return <div>Install Metamask</div>;
  }
}

export default Main;
