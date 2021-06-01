import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./containers/Main";
import Donate from "./containers/Donate";
import { ChakraProvider } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "./core/utils/getLibrary";

function App() {
  if (window.ethereum?.isMetaMask) {
    return (
      <ChakraProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Router>
            <Switch>
              <Route path="/main">
                <Main />
              </Route>
              <Route path="/beneficiary/:id">
                <Donate />
              </Route>
            </Switch>
          </Router>
        </Web3ReactProvider>
      </ChakraProvider>
    );
  } else {
    return <div>Install Metamask</div>;
  }
}

export default App;
