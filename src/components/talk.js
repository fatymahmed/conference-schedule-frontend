import React from 'react';
import { post } from '../services/api-service';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSchedules } from '../actions/index';
import './style.css';
import changeDateFormat from '../helper';

export default class Talk extends React.Component{
  constructor(props){
    super(props);
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
      </div>
    </div>
  )
}
};
