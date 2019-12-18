import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore} from 'redux';
import rootReducer from './reducers/index';
import './index.css';
import App from './components/app';

const store = createStore(rootReducer, { talks: [], schedules: [], user: {}});

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root'));
