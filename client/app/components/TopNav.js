import React, { PropTypes } from 'react';
import classnames from 'classnames';
import s from './TopNav.scss';
import { Link } from 'react-router';

const TopNav = ({ children }) => {
  return (
    <nav className={classnames('navbar navbar-inverse navbar-static-top', s.container)}>
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to={window.rootUrl} className={classnames('navbar-brand', s.brand)}>
            Flexit
          </Link>
        </div>
        {children}
      </div>
    </nav>
  );
};

TopNav.propTypes = {
  children: PropTypes.any
};

export default TopNav;
