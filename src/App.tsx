import React, { useContext, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import { ThemeProvider, CSSReset, Box, useDisclosure } from "@chakra-ui/core";
import { Global } from "@emotion/core";
import customTheme from "./chakra/customTheme";

import "./App.scss";

import { displayFullName } from "./helpers/functions";
import { AppContext, AppProvider } from "./Store";

import AppLoading from "./components/AppLoading";
import AppHeader from "./components/AppHeader";
import AppLogo from "./components/AppLogo";
import AppMenuDrawer from "./components/AppMenuDrawer";
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
import Messages from './pages/Messages';

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
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        bg="gray.50"
        minH="100vh"
        letterSpacing="wide"
      >
        <AppMenuDrawer drawerIsOpen={isOpen} drawerClose={onClose}>
          {isHouseholdOrAgreementForm ? <AgreementMenu /> : <MainMenu />}
        </AppMenuDrawer>

        <Box className="container">
          <Box as="aside" className="side-nav" bg="white" minH="100vh">
            <AppLogo />
            {isHouseholdOrAgreementForm ? <AgreementMenu /> : <MainMenu />}
          </Box>

          <Box w="100%" className="main-content">
            <AppHeader {...state} drawerOpen={onOpen} />
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
                  <Route path="/messages" component={Messages} />
                  <Route path="/resources" component={Resources} />
                  <Route path="/account" component={Account} />
                </Switch>
              )}
            </Box>
          </Box>
        </Box>
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
          margin-bottom: 0.45em;
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
