import React from 'react';
import { connect } from 'react-redux';
import Talk from './talk';

const Talks = (props) => {
  const { talks } = props;
  console.log(talks);
  return ( talks.map( talk => 
    <Talk key={talk.title.slice(0,4)} talk={talk}/>)) 
}

const mapStateToProps = (state) => ({
  talks: state.talks,
});

export default connect(mapStateToProps)(Talks);