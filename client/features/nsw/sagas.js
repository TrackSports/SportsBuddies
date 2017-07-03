import { takeLatest } from 'redux-saga';
import simpleSaga from 'utils/simpleSaga';
import complexSaga from 'utils/complexSaga';
import * as vs from 'features/nsw/actions/vendorSolicitor';
import * as ps from 'features/nsw/actions/purchaserSolicitor';
import * as document from 'features/nsw/actions/document';
import * as actionTypes from 'features/nsw/actions/actionTypes';
import * as api from './api';


export const createTemplate = simpleSaga.bind(null, vs.createTemplateSuccess, vs.createTemplateFail, api.createTemplate);
export const updateTemplate = simpleSaga.bind(null, vs.updateTemplateSuccess, vs.updateTemplateFail, api.updateTemplate);
export const getTemplateRecords = simpleSaga.bind(null, vs.showTemplateModalSuccess, vs.showTemplateModalFail, api.getTemplate);
export const sendToPurchaserSolicitor = simpleSaga.bind(null, vs.sendToPurchaserSolicitorSuccess, vs.sendToPurchaserSolicitorFail, api.sendToPurchaserSolicitor);
export const getActivities = simpleSaga.bind(null, document.showUserActivityModalSuccess, document.showUserActivityModalFail, api.getActivities);

export const getPurchaserSolicitorDocument = complexSaga.bind(null, [ps.getPurchaserSolicitorDocumentSuccess, document.solicitorAddUndoneSection], ps.getPurchaserSolicitorDocumentFail, api.getPurchaserSolicitorDocument);
export const getVendorSolicitorDocument = complexSaga.bind(null, [vs.getVendorSolicitorDocumentSuccess, document.solicitorAddUndoneSection], vs.getVendorSolicitorDocumentFail, api.getVendorSolicitorDocument);
export const vendorSolicitorCompleteDocument = simpleSaga.bind(null, vs.vendorSolicitorCompleteDocumentSuccess, vs.vendorSolicitorCompleteDocumentFail, api.vendorSolicitorCompleteDocument);

// document sections
export const solicitorUpdateSection = simpleSaga.bind(null, document.solicitorUpdateSectionSuccess, document.solicitorUpdateSectionFail, api.solicitorUpdateSection);
export const solicitorAcceptSection = simpleSaga.bind(null, document.solicitorAcceptSectionSuccess, document.solicitorAcceptSectionFail, api.solicitorAcceptSection);
export const solicitorRejectSection = simpleSaga.bind(null, document.solicitorRejectSectionSuccess, document.solicitorRejectSectionFail, api.solicitorRejectSection);
export const solicitorCounterOfferSection = simpleSaga.bind(null, document.solicitorCounterOfferSectionSuccess, document.solicitorCounterOfferSectionFail, api.solicitorCounterOfferSection);
export const saveCommentAndUpdateStatus = complexSaga.bind(null, [document.saveCommentAndUpdateStatusSuccess, document.solicitorRejectSection], document.saveCommentAndUpdateStatusFail, api.saveComment);
export const getComments = simpleSaga.bind(null, document.showCommentModalSuccess, document.showCommentModalFail, api.getComments);
export const saveComment = simpleSaga.bind(null, document.saveCommentSuccess, document.saveCommentFail, api.saveComment);

// purchaser solicitor
export const purchaserSolicitorAcceptInitSP = simpleSaga.bind(null, ps.purchaserSolicitorAcceptInitSPSuccess, ps.purchaserSolicitorAcceptInitSPFail, api.purchaserSolicitorAcceptInitSpecialCondition);
export const purchaserSolicitorRejectInitSP = simpleSaga.bind(null, ps.purchaserSolicitorRejectInitSPSuccess, ps.purchaserSolicitorRejectInitSPFail, api.purchaserSolicitorRejectInitSpecialCondition);
export const purchaserSolicitorFinishReview = simpleSaga.bind(null, ps.purchaserSolicitorFinishReviewSuccess, ps.purchaserSolicitorFinishReviewFail, api.purchaserSolicitorFinishReview);
export const purchaserSolicitorAcceptRejection = simpleSaga.bind(null, ps.purchaserSolicitorAcceptRejectionSuccess, ps.purchaserSolicitorAcceptRejectionFail, api.solicitorUpdateSection);


export const getdemoDocument = simpleSaga.bind(null, vs.getDemoDocumentSuccess, vs.getVendorSolicitorDocumentFail, api.getdemoDocument);

export default [
  // takeLatest(actionTypes.GET_DOCUMENT, createTemplate),
  takeLatest(actionTypes.CREATE_TEMPLATE, createTemplate),
  takeLatest(actionTypes.SHOW_TEMPLATE_MODAL, getTemplateRecords),
  takeLatest(actionTypes.UPDATE_TEMPLATE, updateTemplate),
  takeLatest(actionTypes.SEND_TO_PURCHASERSOLICITOR, sendToPurchaserSolicitor),
  takeLatest(actionTypes.VENDORSOLICITOR_COMPLETE_DOCUMENT, vendorSolicitorCompleteDocument),

  takeLatest(actionTypes.GET_PURCHASERSOLICITOR_DOCUMENT, getPurchaserSolicitorDocument),
  takeLatest(actionTypes.GET_VENDORSOLICITOR_DOCUMENT, getVendorSolicitorDocument),
  takeLatest(actionTypes.SOLICITOR_ACCEPT_SECTION, solicitorAcceptSection),
  takeLatest(actionTypes.SOLICITOR_REJECT_SECTION, solicitorRejectSection),
  takeLatest(actionTypes.SOLICITOR_COUNTEROFFER_SECTION, solicitorCounterOfferSection),
  takeLatest(actionTypes.SOLICITOR_UPDATE_SECTION, solicitorUpdateSection),

  takeLatest(actionTypes.PURCHASERSOLICITOR_ACCEPT_INITSPECIALCONDITION, purchaserSolicitorAcceptInitSP),
  takeLatest(actionTypes.PURCHASERSOLICITOR_REJECT_INITSPECIALCONDITION, purchaserSolicitorRejectInitSP),
  takeLatest(actionTypes.PURCHASERSOLICITOR_FINISH_REVIEW, purchaserSolicitorFinishReview),
  takeLatest(actionTypes.PURCHASERSOLICITOR_ACCEPT_REJECTION, purchaserSolicitorAcceptRejection),

  takeLatest(actionTypes.SAVE_COMMENT_AND_CHANGE_STATUS, saveCommentAndUpdateStatus),
  takeLatest(actionTypes.SHOW_COMMENT_MODAL, getComments),
  takeLatest(actionTypes.SAVE_COMMENT, saveComment),
  takeLatest(actionTypes.SHOW_USER_ACTIVITY_MODAL, getActivities),

  // demo only
  takeLatest(actionTypes.DEMO_NEW, getdemoDocument)
];
