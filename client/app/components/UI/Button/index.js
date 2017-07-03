import React, { PropTypes, Component } from 'react';
import styles from './style.styl';
import { browserSupportsAnimation } from 'utils';
import classnames from 'classnames';
import Icon from './Icon';
import UiIcon from 'ui/Icon';
import Link from './Link';

function renderChildern(children, icon) {
  if (icon) {
    return (
      <span><UiIcon icon={icon} style={{ marginRight: '2px' }} /> {children}</span>
    );
  }
  return children;
}

class Button extends Component {
  componentDidMount() {
    if (!this.props.loading) {
      this.width = this.refs.button.offsetWidth;
      this.height = this.refs.button.offsetHeight;
    }
  }

  componentDidUpdate() {
    if (!this.props.loading) {
      this.width = this.refs.button.offsetWidth;
      this.height = this.refs.button.offsetHeight;
    }
  }

  render() {
    const { className, children, loading, disabled, primary, orange, icon, block, size, style, ...rest } = this.props;
    const classModifiers = {
      [styles.default]: !primary && !orange,
      [styles.primary]: primary,
      [styles.orange]: orange,
      'btn-block': block,
      'btn-lg': size === 'lg',
      'btn-sm': size === 'sm',
      'btn-xs': size === 'xs'
    };

    const styleModifiers = {};
    if (loading && this.width && this.height > 0) {
      styleModifiers.width = `${this.width}px`;
      styleModifiers.height = `${this.height}px`;
    }

    return (
      <button
        ref="button"
        type="button"
        disabled={loading || disabled}
        className={classnames('btn', classModifiers, className)}
        style={{ ...styleModifiers, style }}
        {...rest}
      >
        {(loading && browserSupportsAnimation()) ? <i className="fa fa-spinner fa-spin fa-fw"></i> : renderChildern(children, icon)}
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  primary: PropTypes.bool,
  orange: PropTypes.bool,
  block: PropTypes.bool,
  loaindg: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.string
};

Button.Icon = Icon;
Button.Link = Link;

export default Button;
