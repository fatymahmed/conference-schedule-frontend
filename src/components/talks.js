import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Talk from './talk';
import { fetchFailure, fetchOnGoing, fetchSuccess,addTalks } from '../actions/index'; 
import { get } from '../services/api-service';

class Talks extends React.Component{
  constructor(props){
    super(props);
  this.onFetchFailure = this.onFetchFailure.bind(this);
  this.onFetchSuccess = this.onFetchSuccess.bind(this);
  }

componentDidMount() {
  const { fetchOnGoing } = this.props;
  fetchOnGoing();
  get(this.onFetchSuccess, this.onFetchFailure);
}

onFetchSuccess(data) {
  const { fetchSuccess, addTalks } = this.props;
  fetchSuccess();
  addTalks(data);
}

onFetchFailure(error) {
  const { fetchFailure } = this.props;
  fetchFailure();
}
render() {
  const { talks } =this.props
  return ( talks.map( talk => 
    <Talk key={talk.title.slice(0,4)} talk={talk}/>)) 
  };
};

const mapStateToProps = (state) => ({
  talks: state.talks,
  // apis: state.apis,
});

const mapDispatchToProps = dispatch => ({
  fetchOnGoing: () => dispatch(fetchOnGoing()),
  fetchFailure: () => dispatch(fetchFailure()),
  fetchSuccess: () => dispatch(fetchSuccess()),
  addTalks: talks => dispatch(addTalks(talks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Talks);