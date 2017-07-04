import * as ActionTypes from './actionTypes';
import createAction from 'utils/createAction';

export const showEventDetail = createAction(ActionTypes.SHOW_EVENT_DETAIL);
export const getAllRelatedEvent = createAction(ActionTypes.GET_ALL_RELEATED_EVENT);
