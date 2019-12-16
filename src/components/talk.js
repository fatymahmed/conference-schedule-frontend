import React from 'react';
import { post } from '../services/api-service';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSchedules, fetchFailure, fetchOnGoing, fetchSuccess, } from '../actions/index';

const Talk = (props) => {
  const {talk, user} = props;
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
      <h1>{talk.title}</h1>
      {/* DateTime.new(2011,10,1,9).to_s(:time) #=> "09:00" */}
      <button onClick={handleSubmit}>Add to schedule</button>
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