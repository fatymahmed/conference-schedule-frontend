import React from 'react';
import axios from 'axios';
import '../style.css';

export default class Login extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      loginErrors: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSubmit(event) {
    const { email, password } = this.state;

    axios.post("http://localhost:3001/sessions", {
      user: {
        email,
        password,
      }
    },
    {
      withCredentials: true  })
      .then(response => {
        if (response.data.logged_in){
          this.props.handleLogin(response.data);
          this.props.history.push('/talks')
        }
      })
      .catch( error => {
          console.log("login error", error)
        })
    event.preventDefault();

  }

  handleLogoutClick() {
    axios.delete("http://localhost:3001/logout", 
    { withCredentials: true })
    .then(response => { 
      this.props.handleLogout();
      this.props.history.push('/login')
     })
     .catch(error => {
       console.log("logout error", error);
     })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
    render() {
      const { user } = this.props;
      if(Object.keys(user).length === 0){
        return(
          <div>
            <h2 style={{color: 'rgb(0, 0, 128)', textAlign: 'center', marginTop: 10}}>Login</h2>
            <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Username</label><br/>
            <input  type= "text" name="email" value={this.state.email} onChange={this.handleChange} required/><br/>
            <label htmlFor="password">Password</label><br/>
            <input type= "password" name="password" value={this.state.password} onChange={this.handleChange} required/>
            <button type= "submit">Login</button>
            </form>
          </div>
        )
    }
    else{
      return(
        <div>
        <p style={{textAlign: 'center', paddingTop: 10}}>You are already logged In</p>
        <button onClick={ () =>this.handleLogoutClick()}>Logout</button>
      </div>
      )
    }
  }
}