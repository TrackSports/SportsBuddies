import * as ActionTypes from './actionTypes';
import createAction from 'utils/createAction';

export const searchAllEvent = createAction(ActionTypes.SEARCH_ALL_EVENT);
export const getEventList = createAction(ActionTypes.GET_EVENT_LIST);
export const closeEventList = createAction(ActionTypes.HIDE_EVENT_LIST_MODAL);
export const createEvent = createAction(ActionTypes.CREATE_EVENT);
export const createEventSuccess = createAction(ActionTypes.CREATE_EVENT_SUCCESS);
export const closeNewEventModal = createAction(ActionTypes.HIDE_NEW_EVENT_MODAL);
export const joinEvent = createAction(ActionTypes.JOIN_EVENT);
