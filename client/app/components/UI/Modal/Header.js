import React, { PropTypes } from 'react';

const Header = ({ children }) => (
  <div className="modal-header">
    {children}
  </div>
);

Header.propTypes = {
  children: PropTypes.any
};

export default Header;
