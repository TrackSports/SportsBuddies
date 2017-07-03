import React, { PropTypes } from 'react';

const Footer = ({ children }) => (
  <div className="modal-footer">
    {children}
  </div>
);

Footer.propTypes = {
  children: PropTypes.any
};

export default Footer;
