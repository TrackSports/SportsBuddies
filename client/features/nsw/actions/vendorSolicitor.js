import * as ActionTypes from './actionTypes';
import createAction from 'utils/createAction';

export const getVendorSolicitorDocument = createAction(ActionTypes.GET_VENDORSOLICITOR_DOCUMENT);
export const getVendorSolicitorDocumentSuccess = createAction(ActionTypes.GET_VENDORSOLICITOR_DOCUMENT_SUCCESS);
export const getVendorSolicitorDocumentFail = createAction(ActionTypes.GET_VENDORSOLICITOR_DOCUMENT_FAIL);

export const createTemplate = createAction(ActionTypes.CREATE_TEMPLATE);
export const createTemplateSuccess = createAction(ActionTypes.CREATE_TEMPLATE_SUCCESS);
export const createTemplateFail = createAction(ActionTypes.CREATE_TEMPLATE_FAIL);
export const createAnotherNewTemplate = createAction(ActionTypes.CREATE_ANOTHER_TEMPLATE);

export const showUpdateTemplate = createAction(ActionTypes.SHOW_UPDATE_TEMPLATE_MODAL);
export const showUpdateTemplateSuccess = createAction(ActionTypes.SHOW_UPDATE_TEMPLATE_MODAL_SUCCESS);
export const showUpdateTemplateFail = createAction(ActionTypes.SHOW_UPDATE_TEMPLATE_MODAL_FAIL);
export const closeUpdateTemplate = createAction(ActionTypes.CLOSE_UPDATE_TEMPLATE_MODAL);

export const updateTemplate = createAction(ActionTypes.UPDATE_TEMPLATE);
export const updateTemplateSuccess = createAction(ActionTypes.UPDATE_TEMPLATE_SUCCESS);
export const updateTemplateFail = createAction(ActionTypes.UPDATE_TEMPLATE_FAIL);

export const showTemplateModal = createAction(ActionTypes.SHOW_TEMPLATE_MODAL);
export const showTemplateModalSuccess = createAction(ActionTypes.SHOW_TEMPLATE_MODAL_SUCCESS);
export const showTemplateModalFail = createAction(ActionTypes.SHOW_TEMPLATE_MODAL_FAIL);

export const resetTemplateId = createAction(ActionTypes.RESET_TEMPLATE_ID);

export const closeTemplateModal = createAction(ActionTypes.CLOSE_TEMPLATE_MODAL);

export const showTemplateNameModal = createAction(ActionTypes.SHOW_TEMPLATE_NAME_MODAL);
export const hideTemplateNameModal = createAction(ActionTypes.HIDE_TEMPLATE_NAME_MODAL);

export const sendToPurchaserSolicitor = createAction(ActionTypes.SEND_TO_PURCHASERSOLICITOR);
export const sendToPurchaserSolicitorSuccess = createAction(ActionTypes.SEND_TO_PURCHASERSOLICITOR_SUCCESS);
export const sendToPurchaserSolicitorFail = createAction(ActionTypes.SEND_TO_PURCHASERSOLICITOR_FAIL);

export const importTemplate = createAction(ActionTypes.IMPORT_TEMPLATE);

export const vendorSolicitorCompleteDocument = createAction(ActionTypes.VENDORSOLICITOR_COMPLETE_DOCUMENT);
export const vendorSolicitorCompleteDocumentSuccess = createAction(ActionTypes.VENDORSOLICITOR_COMPLETE_DOCUMENT_SUCCESS);
export const vendorSolicitorCompleteDocumentFail = createAction(ActionTypes.VENDORSOLICITOR_COMPLETE_DOCUMENT_FAIL);

// for demo only
export const getDemoDocument = createAction(ActionTypes.DEMO_NEW);
export const getDemoDocumentSuccess = createAction(ActionTypes.DEMO_NEW_SUCCESS);
