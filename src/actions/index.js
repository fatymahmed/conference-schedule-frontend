const ADD_TALKS = 'add_talks';
const REMOVE_TALK = 'remove_talk';
const PROCESSING = 'processing';
const FETCH_SUCCESS = 'fetch_success';
const FETCH_ERROR = 'fetch_error';
const STORE_USER = 'store_user';

const storeUser = user => ({
  type: STORE_USER,
  user,
});

const addTalks = talks => ({
  type: ADD_TALKS,
  talks,
});

const removeTalk = id => ({
  type: REMOVE_TALK,
  id,
});

const fetchSuccess = () => ({
  type: FETCH_SUCCESS,
});

const fetchFailure = () => ({
  type: FETCH_ERROR,
});

const fetchOnGoing = () => ({
  type: PROCESSING,
});

export {
  addTalks,
  removeTalk,
  fetchFailure,
  fetchOnGoing,
  fetchSuccess,
  ADD_TALKS,
  REMOVE_TALK,
  storeUser,
  STORE_USER,
};
