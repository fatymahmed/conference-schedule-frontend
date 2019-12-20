const get = (onSuccess, onError, apiURL) => {
  fetch(apiURL, { method: 'GET' }).then(result => result.json())
    .then((result) => {
      if (result.error) {
        onError();
      } else {
        onSuccess(result);
      }
    }).catch(error => onError(error));
};

const get1 = (apiURL) => {
  fetch(apiURL, { method: 'GET' }).then(result => result.json())
    .then((result) => {
      if (result.error) {
        console.log(result.error);
      } else {
        return result;
      }
    }).catch(error => console.log(error));
};

const post = (onSuccess, onError, data, apiURL) => {
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
  fetch(apiURL, { method: 'DELETE' }).then(result => result.json())
    .then((result) => {
      if (result.error) {
        onError();
      } else {
        onSuccess(result);
      }
    }).catch(error => onError(error));
};

export {
  post,
  get,
  get1,
  remove,
};
