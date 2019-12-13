import React from 'react';
import { post } from '../services/api-service';
import { addSchedules, fetchFailure, fetchOnGoing, fetchSuccess, } from '../actions/index';

const Talk = (props) => {
  const {talk, user} = props;
  const createSchedule = () => ({
    user_id: user,
    talk_id: talk.id,
  })
  const onSuccessPost = () => {
    const { fetchSuccess, addSchedules } = this.props;
    fetchSuccess();
    // addSchedules(data);
  }
  const handleSubmit = () => {
    console.log(post(onSuccessPost, () => {}, createSchedule()));
  }

  return (
    <div>
      <h1>{talk.title}</h1>
      {/* DateTime.new(2011,10,1,9).to_s(:time) #=> "09:00" */}
      <button onClick={handleSubmit}>Add to schedule</button>
    </div>
  )
};

export default Talk;