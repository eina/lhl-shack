import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MainMenu from './components/MainMenu';
import Home from './pages/Home';
import Test from './pages/Test';
import Agreement from './pages/Agreement';
import Account from './pages/Account';
import Household from './pages/Household';

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
              <Route path="/agreement" component={Agreement} />
              <Route path="/account" component={Account} />
              <Route path="/household" component={Household} />
            </Switch>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
