import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import changeDateFormat from '../helper';
import { post, remove } from '../services/api-service';

class Talk extends React.Component {
  constructor(props) {
    super(props);
    this.createSchedule = this.createSchedule.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeFromSchedule = this.removeFromSchedule.bind(this);
  }

  createSchedule() {
    const { user, talk } = this.props;
    return ({
      user_id: user.id,
      talk_id: talk.id,
    });
  }

  handleSubmit() {
    const { history, user, onFetchSuccess } = this.props;
    post(onFetchSuccess, () => {}, this.createSchedule(), `https://events-scheduler-api.herokuapp.com/users/${user.id}/schedules`);
    history.push('/schedule');
  }

  removeFromSchedule() {
    const {
      history, user, talk, onFetchSuccess,
    } = this.props;
    remove(onFetchSuccess, () => {}, `https://events-scheduler-api.herokuapp.com/users/${user.id}/schedules/${talk.id}`);
    history.push('/schedule');
  }

  render() {
    const { location } = this.props;
    console.log("state in render", location);
    const { talk, onClick } = this.props;
    if (location.pathname === '/talks') {
      return (
        <div className="talkContainer">
          <p className="timeDate" style={{ color: '#fe70a3' }}>{changeDateFormat(talk.startTime).date}</p>
          <p className="timeDate" style={{ color: '#17b5db' }}>
            {changeDateFormat(talk.startTime).time}
            {' '}
  -
            {' '}
            {changeDateFormat(talk.endTime).time}
          </p>
          <button type="submit" onClick={() => onClick(talk)} className="talk">
            <p className="talkTitle">{talk.title}</p>
            <div className="speakerLocation">
              <p>{talk.speakers[0]}</p>
              <p>{talk.location}</p>
            </div>
          </button>
          <button className="button schedule-btn" type="submit" onClick={this.handleSubmit}>
  + to schedule
          </button>
        </div>
      );
    }
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
          <p className="talkTitle">{talk.title}</p>
          <div className="speakerLocation">
            <p>{talk.speakers[0]}</p>
            <p>{talk.location}</p>
          </div>
        </button>
        <button className="button schedule-btn" type="submit" style={{ backgroundColor: 'green' }} onClick={this.removeFromSchedule}>
- from schedule
        </button>
      </div>
    );
  }
}

Talk.propTypes = {
  location: PropTypes.objectOf(PropTypes.object).isRequired,
  talk: PropTypes.instanceOf(Object).isRequired,
  onClick: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  onFetchSuccess: PropTypes.func.isRequired,
};

export default Talk;
