import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import findIndex from 'lodash/findIndex';
import toolbarscss from 'features/nsw/components/Share/toolbar.scss';
import Image from 'share/Image';
import { sendToPurchaserSolicitor, vendorSolicitorCompleteDocument } from 'features/nsw/actions/vendorSolicitor';
import { showContractViewModal } from 'features/nsw/actions/document';
import * as DocumentStatus from 'features/nsw/constants/documentStatus';
import Notification from 'share/Notification';

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEmailBar: false,
      showEmailSendButton: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSendingEmail !== this.props.isSendingEmail && nextProps.isSendingEmail) {
      this.refs.notification.addNotification('Email has been successfully sent', 'success');
    }
    if (nextProps.isComplete !== this.props.isComplete && nextProps.isComplete) {
      this.refs.notification.addNotification('New document has been successfully completed', 'success');
    }
    if (nextProps.isNotifyEorror !== this.props.isNotifyEorror && nextProps.isNotifyEorror) {
      this.refs.notification.addNotification('Error occurs! Please try again', 'error');
    }
  }

  viewContract() {
    this.props.showContractViewModal({ showViewContractModal: true });
  }

  completeDocument() {
    const { undoneSections, modifiedSections } = this.props;
    if (undoneSections.length !== 0) {
      this.refs.notification.addNotification('Please reject or accept before complete the document', 'error');
      return;
    }

    if (modifiedSections) {
      const rejectIndex = findIndex(modifiedSections, function(d) { return d.sectionStatus === DocumentStatus.Reject; });
      if (rejectIndex !== -1) {
        this.refs.notification.addNotification('all sections must be accepted in order to complete the document', 'error');
        return;
      }
    }

    this.props.vendorSolicitorCompleteDocument(this.props.documentId);
  }

  sendDocument() {
    const { currentRenderBlocks, templateId, documentId, documentStatus } = this.props;
    const payload = { documentId };
    payload.receiverEmailAddress = this.emailInput.value;
    if (documentStatus === DocumentStatus.New) {
      if (!templateId) {
        this.refs.notification.addNotification('Please select a template first.', 'error');
      } else {
        payload.draftBlocks = {
          blocks: currentRenderBlocks.blocks,
          templateId,
          documentId
        };
        this.props.sendToPurchaserSolicitor(payload);
      }
    } else {
      if (this.props.undoneSections.length !== 0) {
        this.refs.notification.addNotification('Please reject or accept all sections before send', 'error');
      } else {
        this.props.sendToPurchaserSolicitor(payload);
      }
    }

    this.showEmailBar(false);
  }

  showEmailBar(isShowEmailBar) {
    this.setState({
      showEmailBar: isShowEmailBar,
      showEmailSendButton: isShowEmailBar
    });
  }

  renderButtonsAndEmailBar() {
    const { documentType, templateId, presetTemplate, documentStatus, emailToPartyEmail } = this.props;
    const displayFormat = `${emailToPartyEmail}`;

    if (documentType === 'Demo') {
      return (
        <div className={classnames('')}>
            <div className={classnames('col-xs-12', toolbarscss.sendNav)}>
              <div className="pull-right">
                <div className={classnames('col-xs-6', this.state.showEmailBar ? toolbarscss.utlVisible : toolbarscss.utlInvisible)} style={{ width: '343px', paddingRight: '0px' }}>
                  <input type="text" className={classnames('form-control', toolbarscss.emailBarAddress)} defaultValue={displayFormat} ref={(input) => { this.emailInput = input; }} />
                </div>

                <span className={classnames(toolbarscss.toolbarButton, documentStatus === DocumentStatus.Finalized ? toolbarscss.utlInvisible : toolbarscss.utlVisible, this.state.showEmailSendButton ? 'hidden' : '')}
                  onClick={() => this.showEmailBar(true)}
                >
                  <Image src="/Toolbar/send.png" className={classnames(toolbarscss.toolbarImage)} />
                  <span className={classnames(toolbarscss.btnSendImagSpan)}>Email</span>
                </span>

                <span className={classnames(toolbarscss.toolbarButton, documentStatus === DocumentStatus.Finalized ? toolbarscss.utlInvisible : toolbarscss.utlVisible, this.state.showEmailSendButton ? '' : 'hidden')}
                  onClick={() => this.sendDocument()}
                >
                  <Image src="/Toolbar/send.png" className={classnames(toolbarscss.toolbarImage)} />
                  <span className={classnames(toolbarscss.btnSendImagSpan)}>Send</span>
                </span>

                <span className={classnames(toolbarscss.toolbarButton, documentStatus === DocumentStatus.ViewerInitReview || documentStatus === DocumentStatus.New ? toolbarscss.utlFadeOut : toolbarscss.utlFadeInline)} onClick={(e) => this.completeDocument(e)}>
                  <Image src="/Toolbar/finish.png" className={classnames(toolbarscss.toolbarImage)} />
                  <span className={classnames(toolbarscss.btnSendImagSpan)}>Complete</span>
                </span>
              </div>
            </div>
          </div>
      );
    }

    return (
          <div className={classnames(!templateId || presetTemplate ? 'hidden' : '')}>
             <div className={classnames('col-xs-12', toolbarscss.sendNav)}>
              <div className="pull-right">
                <div className={classnames('col-xs-6', this.state.showEmailBar ? toolbarscss.utlVisible : toolbarscss.utlInvisible)} style={{ width: '343px', paddingRight: '0px' }}>
                  <input type="text" className={classnames('form-control', toolbarscss.emailBarAddress)} defaultValue={displayFormat} ref={(input) => { this.emailInput = input; }} />
                </div>

                <span className={classnames(toolbarscss.toolbarButton, documentStatus === DocumentStatus.Finalized ? toolbarscss.utlInvisible : toolbarscss.utlVisible, this.state.showEmailSendButton ? 'hidden' : '')}
                  onClick={() => this.showEmailBar(true)}
                >
                  <Image src="/Toolbar/send.png" className={classnames(toolbarscss.toolbarImage)} />
                  <span className={classnames(toolbarscss.btnSendImagSpan)}>Email</span>
                </span>

                <span className={classnames(toolbarscss.toolbarButton, documentStatus === DocumentStatus.Finalized ? toolbarscss.utlInvisible : toolbarscss.utlVisible, this.state.showEmailSendButton ? '' : 'hidden')}
                  onClick={() => this.sendDocument()}
                >
                  <Image src="/Toolbar/send.png" className={classnames(toolbarscss.toolbarImage)} />
                  <span className={classnames(toolbarscss.btnSendImagSpan)}>Send</span>
                </span>

                <span className={classnames(toolbarscss.toolbarButton, documentStatus === DocumentStatus.ViewerInitReview || documentStatus === DocumentStatus.New ? toolbarscss.utlFadeOut : toolbarscss.utlFadeInline)} onClick={(e) => this.completeDocument(e)}>
                  <Image src="/Toolbar/finish.png" className={classnames(toolbarscss.toolbarImage)} />
                  <span className={classnames(toolbarscss.btnSendImagSpan)}>Complete</span>
                </span>
              </div>
            </div>
          </div>
    );
  }

  render() {
    const { clientReference, propertyAddress, documentStatus } = this.props;
    const topNavColor = documentStatus === DocumentStatus.ViewerReview || documentStatus === DocumentStatus.ViewerInitReview ? toolbarscss.topNavDone : toolbarscss.topNav;
    let addressDisplay = clientReference;
    if (propertyAddress) {
      addressDisplay = `${addressDisplay}-${propertyAddress}`;
    }
    return (
      <nav className={classnames('navbar navbar-static-top', topNavColor)}>
        <div className={classnames('collapse navbar-collapse', toolbarscss.toolbarContent)}>
          <div className="row">
            <div className={classnames('col-xs-4', toolbarscss.toolbarIcon)} style= {{ paddingLeft: '131px' }}>
              <span className={classnames(toolbarscss.btnSendImagSpan)}>{addressDisplay}</span>
            </div>
            <div className={classnames('col-xs-6')} style={{ width: '62%' }}>
              <div className={classnames('row')}>
                  {this.renderButtonsAndEmailBar()}
              </div>
            </div>
          </div>
        </div>
        <Notification ref="notification" />
      </nav>
    );
  }
}

