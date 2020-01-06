import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Registration from './auth/Registration';
import { apiURL } from './helper';
import './style.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutErrors: '',
    };
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleSuccessfulAuth(data) {
    const { handleLogin, history } = this.props;
    handleLogin(data);
    history.push('/talks');
  }

  handleLogin() {
    const { history } = this.props;
    history.push('/login');
  }

  handleLogoutClick() {
    const { handleLogout } = this.props;
    axios.delete(`${apiURL}logout`,
      { withCredentials: true })
      .then(() => {
        handleLogout();
      })
      .catch((error) => {
        this.setState({
          logoutErrors: error,
        });
      });
  }

  render() {
    const { user } = this.props;
    const { logoutErrors } = this.state;
    if (logoutErrors !== '') {
      return (
        <h2 style={{ textAlign: 'center', color: 'red' }}>{logoutErrors}</h2>
      );
    }
    if (Object.keys(user).length === 0) {
      return (
        <div>
          <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} handleLogin={this.handleLogin} />
          <p className="signInText">Already have an account?</p>
          <button className="button signInLink" type="submit" onClick={this.handleLogin}>Sign In</button>
        </div>
      );
    }

    return (
      <div>
        <p style={{ textAlign: 'center', paddingTop: 10 }}>You are already logged In</p>
        <button className="button" type="submit" onClick={this.handleLogoutClick()}>Logout</button>
      </div>
    );
  }
}
Home.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,

};
