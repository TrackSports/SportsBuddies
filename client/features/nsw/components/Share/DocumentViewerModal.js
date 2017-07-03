import React, { Component, PropTypes } from 'react';
// import classnames from 'classnames';
import Modal from 'app/components/UI/Modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideContractViewModal } from 'features/nsw/actions/document';

class DocumentViewer extends Component {

  componentDidMount() {
    this.adjustHeight();
  }

  componentDidUpdate() {
    this.adjustHeight();
    if (!this.refs.iframe) {
      return;
    }

    if (!this.props.documentLocationUrl) {
      this.refs.iframe.onload = null;
    } else if (!this.refs.iframe.onload) {
      this.refs.iframe.onload = this.onLoadHandler;
    }
  }

  comonentWillUnmount() {
    if (this.refs.iframe && this.refs.iframe.onload) {
      this.refs.iframe.onload = null;
    }
  }

  handleClose() {
    this.props.hideContractViewModal();
  }

  adjustHeight() {
    $(this.refs.iframe)
      .css('height', `${$(window).height() * 0.75}px`);
  }

  render() {
    let src = this.props.documentLocationUrl;
    if ((src || '').indexOf('null') > 0) {
      src = '';
    }
    if (src) {
      src = `${src}#scrollbar=0&navpanes=1`;
    }
    return (
      <Modal size="lg" show={this.props.showViewContractModal} onHide={::this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <iframe
            ref="iframe"
            src={src}
            type="application/pdf"
            style={{ width: '100%' }}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

DocumentViewer.propTypes = {
  hideContractViewModal: PropTypes.func,
  documentLocationUrl: PropTypes.string,
  showViewContractModal: PropTypes.bool,
  documentId: PropTypes.number
};

function mapStateToProps(state) {
  return {
    documentLocationUrl: state.nswDocument.documentLocationUrl,
    showViewContractModal: state.nswDocument.showViewContractModal,
    documentId: state.nswDocument.documentId
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ hideContractViewModal }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DocumentViewer);
