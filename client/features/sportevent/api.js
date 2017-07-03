import request from 'utils/request';

export const getVendorSolicitorDocument = (documentId) => {
  return request.get(`nswvs/document/${documentId}`);
};

export const createTemplate = (payload) => {
  return request.post('document/createTemplate', payload);
};
