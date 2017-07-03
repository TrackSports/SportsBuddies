import request from 'utils/request';

export const getVendorSolicitorDocument = (documentId) => {
  return request.get(`nswvs/document/${documentId}`);
};

export const getdemoDocument = () => {
  return request.get('demo/new');
};

export const createTemplate = (payload) => {
  return request.post('document/createTemplate', payload);
};

export const updateTemplate = (payload) => {
  return request.post('document/updateTemplate', payload);
};

export const getTemplate = (clientId) => {
  return request.get(`document/getTemplate/${clientId}`);
};

export const sendToPurchaserSolicitor = (payload) => {
  return request.post('nswvs/sendToPurchaserSolicitorInitial', payload);
};

export const vendorSolicitorCompleteDocument = (documentId) => {
  return request.post(`nswvs/completeDocument/${documentId}`);
};

export const getPurchaserSolicitorDocument = (documentId) => {
  return request.get(`nswps/document/${documentId}`);
};


// document sections
export const solicitorAcceptSection = (payload) => {
  return request.post('document/acceptSection', payload);
};

export const solicitorRejectSection = (payload) => {
  return request.post('document/rejectSection', payload);
};

export const solicitorCounterOfferSection = (payload) => {
  return request.post('document/counterOfferSection', payload);
};

export const solicitorUpdateSection = (payload) => {
  return request.post('document/saveModifySection', payload);
};

export const purchaserSolicitorRejectInitSpecialCondition = (payload) => {
  return request.post('nswps/rejectSpecialConditions', payload);
};

export const purchaserSolicitorAcceptInitSpecialCondition = (payload) => {
  return request.post('nswps/acceptSpecialConditions', payload);
};

export const purchaserSolicitorFinishReview = (payload) => {
  return request.post('nswps/completeReview', payload);
};

export const getComments = (payload) => {
  return request.get(`document/getComments/${payload.sid}`);
};

export const saveComment = (payload) => {
  return request.post('document/saveComment', payload);
};

export const getActivities = (documentId) => {
  return request.get(`document/getActivities/${documentId}`);
};
