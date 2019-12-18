import React from 'react';
import './style.css';
import changeDateFormat from '../helper';

const Talk = (props) => (
  <div onClick={() => props.onClick(props.talk)} className="talkContainer">
    <p className="timeDate">{changeDateFormat(props.talk.startTime).date}</p>
    <p className="timeDate">
      {changeDateFormat(props.talk.startTime).time}
      {' '}
-
      {' '}
      {changeDateFormat(props.talk.endTime).time}
    </p>
    <div className="talk">
      <h4>{props.talk.title}</h4>
      <div className="speakerLocation">
        <p>{props.talk.speakers[0]}</p>
        <p>{props.talk.location}</p>
      </div>
    </div>
  </div>
);

export default Talk;
