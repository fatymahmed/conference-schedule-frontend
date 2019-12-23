import React from 'react';
import PropTypes from 'prop-types';
import HeaderTalks from './headerTalks';
import changeDateFormat from '../helper';
import './style.css';
import { post } from '../services/api-service';


export default class ShowTalk extends React.Component {
  constructor(props) {
    super(props);
    this.createSchedule = this.createSchedule.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createSchedule() {
    const { location } = this.props;
    const { state } = location;
    const { user, talk } = state;
    return ({
      user_id: user.id,
      talk_id: talk.id,
    });
  }

  handleSubmit() {
    const { history, user } = this.props;
    post(() => {}, () => {}, this.createSchedule(), `https://events-scheduler-api.herokuapp.com/users/${user.id}/schedules`);
    history.push('/schedule');
  }

  render() {
    const { location } = this.props;
    const { talk } = location.state;
    const startTime = changeDateFormat(talk.startTime);
    const endTime = changeDateFormat(talk.endTime);
    return (
      <div>
        <HeaderTalks title={talk.title} />
        <div style={{ backgroundColor: 'rgb(0, 0, 128)', opacity: 0.8, paddingBottom: 5 }}>
          <div className="showTalk">
            <p>Date & Time</p>
            <div style={{ marginBottom: 5 }} className="showDate">
              <p className="showTimeDate time">{startTime.date}</p>
              <p className="showTimeDate time">
                {startTime.time}
                {' '}
  -
                {' '}
                {endTime.time}
              </p>
            </div>
            <hr />
            <p style={{ marginTop: 5 }}>Location</p>
            <p className="time">{talk.location}</p>
          </div>
          <button type="submit" className="button addSched" onClick={this.handleSubmit}>Add to your schedule</button>
        </div>
        <div className="talkDesc">
          <p className="desc">Description</p>
          <p className="talkDesc">{talk.description}</p>
        </div>
        <div className="talkSpeakers">
          <p className="speakerHeader">Speakers</p>
          {talk.speakers.map(speaker => (<p className="speaker" key={speaker}>{speaker}</p>))}
        </div>
      </div>
    );
  }
}

ShowTalk.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};
