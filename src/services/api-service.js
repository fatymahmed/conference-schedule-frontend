const get = (onSuccess, onError, apiURL) => {
  fetch('http://localhost:3001/talks', {method: 'GET'}).then(result => result.json())
  .then((result) => {
    console.log(result);
    if (result.error) {
      onError();
    }
    else {
      onSuccess(result);
    }
  }).catch(error => onError(error));
};

const post = ( onSuccess, onError, data, apiURL) => {
  fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(data),
  }).then(result => result.json())
  .then((result) => {
    if (result.error) {
      onError();
    } else {
      onSuccess(result);
    }
  }).catch(error => onError(error));
};

const remove = (onSuccess, onError, apiURL) => {
  fetch(apiURL, {method: 'DELETE'}).then(result => result.json())
  .then((result) => {
    if (result.error) {
      onError();
    }
    else {
      onSuccess(result);
    }
  }).catch(error => onError(error));
};

export {
  post,
  get,
  remove,
}