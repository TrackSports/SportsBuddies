import * as ActionTypes from 'features/sportevent/actions/actionTypes';
import createReducer from 'utils/createReducer';

const InitialState = {
  isShowEventListModal: false,
  isShowNewEventModal: false,
  eventList: [
    {
      id: '1',
      name: 'football',
      location: 'domain',
      category: 'football',
      weekday: 'monday',
      startTime: '10:00',
      duration: '50 mins',
      isJoined: false
    },
    {
      id: '2',
      name: 'basketball',
      location: 'domain',
      category: 'basketball',
      weekday: 'monday',
      startTime: '10:00',
      duration: '50 mins',
      isJoined: false
    },
    {
      id: '3',
      name: 'netball',
      location: 'domain',
      category: 'netball',
      weekday: 'monday',
      startTime: '10:00',
      duration: '50 mins',
      isJoined: true
    }
  ],
  newEvent: {}
};


export default createReducer(InitialState, Object.assign(
  {
    [ActionTypes.GET_EVENT_LIST]: (state) => {
      return { ...state, isShowEventListModal: true };
    },
    [ActionTypes.HIDE_EVENT_LIST_MODAL]: (state) => {
      return { ...state, isShowEventListModal: false };
    },
    [ActionTypes.CREATE_EVENT]: (state) => {
      return { ...state, isShowNewEventModal: true };
    },
    [ActionTypes.CREATE_EVENT_SUCCESS]: (state, action) => {
      return { ...state, eventList: state.eventList.concat(action.payload), isShowNewEventModal: false };
    },
    [ActionTypes.HIDE_EVENT_LIST_MODAL]: (state) => {
      return { ...state, isShowEventListModal: false };
    },
    [ActionTypes.HIDE_NEW_EVENT_MODAL]: (state) => {
      return { ...state, isShowNewEventModal: false };
    },
    [ActionTypes.JOIN_EVENT]: (state, action) => {
      const eventId = action.payload.eventId;
      const newEventlist = state.eventList.map((event) => {
        return event.id === eventId ? { ...event, isJoined: true } : event;
      });
      return { ...state, eventList: newEventlist };
    }

  }));
