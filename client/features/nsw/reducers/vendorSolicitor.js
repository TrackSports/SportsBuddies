import * as ActionTypes from 'features/nsw/actions/actionTypes';
import createReducer from 'utils/createReducer';

const InitialState = {
  documentId: 0,
  documentStatus: '',
  documentType: '',  // this is for demo only
  isLoading: true,
  showTemplateModal: false,
  showUpdateTemplateModal: false,
  isShowTemplateNameModal: false,
  isShowCreateButton: true,
  templateContent: '',
  updatedContent: '',
  templateId: 0,
  templateName: '',
  presetTemplate: false,
  templates: [],
  loginId: 0,
  clientId: 0,
  importedTemplate: {},
  isSendingEmail: null,
  isComplete: null,
  isNotifyEorror: null,
  isShowSpinner: false,
  emailToPartyName: '',
  emailToPartyEmail: '',
  eCOSAccessUrl: ''
};


export default createReducer(InitialState, Object.assign(
  {
    [ActionTypes.GET_VENDORSOLICITOR_DOCUMENT_SUCCESS]: (state, action) => ({ ...state,
        // specialConditions: action.payload.document.specialConditions,
        documentId: action.payload.document.documentId,
        partyId: action.payload.document.partyId,
        partyRole: action.payload.document.partyRole,
        documentStatus: action.payload.document.documentStatus,
        clientReference: action.payload.document.clientReference,
        propertyAddress: action.payload.document.propertyAddress,
        settlementContent: action.payload.document.settlementContent,
        clientId: action.payload.document.clientId,
        loginId: action.payload.document.loginId,
        templateContent: action.payload.document.templateContent,
        templateId: action.payload.document.templateId,
        presetTemplate: action.payload.document.templateId === null,
        emailToPartyName: action.payload.document.emailToPartyName,
        emailToPartyEmail: action.payload.document.emailToPartyEmail,
        eCOSAccessUrl: action.payload.document.ecosAccessUrl,
        isLoading: false,
        documentType: action.payload.document.documentType
       }),
    [ActionTypes.CREATE_TEMPLATE]: (state) => {
      const newState = state;
      return { ...newState, isShowSpinner: true };
    },

    [ActionTypes.UPDATE_TEMPLATE]: (state) => {
      const newState = state;
      return { ...newState, isShowSpinner: true };
    },
    [ActionTypes.UPDATE_TEMPLATE_SUCCESS]: (state) => {
      const newState = state;
      return { ...newState, isShowSpinner: false };
    },
    [ActionTypes.UPDATE_TEMPLATE_FAIL]: (state) => {
      const newState = state;
      return { ...newState, isShowSpinner: false };
    },

    [ActionTypes.SHOW_TEMPLATE_MODAL]: (state) => {
      const newState = state;
      return { ...newState };
    },
    [ActionTypes.SHOW_TEMPLATE_MODAL_SUCCESS]: (state, action) => {
      const newState = state;
      return { ...newState, templates: action.payload.templatesVM, showTemplateModal: true, templateId: 0 };
    },
    [ActionTypes.CLOSE_TEMPLATE_MODAL]: (state) => ({ ...state, showTemplateModal: false }),
    [ActionTypes.IMPORT_TEMPLATE]: (state, action) => ({ ...state, importedTemplate: action.payload, templateId: action.payload.id }),
    [ActionTypes.CREATE_TEMPLATE]: (state, action) => ({ ...state, templateName: action.payload.name }),
    [ActionTypes.CREATE_ANOTHER_TEMPLATE]: (state) => ({ ...state, isShowCreateButton: true }),
    [ActionTypes.CREATE_TEMPLATE_SUCCESS]: (state, action) => ({ ...state, isShowTemplateNameModal: false, isShowCreateButton: false, templateId: action.payload.templateId, isShowSpinner: false }),
    [ActionTypes.RESET_TEMPLATE_ID]: (state) => ({ ...state, templateId: 0 }),
    [ActionTypes.SHOW_TEMPLATE_NAME_MODAL]: (state, action) => ({ ...state, isShowTemplateNameModal: action.payload.isShowTemplateNameModal, templateContent: action.payload.templateContent }),
    [ActionTypes.HIDE_TEMPLATE_NAME_MODAL]: (state) => ({ ...state, isShowTemplateNameModal: false }),
    [ActionTypes.SEND_TO_PURCHASERSOLICITOR]: (state) => ({ ...state, isShowSpinner: true }),
    [ActionTypes.SEND_TO_PURCHASERSOLICITOR_SUCCESS]: (state, action) => ({ ...state, documentStatus: action.payload.status, isSendingEmail: new Date().getTime(), isShowSpinner: false }),
    [ActionTypes.SEND_TO_PURCHASERSOLICITOR_FAIL]: (state) => ({ ...state, isNotifyEorror: new Date().getTime(), isShowSpinner: false }),
    [ActionTypes.VENDORSOLICITOR_COMPLETE_DOCUMENT]: (state) => ({ ...state, isShowSpinner: true }),
    [ActionTypes.VENDORSOLICITOR_COMPLETE_DOCUMENT_SUCCESS]: (state, action) => {
      // this the user if not logged in b4 will ask to log in
      const scWebsiteUrl = action.payload.scWebsiteURL;
      window.location.href = scWebsiteUrl;
    },
    [ActionTypes.VENDORSOLICITOR_COMPLETE_DOCUMENT_FAIL]: (state) => ({ ...state, isNotifyEorror: new Date().getTime(), isShowSpinner: false }),

    // demo only
    [ActionTypes.DEMO_NEW_SUCCESS]: (state, action) => {
      const accessCode = action.payload.accessCode;
      window.location.href = `/flexit/nswvs/${accessCode}`;
      return Object.assign({}, ...state);
    }
  }));
