import React, { Component, PropTypes } from 'react';
import Modal from 'share/UI/Modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import vsScss from './vendorSolicitor.scss';
import { createTemplate, hideTemplateNameModal } from 'features/nsw/actions/vendorSolicitor';
import * as DocumentType from 'features/nsw/constants/documentType';

class TemplateName extends Component {

  componentDidMount() {
    this.adjustHeight();
  }

  componentDidUpdate() {
    this.adjustHeight();
  }

  adjustHeight() {
    $(this.refs.iframe)
      .css('height', `${$(window).height() * 0.75}px`);
  }

  saveTemplate() {
    const { templateContent, loginId, clientId } = this.props;
    const templateName = this.nameInput.value;
    const payload = {
      content: templateContent,
      clientId,
      type: DocumentType.nswEcos,
      name: templateName,
      loginId
    };

    this.props.createTemplate(payload);
  }

  handleClose = () => this.props.hideTemplateNameModal();

  render() {
    const { isShowTemplateNameModal } = this.props;
    return (
      <Modal size="lg" show={isShowTemplateNameModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please enter the template name</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <input ref={(input) => { this.nameInput = input; }} style={{ width: '100%' }} />
        </Modal.Body>
        <Modal.Footer>
        <button className={classnames('btn btn-default', vsScss.commentCancelBtn)} onClick={this.handleClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => this.saveTemplate()}>Save</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

TemplateName.propTypes = {
  createTemplate: PropTypes.func,
  hideTemplateNameModal: PropTypes.func,
  isShowTemplateNameModal: PropTypes.bool,
  templateContent: PropTypes.string,
  loginId: PropTypes.number,
  clientId: PropTypes.number
};

function mapStateToProps(state) {
  return {
    isShowTemplateNameModal: state.nswVendorSolicitor.isShowTemplateNameModal,
    templateContent: state.nswVendorSolicitor.templateContent,
    loginId: state.nswVendorSolicitor.loginId,
    clientId: state.nswVendorSolicitor.clientId
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ createTemplate, hideTemplateNameModal }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TemplateName);
