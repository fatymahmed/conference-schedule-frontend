const ADD_TALKS = 'add_talks';
const REMOVE_TALK = 'remove_talk';
const PROCESSING = 'processing';
const FETCH_SUCCESS = 'fetch_success';
const FETCH_ERROR = 'fetch_error';
const ADD_SCHEDULES = 'add_schedules';
const REMOVE_SCHEDULE = 'remove_schedule';

const addTalks = talks => ({
  type: ADD_TALKS,  
  talks,
})

const removeTalk = id => ({
  type: REMOVE_TALK,
  id,
})

const addSchedules = schedule => ({
  type: ADD_SCHEDULES,  
  schedule,
})

const removeSchedule = id => ({
  type: REMOVE_SCHEDULE,
  id,
})
const fetchSuccess = () => ({
  type: FETCH_SUCCESS,
})

const fetchFailure = () => ({
  type: FETCH_ERROR,
})

const fetchOnGoing = () => ({
  type: PROCESSING,
})

export {
  addTalks,
  removeTalk,
  fetchFailure,
  fetchOnGoing,
  fetchSuccess,
  ADD_TALKS,
  REMOVE_TALK,
  addSchedules,
  removeSchedule,
}