import React from 'react';
import { connect } from 'react-redux';
import Talk from './talk';
import HeaderTalks from './headerTalks'; 
import { fetchFailure, fetchOnGoing, fetchSuccess,addTalks } from '../actions/index'; 
import { get } from '../services/api-service';

class Talks extends React.Component{
  constructor(props){
    super(props);
  this.onFetchFailure = this.onFetchFailure.bind(this);
  this.onFetchSuccess = this.onFetchSuccess.bind(this);
  this.mySchedule = this.mySchedule.bind(this);
  }

componentDidMount() {
  const { fetchOnGoing } = this.props;
  fetchOnGoing();
  get(this.onFetchSuccess, this.onFetchFailure, 'http://localhost:3001/talks');
}

onFetchSuccess(data) {
  const { fetchSuccess, addTalks } = this.props;
  fetchSuccess();
  addTalks(data.data);
}

mySchedule(){
  this.props.history.push(`/schedule`);
}
onFetchFailure(error) {
  const { fetchFailure } = this.props;
  fetchFailure();
}
handleClick(talk){
const talkInfo = talk;
  this.props.history.push({pathname: `/talk`, state: { talk: talkInfo}});
}
render() {
  const { talks, loggedInStatus, user, history } =this.props;
  return (
    <div>
      <HeaderTalks title='Talks'/>
      <button onClick = {this.mySchedule}>My schedule</button>
      <div style={{backgroundColor: '#F8F8FF'}}>
        {talks.map((talk,index) => <Talk onClick={i => this.handleClick(i)} key={index} talk={talk} user={user}/>)}
      </div>
    </div>
    
    ) 
  };
};

const mapStateToProps = (state) => ({
  talks: state.talks,
});

const mapDispatchToProps = dispatch => ({
  fetchOnGoing: () => dispatch(fetchOnGoing()),
  fetchFailure: () => dispatch(fetchFailure()),
  fetchSuccess: () => dispatch(fetchSuccess()),
  addTalks: talks => dispatch(addTalks(talks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Talks);