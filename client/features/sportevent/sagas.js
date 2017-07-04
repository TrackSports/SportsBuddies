import { takeLatest } from 'redux-saga';
import simpleSaga from 'utils/simpleSaga';
import * as actionTypes from 'features/sportevent/actions/actionTypes';
import * as ev from 'features/sportevent/actions/eventDetailAction';
import * as tv from 'features/sportevent/actions/toolbarAction';
import * as api from './api';


export const getAllRelatedEvent = simpleSaga.bind(null, ev.getAllRelatedEventSuccess, ev.getAllRelatedEventFail, api.getEventById);
export const getAllEvents = simpleSaga.bind(null, tv.getEventListSuccess, tv.getEventListFail, api.getAllEvents);

export default [
  takeLatest(actionTypes.GET_ALL_RELEATED_EVENT, getAllRelatedEvent),
  takeLatest(actionTypes.GET_EVENT_LIST, getAllEvents)

];
