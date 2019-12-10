const ADD_TALKS = 'add_talks';
const REMOVE_TALK = 'remove_talk';
const PROCESSING = 'processing';
const FETCH_SUCCESS = 'fetch_success';
const FETCH_ERROR = 'fetch_error';

const addTalks = talks => ({
  type: ADD_TALKS,  
  talks,
})

const removeTalk = id => ({
  type: REMOVE_TALK,
  id,
})

const fetchSuccess = () => ({
  type: FETCH_SUCCESS,
})

const fetchError = () => ({
  type: FETCH_ERROR,
})

const fetchOngoing = () => ({
  type: PROCESSING,
})

export {
  addTalks,
  removeTalk,
  fetchError,
  fetchOngoing,
  fetchSuccess,
}