import { ADD_SCHEDULES } from '../actions/index';

const schedules = (state = [], action) => {
  switch (action.type) {
    case ADD_SCHEDULES:
      return action.schedules;
    default:
      return state;
  }
};

export default schedules;
