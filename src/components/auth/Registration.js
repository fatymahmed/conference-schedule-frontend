import React from 'react';
import axios from 'axios';
import '../style.css';

export default class Registration extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      registrationErrors: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const { email, password, password_confirmation } = this.state;

    axios.post("http://localhost:3001/registrations", {
      user: {
        email,
        password,
        password_confirmation,
      }
    },
    {
      withCredentials: true  })
      .then(response => {
        if (response.data.status === "created"){
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch( error => {
          console.log("regis error", error)
        })
    event.preventDefault();

  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
    render() {
    return(
      <div style={{backgroundColor: 'white', }}>
        <h2 style={{color: '#000080', textAlign: 'center'}}>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
          <label htmlFor="name">Username</label><br/>
          <input  type= "text" name="name" value={this.state.email} onChange={this.handleChange} required/><br/>
          </div>
         <div>
         <label htmlFor="email">Password</label><br/>
          <input type= "password" name="password" value={this.state.password} onChange={this.handleChange} required/><br/>
         </div>
          <div>
          <label htmlFor="email">Password confirmation</label><br/>
          <input type= "password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required/><br/>
          </div>
          <button type= "submit">Sign Up</button>
        </form>
      </div>
    )
  }
}