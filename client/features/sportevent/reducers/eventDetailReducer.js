import * as ActionTypes from 'features/sportevent/actions/actionTypes';
import createReducer from 'utils/createReducer';

const InitialState = {
  eventList: [
    {
      id: '1',
      name: 'football',
      location: 'domain',
      category: 'football',
      weekday: 'monday',
      startTime: '10:00',
      duration: '50 mins',
      isJoined: true,
      members: ['grave', 'dan', 'rosey']

    },
    {
      id: '2',
      name: 'basketball',
      location: 'domain',
      category: 'basketball',
      weekday: 'monday',
      startTime: '10:00',
      duration: '50 mins',
      isJoined: true,
      members: ['rui', 'kristry', 'joel']
    },
    {
      id: '3',
      name: 'netball',
      location: 'domain',
      category: 'netball',
      weekday: 'monday',
      startTime: '10:00',
      duration: '50 mins',
      isJoined: true,
      members: ['xinxin', 'dan', 'rosey']
    }
  ],
  selectedEvent: {}
};


export default createReducer(InitialState, Object.assign(
  {
    [ActionTypes.SHOW_EVENT_DETAIL]: (state, action) => {
      const eventId = action.payload.eventId;
      const choosenEvent = state.eventList.filter((event) => { return event.id === eventId; })[0];
      return { ...state, selectedEvent: choosenEvent };
    },
    [ActionTypes.GET_ALL_RELEATED_EVENT]: (state, action) => {
      const accessCode = action.payload;
      // let eventListAssignedToYou = [];
      // $.get(`http://localhost:57851/api/values/geteventsbyuser/${accessCode}`, null,
      //   function(data) {
      //     if (data) {
      //       eventListAssignedToYou = data;
      //       return { ...state, eventList: eventListAssignedToYou };
      //     }
      //   });
         
      return { ...state };
    }


  }));
