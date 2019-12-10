const PROCESSING = 'PROCESSING';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_ERROR = 'FETCH_ERROR';

const apis = (state = 'processing', action) => {
  switch (action.type) {
    case PROCESSING:
      return 'processing';
    case FETCH_ERROR:
      return 'error';
    case FETCH_SUCCESS:
      return 'success';
    default:
      return state;
  }
};

export default apis;