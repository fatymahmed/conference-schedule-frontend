import React  from 'react';
import HeaderTalks from './headerTalks';

export default class ShowTalk extends React.Component{
  constructor(props){
    super(props);
  }

render() {
  const {talk} = this.props.location.state;
  return(
    <div>
      <HeaderTalks title='Talks'/>
      <div className='showTalk'>
        <p>{talk.title}</p>
        <p>{talk.location}</p>
      </div>
      <div className='talkDesc'>
        <p>{talk.description}</p>
      </div>
      <div className='talkSpeakers'>
        {talk.speakers.map((speaker, i) => {
          return (<p key={i}>{speaker}</p>)
        })}
      </div>
    </div>
  )}
}