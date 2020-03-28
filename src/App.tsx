import React, { useContext, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route, useLocation, Link } from "react-router-dom";
import { ThemeProvider, CSSReset, Grid, Box, Heading } from "@chakra-ui/core";
import { Global } from "@emotion/core";
import customTheme from "./chakra/customTheme";

import { displayFullName } from "./helpers/functions";
import { AppContext, AppProvider } from "./Store";

import AppLoading from "./components/AppLoading";
import AppHeader from "./components/AppHeader";
import MainMenu from "./components/MainMenu";

import Home from "./pages/Home";
import Test from "./pages/Test";
import CreateHousehold from "./pages/CreateHousehold";
import Agreement from "./pages/Agreement";
import Account from "./pages/Account";
import AgreementMenu from "./components/AgreementForm/AgreementMenu";
import Household from "./pages/Household";
import Resources from "./pages/Resources";
import Housekeeping from "./pages/Housekeeping";
import Bills from "./pages/Bills";
import PreviousHousehold from "./pages/PreviousHousehold";

// test data
// const currUser = {
//   id: "1",
//   first_name: "Tracy",
//   last_name: "Barrows",
//   phone_number: "448-504-4347",
//   email: "test@test.com",
//   password: "testing",
//   household: 1
// };

const AppContent = () => {
  const { state, updateState }: { state: any; updateState: any } = useContext(AppContext);
  const { pathname: currentPath } = useLocation();
  const isHouseholdOrAgreementForm =
    currentPath.startsWith("/create-household") || currentPath.startsWith("/agreement");
  useEffect(() => {
    const getUserData = () => {
      axios.get("/api/users/1").then(user => {
        updateState({
          currUser: user.data,
          fullName: displayFullName(user.data.first_name, user.data.last_name)
        });
      });
    };
    getUserData();
    // updateState({
    //   currUser: currUser,
    //   fullName: displayFullName(currUser.first_name, currUser.last_name)
    // });
  }, [updateState]);

  if (state && state.currUser) {
    return (
      <Box
        className="App"
        w="100%"
        h="100%"
        lineHeight="tall"
        fontSize="lg"
        boxSizing="border-box"
        color="gray.900"
      >
        <Grid templateColumns="1fr 4fr" className="container">
          <Box as="aside" px="4em">
            <Heading
              as="h1"
              size="lg"
              fontFamily="logo"
              fontSize="6xl"
              fontWeight="black"
              py="10"
              mb={0}
            >
              <Link to="/">
                <Box as="span" color="brand">
                  shack
                </Box>
              </Link>
            </Heading>
            {isHouseholdOrAgreementForm ? <AgreementMenu /> : <MainMenu />}
          </Box>

          <Box bg="gray.50" pr="8em" pl="3em" pb="5em" minH="100vh">
            <AppHeader {...state} />
            <Box as="main">
              {isHouseholdOrAgreementForm ? (
                // Agreement Form
                <Switch>
                  <Route path="/create-household" component={CreateHousehold} />
                  <Route path="/agreement" component={Agreement} />
                </Switch>
              ) : (
                // Main App Contents
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/test" component={Test} />
                  <Route path="/household" component={Household} exact/>
                  <Route path="/household/previous" component={PreviousHousehold} />
                  <Route path="/bills" component={Bills} />
                  <Route path="/housekeeping" component={Housekeeping} />
                  <Route path="/resources" component={Resources} />
                  <Route path="/account" component={Account} />
                </Switch>
              )}
            </Box>
          </Box>
        </Grid>
      </Box>
    );
  } else {
    return <AppLoading />;
  }
};

// what renders on index
const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Global
        styles={`      
        h1, h2, h3, h4, h5, h5 {
          margin-bottom: 0.65em;
        }
        main p {
          margin-bottom: 0.5em;
        }
      `}
      />
      <BrowserRouter>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
