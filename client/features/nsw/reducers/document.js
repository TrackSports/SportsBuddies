import Moment from 'moment';
import createReducer from 'utils/createReducer';
import * as ActionTypes from 'features/nsw/actions/actionTypes';
import * as sectionStatusConstant from 'features/nsw/constants/documentStatus';
import { isSecionRejectOrCounterOffer } from 'utils/documentHelper';

const InitialState = {
  partyId: 0,
  isLoading: false,
  documentId: 0,
  documentStatus: '',
  documentLocationUrl: '',
  showViewContractModal: false,
  clientReference: '',
  propertyAddress: '',
  partyRole: '',
  partyName: '',
  settlementContent: {},
  specialConditions: [],
  undoneSections: [],
  beforeRejectSections: [],
  modifiedSections: [],  // we need to record all the modified section and status. So later we can trace all the changes
  isShowCommentModal: false,
  sectionComment: [],
  commentSid: 0,
  commentSectionIdentify: '',
  isShowSpinner: false,
  isNotifyEorror: null,
  showUserActivityModal: false,
  activities: []
};

function UpdateSectionAndContent(specialConditions, action, isInEditModel, status) {
  let newSections = [].concat(specialConditions);
  newSections = newSections.map((section) => {
    if (section.content.identify === action.payload.identify) {
      const newSectiondata = {};
      if (action.payload.newValue) {
        newSectiondata.content = Object.assign({}, section.content, { isInEditModel, content: action.payload.newValue, previousContent: action.payload.originalValue, lastModifiedBy: action.payload.partyId, sectionStatus: status });
      } else {
        newSectiondata.content = Object.assign({}, section.content, { isInEditModel });
      }

      return Object.assign({}, section, newSectiondata);
    }
    return section;
  });

  for (let i = 0; i < newSections.length; i++) {
    if (newSections[i].subSections) {
      newSections[i].subSections = newSections[i].subSections.map((section) => {
        if (section.content.identify === action.payload.identify) {
          const newSectiondata = {};
          if (action.payload.newValue) {
            newSectiondata.content = Object.assign({}, section.content, { isInEditModel, content: action.payload.newValue, previousContent: action.payload.originalValue, lastModifiedBy: action.payload.partyId, sectionStatus: status });
          } else {
            newSectiondata.content = Object.assign({}, section.content, { isInEditModel });
          }

          return Object.assign({}, section, newSectiondata);
        }
        return section;
      });

      for (let j = 0; j < newSections[i].subSections.length; j++) {
        if (newSections[i].subSections[j].subSections) {
          newSections[i].subSections[j].subSections = newSections[i].subSections[j].subSections.map((section) => {
            if (section.identify === action.payload.identify) {
              let newSubSection = {};
              if (action.payload.newValue) {
                newSubSection = Object.assign({}, section, { isInEditModel, content: action.payload.newValue, previousContent: action.payload.originalValue, lastModifiedBy: action.payload.partyId, sectionStatus: status });
              } else {
                newSubSection = Object.assign({}, section, { isInEditModel });
              }

              return Object.assign({}, section, newSubSection);
            }

            return section;
          });
        }
      }
    }
  }
  return newSections;
}

function UpdateSectionStatus(specialConditions, action, newStatus) {
  let newSections = [].concat(specialConditions);
  newSections = newSections.map((section) => {
    if (section.content.identify === action.payload.sectionIdentify) {
      const newSectiondata = {};
      newSectiondata.content = Object.assign({}, section.content, { sectionStatus: newStatus });
      return Object.assign({}, section, newSectiondata);
    }
    return section;
  });

  for (let i = 0; i < newSections.length; i++) {
    if (newSections[i].subSections) {
      newSections[i].subSections = newSections[i].subSections.map((section) => {
        if (section.content.identify === action.payload.sectionIdentify) {
          const newSectionasda = {};
          newSectionasda.content = Object.assign({}, section.content, { sectionStatus: newStatus });
          return Object.assign({}, section, newSectionasda);
        }
        return section;
      });

      for (let j = 0; j < newSections[i].subSections.length; j++) {
        if (newSections[i].subSections[j].subSections) {
          newSections[i].subSections[j].subSections = newSections[i].subSections[j].subSections.map((section) => {
            if (section.identify === action.payload.sectionIdentify) {
              return Object.assign({}, section, {
                sectionStatus: newStatus
              });
            }

            return section;
          });
        }
      }
    }
  }

  return newSections;
}

