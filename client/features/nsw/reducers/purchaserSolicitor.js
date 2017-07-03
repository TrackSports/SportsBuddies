import * as ActionTypes from 'features/nsw/actions/actionTypes';
import createReducer from 'utils/createReducer';

const InitialState = {
  partyId: 0,
  isLoading: true,
  documentId: 0,
  documentStatus: '',
  documentLocationUrl: '',
  showViewDocumentModal: false,
  clientReference: '',
  propertyAddress: '',
  partyRole: '',
  settlementContent: {},
  specialConditions: [],
  isShowSpinner: false,
  isFinish: null,
  isSending: null,
  isNotifyEorror: null,
  emailToPartyName: '',
  emailToPartyEmail: ''
};


export default createReducer(InitialState, Object.assign(
  {
    [ActionTypes.GET_PURCHASERSOLICITOR_DOCUMENT_SUCCESS]: (state, action) => ({ ...state,
        // specialConditions: action.payload.document.specialConditions,
        documentId: action.payload.document.documentId,
        partyId: action.payload.document.partyId,
        partyRole: action.payload.document.partyRole,
        documentStatus: action.payload.document.documentStatus,
        clientReference: action.payload.document.clientReference,
        propertyAddress: action.payload.document.propertyAddress,
        settlementContent: action.payload.document.settlementContent,
        emailToPartyName: action.payload.document.emailToPartyName,
        emailToPartyEmail: action.payload.document.emailToPartyEmail,
        isLoading: false }),
    [ActionTypes.PURCHASERSOLICITOR_FINISH_REVIEW]: (state) => ({ ...state, isShowSpinner: true }),
    [ActionTypes.PURCHASERSOLICITOR_FINISH_REVIEW_SUCCESS]: (state, action) => ({ ...state, documentStatus: action.payload.status, isShowSpinner: false, isFinish: new Date().getTime() }),
    [ActionTypes.PURCHASERSOLICITOR_FINISH_REVIEW_FAIL]: (state) => ({ ...state, isNotifyEorror: new Date().getTime(), isShowSpinner: false }),
    [ActionTypes.PURCHASERSOLICITOR_REJECT_INITSPECIALCONDITION]: (state) => ({ ...state, isShowSpinner: true }),
    [ActionTypes.PURCHASERSOLICITOR_REJECT_INITSPECIALCONDITION_SUCCESS]: (state, action) => ({ ...state, isSending: new Date().getTime(), documentStatus: action.payload.documentStatus, isShowSpinner: false }),
    [ActionTypes.PURCHASERSOLICITOR_REJECT_INITSPECIALCONDITION_FAIL]: (state) => ({ ...state, isNotifyEorror: new Date().getTime(), isShowSpinner: false }),
    [ActionTypes.PURCHASERSOLICITOR_ACCEPT_INITSPECIALCONDITION]: (state) => ({ ...state, isShowSpinner: true }),
    [ActionTypes.PURCHASERSOLICITOR_ACCEPT_INITSPECIALCONDITION_SUCCESS]: (state, action) => ({ ...state, isSending: new Date().getTime(), documentStatus: action.payload.documentStatus, isShowSpinner: false }),
    [ActionTypes.PURCHASERSOLICITOR_ACCEPT_INITSPECIALCONDITION_FAIL]: (state) => ({ ...state, isNotifyEorror: new Date().getTime(), isShowSpinner: false })
  }));
