import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid, Flex, Box, Heading, Text, Icon } from "@chakra-ui/core";

import { displayFullName } from "./helpers/functions";
import { AppContext } from "./Store";

import MainMenu from "./components/MainMenu";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Agreement from "./pages/Agreement";

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

const App = () => {
  const { state, updateState }: { state: any; updateState: Function } = useContext(AppContext);
  // fake an axios request lol
  useEffect(() => {
    updateState({
      currUser,
      fullName: displayFullName(currUser.first_name, currUser.last_name)
    });
  }, []);

  console.log("hello?", state);

  return (
    <Router>
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

        <Grid templateColumns="1fr 4fr" gap={1} p={5} className="container">
          {/* side nav bar and links */}
          <MainMenu />

          <Box as="main" bg="gray.50" pr={10} pl={10} rounded={10}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/test" component={Test} />
              <Route path="/agreement" component={Agreement} />
            </Switch>
          </Box>
        </Grid>
      </Box>
    </Router>
  );
};

export default App;