function UpdateContentId(specialConditions, identify, unqiueId) {
  let newSections = [].concat(specialConditions);
  newSections = newSections.map((section) => {
    if (section.content.identify === identify) {
      const newSectiondata = {};
      newSectiondata.content = Object.assign({}, section.content, { id: unqiueId });
      return Object.assign({}, section, newSectiondata);
    }
    return section;
  });

  for (let i = 0; i < newSections.length; i++) {
    if (newSections[i].subSections) {
      newSections[i].subSections = newSections[i].subSections.map((section) => {
        if (section.content.identify === identify) {
          const newSectionasda = {};
          newSectionasda.content = Object.assign({}, section.content, { id: unqiueId });
          return Object.assign({}, section, newSectionasda);
        }
        return section;
      });

      for (let j = 0; j < newSections[i].subSections.length; j++) {
        if (newSections[i].subSections[j].subSections) {
          newSections[i].subSections[j].subSections = newSections[i].subSections[j].subSections.map((section) => {
            if (section.identify === identify) {
              return Object.assign({}, section, {
                id: unqiueId
              });
            }

            return section;
          });
        }
      }
    }
  }

  return newSections;
}

function UpdateContentCommentStatus(specialConditions, identify) {
  let newSections = [].concat(specialConditions);
  newSections = newSections.map((section) => {
    if (section.content.identify === identify) {
      const newSectiondata = {};
      newSectiondata.content = Object.assign({}, section.content, { hasLatestComment: true });
      return Object.assign({}, section, newSectiondata);
    }
    return section;
  });

  for (let i = 0; i < newSections.length; i++) {
    if (newSections[i].subSections) {
      newSections[i].subSections = newSections[i].subSections.map((section) => {
        if (section.content.identify === identify) {
          const newSectionasda = {};
          newSectionasda.content = Object.assign({}, section.content, { hasLatestComment: true });
          return Object.assign({}, section, newSectionasda);
        }
        return section;
      });

      for (let j = 0; j < newSections[i].subSections.length; j++) {
        if (newSections[i].subSections[j].subSections) {
          newSections[i].subSections[j].subSections = newSections[i].subSections[j].subSections.map((section) => {
            if (section.identify === identify) {
              return Object.assign({}, section, {
                hasLatestComment: true
              });
            }

            return section;
          });
        }
      }
    }
  }

  return newSections;
}

function UpdateModifiedSectionStatus(modifiedSections, identify, newStatus) {
  const newModified = modifiedSections.map((section) => {
    if (section.identify === identify) {
      return Object.assign({}, section, { sectionStatus: newStatus });
    }
    return section;
  });
  return newModified;
}

function IsSectionUndone(subSection, currentPartyId) {
  if (subSection.subSections) {
    if (subSection.content.previousContent &&
              subSection.content.previousContent !== subSection.content.content &&
              subSection.content.lastModifiedBy &&
              subSection.content.lastModifiedBy !== currentPartyId &&
              subSection.content.sectionStatus !== sectionStatusConstant.Reject) {
      return true;
    }
  } else {
    if (subSection.previousContent &&
                    subSection.previousContent !== subSection.content &&
                    subSection.lastModifiedBy &&
                    subSection.lastModifiedBy !== currentPartyId &&
                    subSection.sectionStatus !== sectionStatusConstant.Reject) {
      return true;
    }
  }
  return false;
}


