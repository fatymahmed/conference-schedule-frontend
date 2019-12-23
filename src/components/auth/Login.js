import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../style.css';
import reg from './reg.jpg';
import { apiURL } from '../helper';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    const { handleLogin, history } = this.props;
    axios.post(`${apiURL}sessions`, {
      user: {
        email,
        password,
      },
    })
      .then((response) => {
        if (response.data.logged_in) {
          handleLogin(response.data);
          history.push('/talks');
        } else if (response.data.status === 401) {
          this.setState({
            errors: "The username and password don't match, if you dont have an account, please sign up",
          });
        }
      })
      .catch((error) => {
        this.setState({
          errors: error,
        });
      });
    event.preventDefault();
  }

  handleLogoutClick() {
    const { handleLogout, history } = this.props;
    axios.delete(`${apiURL}logout`,
      { withCredentials: true })
      .then(() => {
        handleLogout();
        history.push('/login');
      })
      .catch((error) => {
        this.setState({
          errors: error,
        });
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { user } = this.props;
    const { errors, password, email } = this.state;
    if (Object.keys(user).length === 0) {
      if (errors !== '') {
        return (
          <h2 style={{ textAlign: 'center', color: 'red' }}>{errors}</h2>
        );
      }
      return (
        <div style={{ backgroundColor: 'white', textAlign: 'center' }}>
          <img className="regImg" src={reg} alt="registration" />
          <h4 className="signUpHeading">Sign In</h4>
          <form onSubmit={this.handleSubmit}>
            <div>
              <p>Username</p>
              <br />
              <input type="text" name="email" value={email} onChange={this.handleChange} required />
              <br />
            </div>
            <div>
              <p>Password</p>
              <br />
              <input type="password" name="password" value={password} onChange={this.handleChange} required />
              <br />
            </div>
            <button className="button" type="submit">Login</button>
          </form>
        </div>
      );
    }

    return (
      <div>
        <p style={{ textAlign: 'center', paddingTop: 10 }}>You are already logged In</p>
        <button type="submit" onClick={this.handleLogoutClick}>Logout</button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};
