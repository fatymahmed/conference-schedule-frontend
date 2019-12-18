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
  const { fetchOnGoing } = this.props;
  const { schedules, user } =this.props
  fetchOnGoing();
  get(this.onFetchSuccess, this.onFetchFailure, `http://localhost:3001/${user.id}/schedules`);
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