function addUndoneSection(sections, partyId) {
  const undoneSections = [];
  sections.forEach(d => {
    if (IsSectionUndone(d, partyId)) {
      undoneSections.push(d.content.identify);
    }
    if (d.subSections.length > 0) {
      d.subSections.forEach(b => {
        if (IsSectionUndone(b, partyId)) {
          undoneSections.push(b.content.identify);
        }
        if (b.subSections.length > 0) {
          b.subSections.forEach(c => {
            if (IsSectionUndone(c, partyId)) {
              undoneSections.push(c.identify);
            }
          });
        }
      });
    }
  });
  return undoneSections;
}

function addModifiedSection(sections) {
  const modifiedSections = [];
  sections.forEach(d => {
    if (isSecionRejectOrCounterOffer(d.content.sectionStatus)) {
      modifiedSections.push(d.content);
    }
    if (d.subSections.length > 0) {
      d.subSections.forEach(b => {
        if (isSecionRejectOrCounterOffer(b.content.sectionStatus)) {
          modifiedSections.push(b.content);
        }
        if (b.subSections.length > 0) {
          b.subSections.forEach(c => {
            if (isSecionRejectOrCounterOffer(c.content.sectionStatus)) {
              modifiedSections.push(c);
            }
          });
        }
      });
    }
  });
  return modifiedSections;
}

function convertDateToMomentForActivities(groupedActivities) {
  const newActivities = [];

  groupedActivities.forEach((activities) => {
    const newActivity = activities.map(a => {
      return { ...a, createAt: Moment(a.createAt) };
    });
    newActivities.push(newActivity);
  });

  return newActivities;
}

