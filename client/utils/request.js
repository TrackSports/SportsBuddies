import { camelizeKeys } from 'humps';

function makePromise(url, options) {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error('There is no URL provided for the request.'));
    }

    if (!options) {
      reject(new Error('There are no options provided for the request.'));
    }

    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          return reject(response);
        }
        return response;
      })
      .then(response => response.json())
      .then(response => {
        // todo: consider handle custom errors?
        // if (response.status >= 200 && response.status < 300) {
        //   return response.error ? reject(response.error) : resolve(response);
        // }
        return resolve(camelizeKeys(response));
      })
      .catch(error => {
        reject(error);
      });
  });
}

function createDefaultOptions() {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  return {
    headers
  };
}

function buildUrl(path) {
  // if (path.indexOf('http') === -1  path.indexOf('https') === -1) {
  //   return path;
  // }

  // return `${path}`;

  const baseUrl = window.API_BASE || ''; // this can be changed
  if (path.indexOf('?') > 0) {
    return `${baseUrl}/api/${path}&nocache=${Math.random()}`;
  }
  return `${baseUrl}/api/${path}?nocache=${Math.random()}`;


  // return `${path}?nocache=${Math.random()}`;
}

export default {
  post: (path, body, options = {}) => makePromise(buildUrl(path), {
    ...options,
    ...createDefaultOptions(),
    method: 'post',
    body: JSON.stringify(body)
  }),

  get: (path, options = {}) => makePromise(buildUrl(path), {
    ...options,
    ...createDefaultOptions(),
    method: 'get'
  }),

  put: (path, body, options = {}) => makePromise(buildUrl(path), {
    ...options,
    ...createDefaultOptions(),
    method: 'put',
    body: JSON.stringify(body)
  }),

  delete: (path, body, options = {}) => makePromise(buildUrl(path), {
    ...options,
    ...createDefaultOptions(),
    method: 'delete',
    body: JSON.stringify(body)
  })
};
