import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import changeDateFormat from '../helper';

const Talk = (props) => {
  const { talk, onClick } = props;
  return (
    <div className="talkContainer">
      <p className="timeDate">{changeDateFormat(talk.startTime).date}</p>
      <p className="timeDate">
        {changeDateFormat(talk.startTime).time}
        {' '}
-
        {' '}
        {changeDateFormat(talk.endTime).time}
      </p>
      <button type="submit" onClick={() => onClick(talk)} className="talk">
        <h4>{talk.title}</h4>
        <div className="speakerLocation">
          <p>{talk.speakers[0]}</p>
          <p>{talk.location}</p>
        </div>
      </button>
    </div>
  );
};

Talk.propTypes = {
  talk: PropTypes.instanceOf(Object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Talk;
