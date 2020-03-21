import React, { useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect, useLocation } from "react-router-dom";
import {
  ThemeProvider,
  CSSReset,
  theme,
  Grid,
  Flex,
  Box,
  Heading,
  Text,
  Icon
} from "@chakra-ui/core";

import { displayFullName } from "./helpers/functions";
import { AppContext, AppProvider } from "./Store";

import MainMenu from "./components/MainMenu";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Agreement from "./pages/Agreement";
import AgreementForm from "./components/AgreementForm/AgreementForm";
import AgreementMenu from "./components/AgreementForm/AgreementMenu";

// test data
const currUser = {
  id: "1",
  first_name: "Tracy",
  last_name: "Barrows",
  phone_number: "448-504-4347",
  email: "test@test.com",
  password: "testing",
  household: "951bfa7e-d0e1-414d-9327-5e8c4bc8c56b"
};

const AppContent = () => {
  const { state, updateState }: { state: any; updateState: Function } = useContext(AppContext);
  const location = useLocation();
  const { pathname: currentPath } = location;
  // fake an axios request lol
  useEffect(() => {
    updateState({
      currUser,
      fullName: displayFullName(currUser.first_name, currUser.last_name)
    });
  }, []);

  return (
    <Box className="App" w="100%">
      <Flex as="header" align="center" p={10} bg="teal.500" color="white" justify="space-between">
        <Heading as="h1" size="lg">
          shack
        </Heading>
        {state && state.currUser && state.fullName ? (
          <Flex as="nav" align="center">
            <Icon name="bell" />
            <Text>{state.fullName}</Text>
          </Flex>
        ) : null}
      </Flex>

      {currentPath.startsWith("/agreement") ? (
        <Grid templateColumns="1fr 4fr" gap={1} p={5} className="container">
          <AgreementMenu />

          <Box as="main" bg="gray.50" pr={10} pl={10} rounded={10}>
            <Switch>
              <Redirect from="/agrement" to="/agreement/title" exact />
              <Route path="/agreement" component={Agreement} />
            </Switch>
          </Box>
        </Grid>
      ) : (
        <Grid templateColumns="1fr 4fr" gap={1} p={5} className="container">
          <MainMenu />

          <Box as="main" bg="gray.50" pr={10} pl={10} rounded={10}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/test" component={Test} />
            </Switch>
          </Box>
        </Grid>
      )}
    </Box>
  );
};

// what renders on index
const App = () => {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
