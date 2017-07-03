import * as ActionTypes from 'features/sportevent/actions/actionTypes';
import createReducer from 'utils/createReducer';

const InitialState = {
  isShowEventListModal: false,
  eventList: [],
  newEvent: {}
};


export default createReducer(InitialState, Object.assign(
  {
    [ActionTypes.GET_EVENT_LIST]: (state) => {
      const newEventList = [
        {
          name: 'football',
          location: 'domain',
          time: '12/07/2017',
          isJoined: false
        },
        {
          name: 'basketball',
          location: 'domain',
          time: '12/08/2017',
          isJoined: false
        },
        {
          name: 'netball',
          location: 'domain',
          time: '12/07/2017',
          isJoined: true
        }
      ];
      return { ...state, isShowEventListModal: true, eventList: newEventList };
    },
    [ActionTypes.HIDE_EVENT_LIST_MODAL]: (state) => {
      return { ...state, isShowEventListModal: false };
    },

    [ActionTypes.CREATE_EVENT]: (state) => {
      return { ...state };
    }

  }));
