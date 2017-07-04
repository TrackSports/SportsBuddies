import * as ActionTypes from './actionTypes';
import createAction from 'utils/createAction';

export const showEventDetail = createAction(ActionTypes.SHOW_EVENT_DETAIL);
export const getAllRelatedEvent = createAction(ActionTypes.GET_ALL_RELEATED_EVENT);
export const getAllRelatedEventSuccess = createAction(ActionTypes.GET_ALL_RELEATED_EVENT_SUCCESS);
export const getAllRelatedEventFail = createAction(ActionTypes.GET_ALL_RELEATED_EVENT_FAIL);
