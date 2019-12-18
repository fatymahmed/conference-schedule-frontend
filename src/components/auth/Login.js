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
    axios.post("https://events-scheduler-api.herokuapp.com/sessions", {
      user: {
        email,
        password,
      }
    },
      )
      .then(response => {
        if (response.data.logged_in){
          this.props.handleLogin(response.data);
          this.props.history.push('/talks')
        }
        else if(response.data.status===401){
          this.setState({
            loginErrors: "Account doesn't exist, please sign up",
          })
        }
      })
      .catch( error => {
        this.setState({
          loginErrors: error,
        })
        })
    event.preventDefault();

  }

  handleLogoutClick() {
    axios.delete("https://events-scheduler-api.herokuapp.com/logout", 
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
      const { loginErrors } = this.state;
      if(Object.keys(user).length === 0){
        if(loginErrors!==''){
          return(
            <h2 style={{textAlign: 'center', color: 'red'}}>{loginErrors}</h2>
          )
        }
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