import React from 'react';
import Talk from './talk';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { fetchFailure, fetchOnGoing, fetchSuccess, storeSchedules, storeUser } from '../actions/index'; 
import { get } from '../services/api-service';

class Schedules extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      user_id: 0,
    }
  this.onFetchFailure = this.onFetchFailure.bind(this);
  this.onFetchSuccess = this.onFetchSuccess.bind(this);
  }

componentDidMount() {
  // this.loggedInStatus();
  const { schedules } = this.props;
  // fetchOnGoing();
  axios.get("http://localhost:3001/logged_in",
  { withCredentials: true })
  .then(response => {
    this.setState({
      user_id: response.data.user.id,
    })
    const { user_id } = this.state;
    const { fetchOnGoing } = this.props;
    fetchOnGoing();
    get(this.onFetchSuccess, this.onFetchFailure, `http://localhost:3001/${user_id}/schedules`);
  })
}
// loggedInStatus() {
  // const { user }= this.props;
  // console.log('user id is in schedule' ,this.props.user);
  // get(this.onFetchSuccessLogIn, this.onFetchFailure, `http://localhost:3001/logged_in`);
// }

onFetchSuccessLogIn(data) {
  // storeUser(data.user);
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
render() {
  const { schedules, loggedInStatus, user } =this.props
  return (
    <div>
       {schedules.map( (talk,index) => 
          <Talk key= {index} talk={talk} user={user}/>)}
    </div>
  )
  };
};



Schedules.propTypes = {
  fetchOnGoing: PropTypes.func.isRequired,
  storeSchedules: PropTypes.func.isRequired,
  fetchSuccess: PropTypes.func.isRequired,
  storeSchedules: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  schedules: state.schedules,
})
const mapDispatchToProps = dispatch => ({
  fetchOnGoing: () => dispatch(fetchOnGoing()),
  fetchFailure: () => dispatch(fetchFailure()),
  fetchSuccess: () => dispatch(fetchSuccess()),
  storeSchedules: schedules => dispatch(storeSchedules(schedules)),
  storeUser: () => dispatch(this.loggedInStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedules);