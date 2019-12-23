/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import Talks from './talks';
import Login from './auth/Login';
import Home from './Home';
import Schedules from './schedule';
import ShowTalk from './showTalk';
import { storeUser } from '../actions/index';
import { apiURL } from './helper';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      errors: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const { loggedInStatus } = this.state;
    const { storeCurrentUser } = this.props;

    axios.get(`${apiURL}logged_in`)
      .then((response) => {
        if (response.data.logged_in && loggedInStatus === 'NOT_LOGGED_IN') {
          this.setState({
            loggedInStatus: 'LOGGED_IN',
          });
          storeCurrentUser(response.data.user);
        } else if (!response.data.logged_In && loggedInStatus === 'LOGGED_IN') {
          this.setState({
            loggedInStatus: 'NOT_LOGGED_IN',
          });
        }
      })
      .catch((error) => {
        this.setState({
          errors: error,
        });
      });
  }

  handleLogout() {
    const { storeCurrentUser } = this.props;
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN',
    });
    storeCurrentUser({});
  }

  handleLogin(data) {
    const { storeCurrentUser } = this.props;
    const { user } = data;
    this.setState({
      loggedInStatus: 'LOGGED_IN',
    });
    storeCurrentUser(user);
  }

  render() {
    const { errors, loggedInStatus } = this.state;
    const { user } = this.props;
    if (errors !== '') {
      return (
        <h2 style={{ textAlign: 'center', color: 'red' }}>{errors}</h2>
      );
    }
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  user={user}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={loggedInStatus}
                />
              )}
            />

            <Route
              exact
              path="/talks"
              render={props => (
                <Talks
                  {...props}
                  user={user}
                  loggedInStatus={loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <Login
                  {...props}
                  handleLogout={this.handleLogout}
                  handleLogin={this.handleLogin}
                  user={user}
                  loggedInStatus={loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path="/schedule"
              render={props => (
                <Schedules
                  {...props}
                  user={user}
                  handleLogout={this.handleLogout}
                  loggedInStatus={loggedInStatus}
                />
              )}
            />
          )`&#125;`
        /`&gt;`
            <Route
              exact
              path="/talk"
              render={props => (
                <ShowTalk
                  {...props}
                  user={user}
                  loggedInStatus={loggedInStatus}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  storeCurrentUser: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};
const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  storeCurrentUser: user => dispatch(storeUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
