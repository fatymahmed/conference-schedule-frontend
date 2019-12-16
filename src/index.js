import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore} from 'redux';
import rootReducer from './reducers/index';
import './index.css';
import App from './components/app';

// [{ title,start time, end time,speakers[],location,description}]
const initialTalks = [{
  title: "Opening speech",
  startTime: '23:40 PM',
  endTime: "24:00 PM",
  speakers: ['fatima', 'ahmed', 'muhsin'],
  location: 'mombasa',
  description: "a great event for the schedule",
},
{
  title: "Lets talk",
  startTime: '03:40 PM',
  endTime: "04:00 PM",
  speakers: ['fatima', 'ahmed', 'muhsin'],
  location: 'NY',
  description: "a great event for the schedule",
},
{
  title: "closing speech",
  startTime: '13:40 PM',
  endTime: "14:00 PM",
  speakers: ['fatima', 'ahmed', 'muhsin'],
  location: 'nairobi',
  description: "a great event for the closing",
},
];
const store = createStore(rootReducer, { talks: initialTalks, schedules: [], user: {}});

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root'));
