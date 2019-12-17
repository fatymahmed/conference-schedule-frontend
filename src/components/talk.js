import React from 'react';
import { post } from '../services/api-service';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSchedules, fetchFailure, fetchOnGoing, fetchSuccess, } from '../actions/index';
import './style.css';

class Talk extends React.Component{
  constructor(props){
    super(props);
    this.createSchedule = this.createSchedule.bind(this);
    this.onSuccessPost = this.onSuccessPost.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
   changeDateFormat = (Time) => {
    const temp = [];
    temp.push(Number(Time.slice(0,4)));
    temp.push(Number(Time.slice(5,7)));
    temp.push(Number(Time.slice(8,10)));
    temp.push(Number(Time.slice(11,13)));
    temp.push(Number(Time.slice(14,16)));
    const date = [];
    const time = [];
    date.push(temp[0]);
    date.push(temp[1]);
    date.push(temp[2]);
    console.log("date is", date);
    time.push(temp[3])
    time.push(temp[4])
    return ({
      date: date.join('/'),
      time: time.join(':')
    })
  }
//  const hey = changeDateFormat(talk.startTime);
//   console.log("time is ",hey.getHours());
// }
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
  const startTime = this.changeDateFormat(talk.startTime);
  const endTime = this.changeDateFormat(talk.endTime);
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