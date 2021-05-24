import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./containers/Main";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/beneficiary/:id"></Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
