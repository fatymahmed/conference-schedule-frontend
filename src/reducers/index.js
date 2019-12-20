import { combineReducers } from 'redux';
import talks from './talks';
import apis from './api-call';
import user from './user';

const rootReducer = combineReducers({
  talks, apis, user,
});

export default rootReducer;
