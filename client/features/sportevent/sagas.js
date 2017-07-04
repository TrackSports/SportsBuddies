import { takeLatest } from 'redux-saga';
import simpleSaga from 'utils/simpleSaga';
import * as actionTypes from 'features/sportevent/actions/actionTypes';
import * as ev from 'features/sportevent/actions/eventDetailAction';
import * as api from './api';


export const getAllRelatedEvent = simpleSaga.bind(null, ev.getAllRelatedEventSuccess, ev.getAllRelatedEventFail, api.getEventById);
// export const updateTemplate = simpleSaga.bind(null, vs.updateTemplateSuccess, vs.updateTemplateFail, api.updateTemplate);

export default [
  takeLatest(actionTypes.GET_ALL_RELEATED_EVENT, getAllRelatedEvent)
  // takeLatest(actionTypes.CREATE_TEMPLATE, createTemplate),

];
