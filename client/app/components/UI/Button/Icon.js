import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './style.styl';

const Icon = ({ icon, loading, className, size, ...rest }) => {
  let sizeClass = styles.defaultSize;
  if (size) {
    sizeClass = `fa-${size}x`;
  }
  const finalClassName = classnames(styles.icon, `fa fa-${icon}`, sizeClass, className);

  if (loading) {
    return (
      <i className={classnames(styles.icon, 'fa fa-spinner fa-spin fa-fw', sizeClass, className)} {...rest}></i>
    );
  }

  return (
    <i className={finalClassName} {...rest}></i>
  );
};

Icon.propTypes = {
  icon: PropTypes.string,
  loading: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.number
};

export default Icon;
