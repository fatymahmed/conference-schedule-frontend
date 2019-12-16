import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Talks from './talks';
import Home from './Home';
import Schedules from './schedule';
import { connect } from 'react-redux';


class App extends React.Component {
 constructor() {
   super();
   this.state = {
     loggedInStatus: "NOT_LOGGED_IN",
     user: {}
   }
   this.handleLogin = this.handleLogin.bind(this);
   this.handleLogout = this.handleLogout.bind(this);
 }
 
 checkLoginStatus() {
    axios.get("http://localhost:3001/logged_in",
    { withCredentials: true })
    .then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user,
          })
          console.log("user id in app", this.state.user);
      }
      else if ( !response.data.logged_In & this.state.loggedInStatus=== "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {},
        })
      }
    })
    .catch(error => {
      console.log("Check login error", error);
    })
 }

 componentDidMount(){
   this.checkLoginStatus();
 }

 handleLogout() {
   this.setState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {},
   })
 }

 handleLogin(data) {
   const { user } = data.user;
   this.setState({
     loggedInStatus: "LOGGED_IN",
     user,
   })
  //  storeUser(this.state.user);
 }
 render() {
   const { user } = this.state;
   return(
    <div>
    <BrowserRouter>
      <Switch>
        <Route 
          exact 
          path={"/"} 
          render={props => (
            <Home { ...props} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus}/>
          )} 
        />
        <Route exact path={"/talks"}
        render={props => (<Talks { ...props} user={user} loggedInStatus={this.state.loggedInStatus}/>)} />
        <Route exact path={"/schedule"} 
          render={props => (
            <Schedules { ...props} user={this.props.user} loggedInStatus={this.state.loggedInStatus}/>)}/>
          )} 
        />
      </Switch>
    </BrowserRouter>
  </div>
   )
 }

}

const mapStateToProps = state => ({
 user: state.user,
})

const mapDispatchToProps = dispatch => ({
  // storeUser: user => dispatch(storeUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);