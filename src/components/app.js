import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Talks from './talks';
import Dashboard from './Dashboard';
import Home from './Home';


const App = () => (
  <div>
    <Talks />
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/dashboard"} component={Dashboard} />
      </Switch>
    </BrowserRouter>
  </div>
)

export default App;