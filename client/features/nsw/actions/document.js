import * as ActionTypes from './actionTypes';
import createAction from 'utils/createAction';

export const solicitorUpdateSection = createAction(ActionTypes.SOLICITOR_UPDATE_SECTION);
export const solicitorUpdateSectionSuccess = createAction(ActionTypes.SOLICITOR_UPDATE_SECTION_SUCCESS);
export const solicitorUpdateSectionFail = createAction(ActionTypes.SOLICITOR_UPDATE_SECTION_FAIL);

// export const solicitorEditableSection = createAction(ActionTypes.SOLICITOR_EDITABLE_SECTION);

export const solicitorAcceptSection = createAction(ActionTypes.SOLICITOR_ACCEPT_SECTION);
export const solicitorAcceptSectionSuccess = createAction(ActionTypes.SOLICITOR_ACCEPT_SECTION_SUCCESS);
export const solicitorAcceptSectionFail = createAction(ActionTypes.SOLICITOR_ACCEPT_SECTION_FAIL);

export const solicitorRejectSection = createAction(ActionTypes.SOLICITOR_REJECT_SECTION);
export const solicitorRejectSectionSuccess = createAction(ActionTypes.SOLICITOR_REJECT_SECTION_SUCCESS);
export const solicitorRejectSectionFail = createAction(ActionTypes.SOLICITOR_REJECT_SECTION_FAIL);

export const solicitorCounterOfferSection = createAction(ActionTypes.SOLICITOR_COUNTEROFFER_SECTION);
export const solicitorCounterOfferSectionSuccess = createAction(ActionTypes.SOLICITOR_COUNTEROFFER_SECTION_SUCCESS);
export const solicitorCounterOfferSectionFail = createAction(ActionTypes.SOLICITOR_COUNTEROFFER_SECTION_FAIL);

export const solicitorAddUndoneSection = createAction(ActionTypes.SOLICITOR_ADD_UNDONE_SECTION);
export const solicitorRemoveUndoneSection = createAction(ActionTypes.SOLICITOR_REMOVE_UNDONE_SECTION);

export const showContractViewModal = createAction(ActionTypes.SHOW_CONTRACT_VIEW_MODAL);
export const hideContractViewModal = createAction(ActionTypes.HIDE_CONTRACT_VIEW_MODAL);

export const saveCommentAndUpdateStatus = createAction(ActionTypes.SAVE_COMMENT_AND_CHANGE_STATUS);
export const saveCommentAndUpdateStatusSuccess = createAction(ActionTypes.SAVE_COMMENT_AND_CHANGE_STATUS_SUCCESS);
export const saveCommentAndUpdateStatusFail = createAction(ActionTypes.SAVE_COMMENT_AND_CHANGE_STATUS_FAIL);

export const showCommentModal = createAction(ActionTypes.SHOW_COMMENT_MODAL);
export const showCommentModalSuccess = createAction(ActionTypes.SHOW_COMMENT_MODAL_SUCCESS);
export const showCommentModalFail = createAction(ActionTypes.SHOW_COMMENT_MODAL_FAIL);
export const hideCommentModal = createAction(ActionTypes.HIDE_COMMENT_MODAL);

export const saveComment = createAction(ActionTypes.SAVE_COMMENT);
export const saveCommentSuccess = createAction(ActionTypes.SAVE_COMMENT_SUCCESS);
export const saveCommentFail = createAction(ActionTypes.SAVE_COMMENT_FAIL);

export const showUserActivityModal = createAction(ActionTypes.SHOW_USER_ACTIVITY_MODAL);
export const showUserActivityModalSuccess = createAction(ActionTypes.SHOW_USER_ACTIVITY_MODAL_SUCCESS);
export const showUserActivityModalFail = createAction(ActionTypes.SHOW_USER_ACTIVITY_MODAL_FAIL);
export const hideUserActivityModal = createAction(ActionTypes.HIDE_USER_ACTIVITY_MODAL);
