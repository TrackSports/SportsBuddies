import React, { Component, PropTypes } from 'react';
import Header from './Header';
import Title from './Title';
import Body from './Body';
import Footer from './Footer';
import classnames from 'classnames';
import uuidGenerator from 'node-uuid';

class Modal extends Component {
  componentDidMount() {
    if (this.onHideHandler) {
      $(`#${this.uuid}`).off('hidden.bs.modal', this.onHideHandler);
    }
    this.onHideHandler = function() {
      if (this.props.onHide) {
        this.props.onHide();
      }
    }.bind(this);
    $(`#${this.uuid}`).on('hidden.bs.modal', this.onHideHandler);

    const explorer = navigator.userAgent.indexOf('MSIE') > -1 || navigator.userAgent.indexOf('Trident/') > -1;
    if (explorer) {
      const hideHandler = this.onHideHandler;
      $('.iframeCoverForIE').load(function() {
        $(this).contents().find('body').on('click', function() { hideHandler(); });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      if (this.props.show) {
        $(`#${this.uuid}`).modal('show');
      } else {
        $(`#${this.uuid}`).modal('hide');
      }
    }
  }

  componentWillUnmount() {
    $(`#${this.uuid}`).off('hidden.bs.modal', this.onHideHandler);
  }

  LoadIframeForIE() {
    const explorer = navigator.userAgent.indexOf('MSIE') > -1 || navigator.userAgent.indexOf('Trident/') > -1;
    if (explorer) {
      return (
      <iframe className="iframeCoverForIE" src="about:blank" />
      );
    }
  }

  render() {
    const { children, size } = this.props;
    if (!this.uuid) {
      this.uuid = uuidGenerator();
    }

    const classModifiers = {
      'modal-sm': size === 'sm',
      'modal-lg': size === 'lg'
    };

    return (
      <div className={classnames('modal fade')} tabIndex="-1" role="dialog" id={this.uuid} style={{ zIndex: 9999999 }}>
        <div className={classnames('modal-dialog', classModifiers, this.props.customerClassName)} role="template">
          <div className="modal-content">
            {this.props.show && children}
          </div>
        </div>
        {this.LoadIframeForIE()}
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.any,
  show: PropTypes.bool,
  onHide: PropTypes.func,
  size: PropTypes.string,
  customerClassName: PropTypes.string
};

Modal.Header = Header;
Modal.Title = Title;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
