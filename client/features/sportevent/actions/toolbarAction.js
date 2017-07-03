import * as ActionTypes from './actionTypes';
import createAction from 'utils/createAction';

export const searchAllEvent = createAction(ActionTypes.SEARCH_ALL_EVENT);
export const getEventList = createAction(ActionTypes.GET_EVENT_LIST);
export const closeEventList = createAction(ActionTypes.HIDE_EVENT_LIST_MODAL);
