import React  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderTalks from './headerTalks';
import { post } from '../services/api-service';
import changeDateFormat from '../helper';
import { addSchedules } from '../actions/index';
import './style.css';

class ShowTalk extends React.Component{
  constructor(props){
    super(props);
    this.createSchedule = this.createSchedule.bind(this);
    this.onSuccessPost = this.onSuccessPost.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  createSchedule(){
    const { talk } = this.props.location.state;
    const { user } = this.props;
    return({
      user_id: user.id,
      talk_id: talk.id,
    })
  }

  onSuccessPost = (data) => {
    const { addSchedules } = this.props;
    addSchedules(data);
  }

  handleSubmit = () => {
  post(this.onSuccessPost, () => {}, this.createSchedule());
  this.props.history.push('/schedule');
  }

render() {
  const {talk} = this.props.location.state;
  const startTime = changeDateFormat(talk.startTime);
  const endTime = changeDateFormat(talk.endTime);
  return(
    <div>
      <HeaderTalks title={talk.title}/>
      <div style={{backgroundColor: 'rgb(0, 0, 128)',opacity: 0.8,paddingBottom: 20}}>
      <div className='showTalk'>
        <p>Date & Time</p>
        <div style={{marginBottom: 5}} className='showDate'>
          <p className='timeDate'>{startTime.date}</p>
          <p  className='timeDate'>{startTime.time} - {endTime.time}</p>
        </div>
        <hr/>
        <p style={{marginTop: 5}}>Location</p>
        <p>{talk.location}</p>
      </div>
      </div>
      
      <div className='talkDesc'>
      <p className='desc' >Description</p>
        <p>{talk.description}</p>
      </div>
      <div className='talkSpeakers'>
        <p>Speakers</p>
        {talk.speakers.map((speaker, i) => {
          return (<p className='speaker' key={i}>{speaker}</p>)
        })}
      </div>
      <button onClick={this.handleSubmit}>Add to schedule</button>
    </div>
  )}
}
ShowTalk.propTypes = {
  addSchedules: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addSchedules: schedule => dispatch(addSchedules(schedule)),
});

export default connect(null,mapDispatchToProps)(ShowTalk);