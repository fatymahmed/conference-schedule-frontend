import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderTalks from './headerTalks';
import { post } from '../services/api-service';
import changeDateFormat from '../helper';
import { addSchedules } from '../actions/index';
import './style.css';

class ShowTalk extends React.Component {
  constructor(props) {
    super(props);
    this.createSchedule = this.createSchedule.bind(this);
    this.onSuccessPost = this.onSuccessPost.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onSuccessPost(data) {
    const { addSchedules } = this.props;
    addSchedules(data);
  }

  createSchedule() {
    const { location, user } = this.props;
    const { talk } = location.state;
    return ({
      user_id: user.id,
      talk_id: talk.id,
    });
  }

  handleSubmit() {
    const { history, user } = this.props;
    post(this.onSuccessPost, () => {}, this.createSchedule(), `https://events-scheduler-api.herokuapp.com/users/${user.id}/schedules`);
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
        <button className="button" type="submit" onClick={this.handleSubmit}>Add to schedule</button>
      </div>
    );
  }
}
ShowTalk.propTypes = {
  addSchedules: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,

};

const mapDispatchToProps = dispatch => ({
  addSchedules: schedule => dispatch(addSchedules(schedule)),
});

export default connect(null, mapDispatchToProps)(ShowTalk);
