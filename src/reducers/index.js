import { combineReducers } from 'redux';
import talks from './talks';
import apis from './api-call';

const rootReducer = combineReducers({ talks, apis });

export default rootReducer;
