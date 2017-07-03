import React, { PropTypes } from 'react';

const Title = ({ children }) => (
  <div className="modal-title">
    {children}
  </div>
);

Title.propTypes = {
  children: PropTypes.any
};

export default Title;
