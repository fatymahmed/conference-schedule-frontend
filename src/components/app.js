import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Talks from './talks';
import Login from './auth/Login';
import Home from './Home';
import Schedules from './schedule';
import { connect } from 'react-redux';
import ShowTalk from './showTalk';
import { storeUser } from '../actions/index';


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
    axios.get("https://events-scheduler-api.herokuapp.com/logged_in",
    )
    .then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user,
          })
          this.props.storeCurrentUser(response.data.user);
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
   this.props.storeCurrentUser({});
 }

 handleLogin(data) {
   const { user } = data;
   this.setState({
     loggedInStatus: "LOGGED_IN",
     user,
   })
   this.props.storeCurrentUser(this.state.user);
 }
 render() {
   return(
    <div>
    <BrowserRouter>
      <Switch>
        <Route 
          exact 
          path={"/"} 
          render={props => (
            <Home { ...props} user={this.props.user} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus}/>
          )} 
        />
        
        <Route exact path={"/talks"}
        render={props => (<Talks { ...props} user={this.props.user} loggedInStatus={this.state.loggedInStatus}/>)} />
        <Route exact path={"/login"}
        render={props => (<Login { ...props} handleLogout={this.handleLogout} handleLogin={this.handleLogin} user={this.props.user} loggedInStatus={this.state.loggedInStatus}/>)} />
        <Route exact path={"/schedule"} 
          render={props => (
            <Schedules { ...props} user={this.props.user} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus}/>)}/>
          )} 
        />
        <Route exact path={"/talk"}
        render={props => (<ShowTalk { ...props} user={this.props.user} loggedInStatus={this.state.loggedInStatus}/>)} />
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
  storeCurrentUser: user => dispatch(storeUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);