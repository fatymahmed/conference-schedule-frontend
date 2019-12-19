import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Talk from './talk';
import HeaderTalks from './headerTalks';
import {
  fetchFailure, fetchOnGoing, fetchSuccess, addTalks,
} from '../actions/index';
import { get } from '../services/api-service';

class Talks extends React.Component {
  constructor(props) {
    super(props);
    this.onFetchFailure = this.onFetchFailure.bind(this);
    this.onFetchSuccess = this.onFetchSuccess.bind(this);
    this.mySchedule = this.mySchedule.bind(this);
  }

  componentDidMount() {
    const { fetchOnGoing } = this.props;
    fetchOnGoing();
    get(this.onFetchSuccess, this.onFetchFailure, 'https://events-scheduler-api.herokuapp.com/talks');
  }

  onFetchSuccess(data) {
    const { fetchSuccess, addTalks } = this.props;
    fetchSuccess();
    addTalks(data.data);
  }

  onFetchFailure(error) {
    const { fetchFailure } = this.props;
    fetchFailure(error);
  }

  mySchedule() {
    const { history } = this.props;
    history.push('/schedule');
  }

  handleClick(talk) {
    const { history } = this.props;
    const talkInfo = talk;
    history.push({ pathname: '/talk', state: { talk: talkInfo } });
  }

  render() {
    const { talks, user } = this.props;
    return (
      <div>
        <HeaderTalks title="Talks" />
        <button type="submit" style={{ display: 'block', margin: 'auto' }} onClick={this.mySchedule}>My schedule</button>
        <div style={{ backgroundColor: '#F8F8FF', textAlign: 'center' }}>
          {talks.map(talk => (
            <Talk
              onClick={i => this.handleClick(i)}
              key={talk.title}
              talk={talk}
              user={user}
            />
          ))}
        </div>
      </div>

    );
  }
}

Talks.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  talks: PropTypes.instanceOf(Array).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  fetchOnGoing: PropTypes.func.isRequired,
  addTalks: PropTypes.func.isRequired,
  fetchSuccess: PropTypes.func.isRequired,
  fetchFailure: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  talks: state.talks,
});

const mapDispatchToProps = dispatch => ({
  fetchOnGoing: () => dispatch(fetchOnGoing()),
  fetchFailure: () => dispatch(fetchFailure()),
  fetchSuccess: () => dispatch(fetchSuccess()),
  addTalks: talks => dispatch(addTalks(talks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Talks);
