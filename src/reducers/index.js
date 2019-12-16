import { combineReducers } from 'redux';
import talks from './talks';
import apis from './api-call';
import schedules from './schedules';
import user from './user';

const rootReducer = combineReducers({ talks, schedules, apis, user });

export default rootReducer;
