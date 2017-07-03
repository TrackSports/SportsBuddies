import React, { PropTypes } from 'react';
import { Link as RouterLink } from 'react-router';
import styles from './style.styl';
import classnames from 'classnames';

const Link = ({ className, children, disabled, bsStyle, size, href, ...rest }) => {
  const finalClassName = classnames('btn', {
    [styles.primary]: bsStyle === 'primary',
    [styles.success]: bsStyle === 'success',
    [styles.error]: bsStyle === 'error',
    [styles.default]: !bsStyle || bsStyle === 'default',
    [styles.sm]: size === 'sm'
  }, className);

  if (href) {
    return (
      <a
        {...rest}
        disabled={disabled}
        className={finalClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink
      {...rest}
      disabled={disabled}
      className={finalClassName}
    >
      {children}
    </RouterLink>
  );
};

Link.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.string,
  href: PropTypes.string,
  bsStyle: PropTypes.string
};

export default Link;
