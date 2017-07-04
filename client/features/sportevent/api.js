import request from 'utils/request';

export const getEventById = (accessCode) => {
  return request.get(`http://localhost:57851/api/values/geteventsbyuser/${accessCode}`);
};


export const getAllEvents = (accessCode) => {
  return request.get(`http://localhost:57851/api/values/allevents/${accessCode}`);
};

// export const createTemplate = (payload) => {
//   return request.post('document/createTemplate', payload);
// };
