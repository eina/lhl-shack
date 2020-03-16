import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainMenu from "./components/MainMenu";
import Home from "./pages/Home";
import Test from "./pages/Test";

const App = () => {
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
            </Switch>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
