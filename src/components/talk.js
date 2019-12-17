import React from 'react';
import { post } from '../services/api-service';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSchedules, fetchFailure, fetchOnGoing, fetchSuccess, } from '../actions/index';

const Talk = (props) => {
  const {talk, user} = props;
  const changeDateFormat = (time) => {
    const temp = [];
    temp.push(Number(talk.startTime.slice(0,4)));
    temp.push(Number(talk.startTime.slice(5,7)));
    temp.push(Number(talk.startTime.slice(8,10)));
    temp.push(Number(talk.startTime.slice(11,13)));
    temp.push(Number(talk.startTime.slice(14,16)));
    const date = new Date(temp[0], temp[1], temp[2], temp[3], temp[4]);
    return date;
  }
 const hey = changeDateFormat(talk.startTime);
  console.log("time is ",hey.getHours());
  const createSchedule = () => ({
    user_id: user.id,
    talk_id: talk.id,
  })
  const onSuccessPost = (data) => {
    const { fetchSuccess, addSchedules } = this.props;
    fetchSuccess();
    addSchedules(data);
  }
  const handleSubmit = () => {
  post(onSuccessPost, () => {}, createSchedule());
  }
  return (
    <div>
      <p>{talk.startTime}</p>
      <div style={{backgroundColor: 'white'}}>
        <h4>{talk.title}</h4>
        <p>{talk.speakers[0]}</p>
        <p>{talk.location}</p>
        <button onClick={handleSubmit}>Add to schedule</button>
      </div>
    </div>
  )
};

Talk.propTypes = {
  fetchOnGoing: PropTypes.func.isRequired,
  addSchedules: PropTypes.func.isRequired,
  fetchSuccess: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchOnGoing: () => dispatch(fetchOnGoing()),
  fetchFailure: () => dispatch(fetchFailure()),
  fetchSuccess: () => dispatch(fetchSuccess()),
  addSchedules: schedule => dispatch(addSchedules(schedule)),
});

export default connect(null, mapDispatchToProps)(Talk);