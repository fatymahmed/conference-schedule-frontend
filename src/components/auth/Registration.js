import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../style.css';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      registrationErrors: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const { email, password, passwordConfirmation } = this.state;
    const { handleSuccessfulAuth } = this.props;

    axios.post('https://events-scheduler-api.herokuapp.com/registrations', {
      user: {
        email,
        password,
        passwordConfirmation,
      },
    })
      .then((response) => {
        if (response.data.status === 'created') {
          handleSuccessfulAuth(response.data);
        }
      })
      .catch((error) => {
        this.setState({
          registrationErrors: error,
        });
      });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const {
      registrationErrors, email, password, passwordConfirmation,
    } = this.state;
    if (registrationErrors !== '') {
      return (
        <h2 style={{ textAlign: 'center', color: 'red' }}>{registrationErrors}</h2>
      );
    }
    return (
      <div style={{ backgroundColor: 'white' }}>
        <h2 style={{ color: '#000080', textAlign: 'center' }}>Sign Up</h2>
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
          <div>
            <p>Password confirmation</p>
            <br />
            <input type="password" name="passwordConfirmation" value={passwordConfirmation} onChange={this.handleChange} required />
            <br />
          </div>
          <button className="button" type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

Registration.propTypes = {
  handleSuccessfulAuth: PropTypes.func.isRequired,
};
