import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AppContext } from "./Store";

import MainMenu from "./components/MainMenu";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Agreement from "./pages/Agreement";
import Account from "./pages/Account";

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
  const { state, updateState } = useContext(AppContext);
  // fake an axios request lol
  useEffect(() => {
    updateState({ currUser });
  }, []);

  console.log("did this work?", state);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <p>shack</p>
        </header>

        <div className="container">
          {/* side nav bar and links */}
          <MainMenu />

          <main>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/test" component={Test} />
              <Route path="/agreement" component={Agreement} />
              <Route path="/account" component={Account} />
            </Switch>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
