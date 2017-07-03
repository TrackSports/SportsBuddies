import React, { PropTypes } from 'react';

const ContractViewer = (props) => {
  if (!props.documentLocationUrl) {
    return (
      <div></div>
    );
  }

  let src = props.documentLocationUrl;
  if ((src || '').indexOf('null') > 0) {
    src = '';
  }
  if (src) {
    src = `${src}#scrollbar=0&navpanes=1&zoom=100&toolbar=0`;
  }
  return (
     <iframe src={src} type="application/pdf" style={{ width: '100%', height: '100%', border: '1px solid #ddd' }} />
    );
};

ContractViewer.propTypes = {
  documentLocationUrl: PropTypes.string
};

export default ContractViewer;
