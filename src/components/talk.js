import React from 'react';
import { post } from '../services/api-service';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSchedules, fetchFailure, fetchOnGoing, fetchSuccess, } from '../actions/index';
import './style.css';
import changeDateFormat from '../helper';

class Talk extends React.Component{
  constructor(props){
    super(props);
    this.createSchedule = this.createSchedule.bind(this);
    this.onSuccessPost = this.onSuccessPost.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  createSchedule(){
    const {talk, user} = this.props;
    return({
      user_id: user.id,
      talk_id: talk.id,
    })
  }

  onSuccessPost = (data) => {
    const { fetchSuccess, addSchedules } = this.props;
    fetchSuccess();
    addSchedules(data);
  }
  handleSubmit = () => {
  post(this.onSuccessPost, () => {}, this.createSchedule());
  }

  render(){
  const {talk, user} = this.props;
  const startTime = changeDateFormat(talk.startTime);
  const endTime = changeDateFormat(talk.endTime);
  return (
    <div onClick={() => this.props.onClick(talk)} className='talkContainer'>
      <p className='timeDate'>{startTime.date}</p>
      <p className='timeDate'>{startTime.time} - {endTime.time}</p>
      <div className='talk' >
        <h4>{talk.title}</h4>
        <div className='speakerLocation'>
        <p>{talk.speakers[0]}</p>
        <p>{talk.location}</p>
        </div>
        <button onClick={this.handleSubmit}>Add to schedule</button>
      </div>
    </div>
  )
}
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