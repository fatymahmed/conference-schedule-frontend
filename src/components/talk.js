import React from 'react';
import { post } from '../services/api-service';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import { addSchedules, fetchFailure, fetchOnGoing, fetchSuccess, } from '../actions/index';


class Talk extends React.Component{
  constructor(props){
    super(props);
    this.createSchedule = this.createSchedule.bind(this);
    this.onSuccessPost = this.onSuccessPost.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
//   const changeDateFormat = (time) => {
//     const temp = [];
//     temp.push(Number(talk.startTime.slice(0,4)));
//     temp.push(Number(talk.startTime.slice(5,7)));
//     temp.push(Number(talk.startTime.slice(8,10)));
//     temp.push(Number(talk.startTime.slice(11,13)));
//     temp.push(Number(talk.startTime.slice(14,16)));
//     const date = new Date(temp[0], temp[1], temp[2], temp[3], temp[4]);
//     return date;
//   }
//  const hey = changeDateFormat(talk.startTime);
//   console.log("time is ",hey.getHours());
  
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
  return (
    <div onClick={() => this.props.onClick(talk)}>
      <p>{talk.startTime}</p>
      <div style={{backgroundColor: 'white'}}>
        <h4>{talk.title}</h4>
        <p>{talk.speakers[0]}</p>
        <p>{talk.location}</p>
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