export default createReducer(InitialState, Object.assign(
  {
    [ActionTypes.GET_PURCHASERSOLICITOR_DOCUMENT_SUCCESS]: (state, action) => ({ ...state,
        specialConditions: action.payload.document.specialConditions,
        documentId: action.payload.document.documentId,
        partyId: action.payload.document.partyId,
        partyName: action.payload.document.partyName,
        partyEmail: action.payload.document.partyEmail,
        partyRole: action.payload.document.partyRole,
        documentStatus: action.payload.document.documentStatus,
        clientReference: action.payload.document.clientReference,
        propertyAddress: action.payload.document.propertyAddress,
        documentLocationUrl: action.payload.document.documentLocationUrl,
        isLoading: false }),
    [ActionTypes.GET_VENDORSOLICITOR_DOCUMENT_SUCCESS]: (state, action) => ({ ...state,
        specialConditions: action.payload.document.specialConditions,
        documentId: action.payload.document.documentId,
        partyId: action.payload.document.partyId,
        partyName: action.payload.document.partyName,
        partyEmail: action.payload.document.partyEmail,
        partyRole: action.payload.document.partyRole,
        documentStatus: action.payload.document.documentStatus,
        clientReference: action.payload.document.clientReference,
        propertyAddress: action.payload.document.propertyAddress,
        documentLocationUrl: action.payload.document.documentLocationUrl,
        isLoading: false }),
    [ActionTypes.SEND_TO_PURCHASERSOLICITOR_SUCCESS]: (state, action) => ({ ...state,
        specialConditions: action.payload.document.specialConditions,
        documentId: action.payload.document.documentId,
        partyId: action.payload.document.partyId,
        partyName: action.payload.document.partyName,
        partyRole: action.payload.document.partyRole,
        documentStatus: action.payload.document.documentStatus,
        clientReference: action.payload.document.clientReference,
        propertyAddress: action.payload.document.propertyAddress,
        documentLocationUrl: action.payload.document.documentLocationUrl,
        isLoading: false }),

    [ActionTypes.SOLICITOR_ADD_UNDONE_SECTION]: (state) => {
      const newState = state;
      const newUndoneSections = addUndoneSection(newState.specialConditions, newState.partyId);
      newState.modifiedSections = addModifiedSection(newState.specialConditions);
      newUndoneSections.forEach(s => {
        newState.undoneSections.push(s);
        newState.beforeRejectSections.push(s);
      });
      return { ...newState };
    },
    [ActionTypes.SOLICITOR_REMOVE_UNDONE_SECTION]: (state, action) => {
      const newState = state;
      const identifyIndex = newState.undoneSections.indexOf(action.payload);
      newState.undoneSections.splice(identifyIndex, 1);
      return { ...newState };
    },

    [ActionTypes.SOLICITOR_UPDATE_SECTION]: (state, action) => {
      const newSections = UpdateSectionAndContent(state.specialConditions, action, false, sectionStatusConstant.Discuss);
      const newModifiedSections = UpdateModifiedSectionStatus(state.modifiedSections, action.payload.identify, sectionStatusConstant.Discuss);
      return Object.assign({}, state, { specialConditions: newSections, isShowSpinner: true, modifiedSections: newModifiedSections });
    },
    [ActionTypes.SOLICITOR_UPDATE_SECTION_SUCCESS]: (state, action) => {
      const newSections = UpdateContentId(state.specialConditions, action.payload.identify, action.payload.uniqueId);
      return Object.assign({}, state, { specialConditions: newSections, isShowSpinner: false });
    },

    [ActionTypes.SOLICITOR_ACCEPT_SECTION]: (state, action) => {
      const newSections = UpdateSectionStatus(state.specialConditions, action, sectionStatusConstant.Accept);
      const newModifiedSections = UpdateModifiedSectionStatus(state.modifiedSections, action.payload.sectionIdentify, sectionStatusConstant.Accept);
      // remove beforeRejectSections
      state.beforeRejectSections.splice(action.payload.sectionIdentify, 1);
      return Object.assign({}, state, { specialConditions: newSections, modifiedSections: newModifiedSections, beforeRejectSections: state.beforeRejectSections });
    },
    [ActionTypes.SOLICITOR_ACCEPT_SECTION_SUCCESS]: (state) => ({ ...state }),
    [ActionTypes.SOLICITOR_ACCEPT_SECTION_FAIL]: (state) => ({ ...state }),

    [ActionTypes.SOLICITOR_REJECT_SECTION]: (state, action) => {
      const newSections = UpdateSectionStatus(state.specialConditions, action, sectionStatusConstant.Reject);
      return Object.assign({}, state, { specialConditions: newSections });
    },
    [ActionTypes.SOLICITOR_REJECT_SECTION_SUCCESS]: (state) => ({ ...state }),
    [ActionTypes.SOLICITOR_REJECT_SECTION_FAIL]: (state) => ({ ...state }),

    [ActionTypes.SHOW_CONTRACT_VIEW_MODAL]: (state, action) => ({ ...state, showViewContractModal: action.payload.showViewContractModal }),
    [ActionTypes.HIDE_CONTRACT_VIEW_MODAL]: (state) => ({ ...state, showViewContractModal: false }),


    [ActionTypes.SHOW_COMMENT_MODAL]: (state, action) => ({ ...state, commentSectionIdentify: action.payload.sectionIdentify, commentSid: action.payload.sid }),
    [ActionTypes.SHOW_COMMENT_MODAL_SUCCESS]: (state, action) => ({ ...state, isShowCommentModal: true, sectionComment: action.payload.commentModal.comments, commentSid: action.payload.commentModal.sid }),
    [ActionTypes.SHOW_COMMENT_MODAL_FAIL]: (state) => ({ ...state, isNotifyEorror: new Date().getTime() }),

    [ActionTypes.HIDE_COMMENT_MODAL]: (state) => ({ ...state, isShowCommentModal: false }),

    [ActionTypes.SAVE_COMMENT]: (state) => ({ ...state }),
    [ActionTypes.SAVE_COMMENT_SUCCESS]: (state, action) => {
      const newState = state;
      const updateIdSections = UpdateContentId(newState.specialConditions, action.payload.commentModal.sectionIdentify, action.payload.commentModal.sid);
      const newSections = UpdateContentCommentStatus(updateIdSections, action.payload.commentModal.sectionIdentify);

      return { ...newState, specialConditions: newSections, sectionComment: action.payload.commentModal.comments, commentSid: action.payload.commentModal.sid, isShowCommentModal: false };
    },
    [ActionTypes.SAVE_COMMENT_FAIL]: (state) => ({ ...state, isNotifyEorror: new Date().getTime() }),

    [ActionTypes.SAVE_COMMENT_AND_CHANGE_STATUS]: (state) => ({ ...state }),
    [ActionTypes.SAVE_COMMENT_AND_CHANGE_STATUS_SUCCESS]: (state, action) => {
      const newState = state;
      const updateIdSections = UpdateContentId(newState.specialConditions, action.payload.sectionIdentify, action.payload.sid);
      const newSections = UpdateContentCommentStatus(updateIdSections, action.payload.sectionIdentify);
      newState.beforeRejectSections.splice(action.payload.sectionIdentify, 1);
      newState.undoneSections.splice(action.payload.sectionIdentify, 1);

      const newModifiedSections = [
        ...state.modifiedSections,
        {
          identify: action.payload.sectionIdentify,
          sectionStatus: sectionStatusConstant.Reject
        }];

      return { ...newState, specialConditions: newSections, sectionComment: action.payload.comments, commentSid: action.payload.sid, isShowCommentModal: false, modifiedSections: newModifiedSections };
    },

    [ActionTypes.SAVE_COMMENT_AND_CHANGE_STATUS_FAIL]: (state) => ({ ...state, isNotifyEorror: new Date().getTime() }),

    // need to update the document status not editable
    [ActionTypes.PURCHASERSOLICITOR_ACCEPT_INITSPECIALCONDITION_SUCCESS]: (state, action) => ({ ...state, documentStatus: action.payload.documentStatus }),
    [ActionTypes.PURCHASERSOLICITOR_REJECT_INITSPECIALCONDITION_SUCCESS]: (state, action) => ({ ...state, documentStatus: action.payload.documentStatus }),
    [ActionTypes.PURCHASERSOLICITOR_FINISH_REVIEW_SUCCESS]: (state, action) => ({ ...state, documentStatus: action.payload.status }),

    [ActionTypes.PURCHASERSOLICITOR_ACCEPT_REJECTION]: (state, action) => {
      const newSections = UpdateSectionAndContent(state.specialConditions, action, false, sectionStatusConstant.Accept);
      const newModifiedSections = UpdateModifiedSectionStatus(state.modifiedSections, action.payload.identify, sectionStatusConstant.Accept);
      return Object.assign({}, state, { specialConditions: newSections, isShowSpinner: true, modifiedSections: newModifiedSections });
    },
    [ActionTypes.PURCHASERSOLICITOR_ACCEPT_REJECTION_SUCCESS]: (state) => {
      return { ...state, isShowSpinner: false };
    },
    [ActionTypes.SOLICITOR_COUNTEROFFER_SECTION]: (state, action) => {
      const newSections = UpdateSectionStatus(state.specialConditions, action, sectionStatusConstant.CounterOffer);
      const newModifiedSections = UpdateModifiedSectionStatus(state.modifiedSections, action.payload.sectionIdentify, sectionStatusConstant.CounterOffer);
      return Object.assign({}, state, { specialConditions: newSections, modifiedSections: newModifiedSections });
    },

    [ActionTypes.SHOW_USER_ACTIVITY_MODAL]: (state) => {
      return { ...state, isShowSpinner: true };
    },
    [ActionTypes.SHOW_USER_ACTIVITY_MODAL_SUCCESS]: (state, action) => {
      return { ...state, isShowSpinner: false, showUserActivityModal: true, activities: convertDateToMomentForActivities(action.payload.groupedActionsList) };
    },
    [ActionTypes.SHOW_USER_ACTIVITY_MODAL_FAIL]: (state) => {
      return { ...state, isShowSpinner: false, isNotifyEorror: new Date().getTime() };
    },
    [ActionTypes.HIDE_USER_ACTIVITY_MODAL]: (state) => {
      return { ...state, showUserActivityModal: false };
    }

  }));
