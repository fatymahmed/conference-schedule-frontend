import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Talks from './talks';
import Dashboard from './Dashboard';
import Home from './Home';


export default class App extends React.Component {
 constructor() {
   super();
   this.state = {
     loggedInStatus: "NOT_LOGGED_IN",
     user: {}
   }
 } 
 render() {
   return(
    <div>
    <Talks />
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} 
          render={props => (<Home { ...props} loggedInStatus={this.state.loggedInStatus}/>)} />
        <Route exact path={"/dashboard"}
        render={props => (<Dashboard { ...props} loggedInStatus={this.state.loggedInStatus}/>)} />
          </Switch>
    </BrowserRouter>
  </div>
   )
 }

}

