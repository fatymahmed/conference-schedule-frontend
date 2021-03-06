import React from 'react';
import PropTypes from 'prop-types';
import Talk from './talk';
import { get } from '../services/api-service';
import { apiURL } from './helper';
import HeaderTalks from './headerTalks';

export default class Schedules extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      schedules: [],
    });
    this.onFetchSuccess = this.onFetchSuccess.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    get(this.onFetchSuccess, () => {}, `${apiURL}users/${user.id}/schedules`);
  }

  onFetchSuccess(data) {
    this.setState({
      schedules: data,
    });
  }

  handleLogin() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { schedules } = this.state;
    const { handleLogout, location, history } = this.props;
    const { user } = this.props;
    if (Object.keys(user).length === 0) {
      return (
        <div>
          <p style={{ paddingTop: 20, textAlign: 'center' }}>Please log in to view your schedule</p>
          <button className="button" type="submit" onClick={this.handleLogin}>Log in</button>
        </div>

      );
    }

    return (
      <div className="text-center">
        <HeaderTalks title="My Schedule" />
        <button className="button" type="submit" onClick={handleLogout}>Logout</button>
        <div className="talks">
          {schedules.map(talk => (
            <Talk
              key={talk.title}
              talk={talk}
              user={user}
              location={location}
              history={history}
              onFetchSuccess={this.onFetchSuccess}
            />
          ))}
        </div>
      </div>
    );
  }
}

Schedules.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  location: PropTypes.objectOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(PropTypes.object).isRequired,

};