Toolbar.propTypes = {
  showContractViewModal: PropTypes.func,
  templateContent: PropTypes.string,
  templateId: PropTypes.number,
  sendToPurchaserSolicitor: PropTypes.func,
  vendorSolicitorCompleteDocument: PropTypes.func,
  clientId: PropTypes.number,
  loginId: PropTypes.number,
  currentRenderBlocks: PropTypes.object,
  documentId: PropTypes.number,
  src: PropTypes.string,
  documentStatus: PropTypes.string,
  clientReference: PropTypes.string,
  propertyAddress: PropTypes.string,
  isSendingEmail: PropTypes.number,
  isComplete: PropTypes.number,
  undoneSections: PropTypes.array,
  emailToPartyName: PropTypes.string,
  emailToPartyEmail: PropTypes.string,
  presetTemplate: PropTypes.bool,
  isNotifyEorror: PropTypes.number,
  documentType: PropTypes.string,
  modifiedSections: PropTypes.array
};

function mapStateToProps(state) {
  return {
    templateContent: state.nswVendorSolicitor.templateContent,
    clientId: state.nswVendorSolicitor.clientId,
    loginId: state.nswVendorSolicitor.loginId,
    documentId: state.nswVendorSolicitor.documentId,
    documentStatus: state.nswVendorSolicitor.documentStatus,
    clientReference: state.nswVendorSolicitor.clientReference,
    propertyAddress: state.nswVendorSolicitor.propertyAddress,
    isSendingEmail: state.nswVendorSolicitor.isSendingEmail,
    isComplete: state.nswVendorSolicitor.isComplete,
    templateId: state.nswVendorSolicitor.templateId,
    undoneSections: state.nswDocument.undoneSections,
    emailToPartyName: state.nswVendorSolicitor.emailToPartyName,
    emailToPartyEmail: state.nswVendorSolicitor.emailToPartyEmail,
    presetTemplate: state.nswVendorSolicitor.presetTemplate,
    isNotifyEorror: state.nswVendorSolicitor.isNotifyEorror,
    documentType: state.nswVendorSolicitor.documentType,
    modifiedSections: state.nswDocument.modifiedSections
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ sendToPurchaserSolicitor, showContractViewModal, vendorSolicitorCompleteDocument }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Toolbar);
