import React, { PropTypes } from 'react';

const Body = ({ children }) => (
  <div className="modal-body">
    <div style={{ overflowX: 'auto' }}>
      {children}
    </div>
  </div>
);

Body.propTypes = {
  children: PropTypes.any
};

export default Body;
