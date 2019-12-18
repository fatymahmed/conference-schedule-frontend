import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Talk from './talk';
import { fetchOnGoing, fetchSuccess, storeSchedules } from '../actions/index';
import { get } from '../services/api-service';

class Schedules extends React.Component {
  constructor(props) {
    super(props);
    this.onFetchSuccess = this.onFetchSuccess.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  onFetchSuccess(data) {
    const { fetchSuccess, storeSchedules } = this.props;
    fetchSuccess();
    storeSchedules(data);
  }

  handleLogin() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { fetchOnGoing, handleLogout } = this.props;
    const { schedules, user } = this.props;
    if (Object.keys(user).length === 0) {
      return (
        <div>
          <p style={{ paddingTop: 20, textAlign: 'center' }}>Please log in to view your schedule</p>
          <button className="button" type="submit" onClick={this.handleLogin}>Log in</button>
        </div>

      );
    }

    fetchOnGoing();
    get(this.onFetchSuccess, () => {}, `https://events-scheduler-api.herokuapp.com/${user.id}/schedules`);
    return (
      <div style={{textAlign: 'center'}}>
        <button className="button" type="submit" onClick={handleLogout}>Logout</button>
        {schedules.map(talk => (
          <Talk
            key={talk.title}
            talk={talk}
            user={user}
          />
        ))}
      </div>
    );
  }
}

Schedules.propTypes = {
  fetchOnGoing: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  storeSchedules: PropTypes.func.isRequired,
  fetchSuccess: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  schedules: PropTypes.instanceOf(Array).isRequired,
  user: PropTypes.objectOf(PropTypes.object).isRequired,

};

const mapStateToProps = state => ({
  schedules: state.schedules,
});
const mapDispatchToProps = dispatch => ({
  fetchOnGoing: () => dispatch(fetchOnGoing()),
  fetchSuccess: () => dispatch(fetchSuccess()),
  storeSchedules: schedules => dispatch(storeSchedules(schedules)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedules);
