import React, { PropTypes } from 'react';
// import TopNav from './TopNav';
import classnames from 'classnames';

const contentFluidStyle = {
  padding: '0px'
};

const Layout = ({ children }) => (
  <div>
    <div className={classnames('container-fluid')} style={contentFluidStyle}>
      {children}
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
