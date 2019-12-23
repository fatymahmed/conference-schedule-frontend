import React from 'react';
import PropTypes from 'prop-types';
import HeaderTalks from './headerTalks';
import changeDateFormat from '../helper';
import './style.css';

// export default class ShowTalk extends React.Component {
const ShowTalk = (props) => {
  const { location } = props;
  const { talk } = location.state;
  const startTime = changeDateFormat(talk.startTime);
  const endTime = changeDateFormat(talk.endTime);
  return (
    <div>
      <HeaderTalks title={talk.title} />
      <div style={{ backgroundColor: 'rgb(0, 0, 128)', opacity: 0.8, paddingBottom: 20 }}>
        <div className="showTalk">
          <p>Date & Time</p>
          <div style={{ marginBottom: 5 }} className="showDate">
            <p className="timeDate">{startTime.date}</p>
            <p className="timeDate">
              {startTime.time}
              {' '}
-
              {' '}
              {endTime.time}
            </p>
          </div>
          <hr />
          <p style={{ marginTop: 5 }}>Location</p>
          <p>{talk.location}</p>
        </div>
      </div>

      <div className="talkDesc">
        <p className="desc">Description</p>
        <p>{talk.description}</p>
      </div>
      <div className="talkSpeakers">
        <p>Speakers</p>
        {talk.speakers.map(speaker => (<p className="speaker" key={speaker}>{speaker}</p>))}
      </div>
    </div>
  );
};
ShowTalk.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};
export default ShowTalk;
