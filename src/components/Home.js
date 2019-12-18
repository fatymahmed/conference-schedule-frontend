import React from 'react';
import axios from 'axios';
import Registration from './auth/Registration';
import './style.css';

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
      logoutErrors: '',
    }
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push('/talks');
  }

  handleLogin(){
    this.props.history.push('/login');
  }
  handleLogoutClick() {
    axios.delete("https://events-scheduler-api.herokuapp.com/logout", 
    { withCredentials: true })
    .then(response => { 
      this.props.handleLogout();
     })
     .catch(error => {
      this.setState({
        errors: error,
      })
  })
  }
  render() {
    const { user } = this.props;
    const { logoutErrors }= this.state;
    if(logoutErrors!==''){
      return(
        <h2 style={{textAlign: 'center', color: 'red'}}>{logoutErrors}</h2>
      )
    }
    if(Object.keys(user).length === 0){
    return(
      <div>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/>
        <p className='signInText'>Already have an account?</p>
        <p className='signInLink' onClick={this.handleLogin}>Sign In</p>
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