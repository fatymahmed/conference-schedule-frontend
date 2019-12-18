import React from 'react';
import Talk from './talk';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchFailure, fetchOnGoing, fetchSuccess, storeSchedules } from '../actions/index'; 
import { get } from '../services/api-service';

class Schedules extends React.Component{
  constructor(props){
    super(props);
  this.onFetchFailure = this.onFetchFailure.bind(this);
  this.onFetchSuccess = this.onFetchSuccess.bind(this);
  this.handleLogin = this.handleLogin.bind(this);
  this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

onFetchSuccess(data) {
  const { fetchSuccess, storeSchedules } = this.props;
  fetchSuccess();
  storeSchedules(data);
}

onFetchFailure(error) {
  const { fetchFailure } = this.props;
  fetchFailure();
}

handleLogin(){
  this.props.history.push('/');
}
render() {
  const { fetchOnGoing } = this.props;
  const { schedules, user } =this.props
  if(Object.keys(user).length === 0){
  return(
    <div>
  <p style={{paddingTop: 20, textAlign: 'center'}}>Please log in to view your schedule</p>
     <button onClick={this.handleLogin}>Log in</button>
    </div>
  
  )
  }
  else{
  fetchOnGoing();
  get(this.onFetchSuccess, this.onFetchFailure, `http://localhost:3001/${user.id}/schedules`);
  return (
    <div>
       {schedules.map( (talk,index) => 
          <Talk key= {index} talk={talk} user={user}/>)}
    </div>
  )
  }
  };
};

Schedules.propTypes = {
  fetchOnGoing: PropTypes.func.isRequired,
  storeSchedules: PropTypes.func.isRequired,
  fetchSuccess: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  schedules: state.schedules,
})
const mapDispatchToProps = dispatch => ({
  fetchOnGoing: () => dispatch(fetchOnGoing()),
  fetchFailure: () => dispatch(fetchFailure()),
  fetchSuccess: () => dispatch(fetchSuccess()),
  storeSchedules: schedules => dispatch(storeSchedules(schedules)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedules);