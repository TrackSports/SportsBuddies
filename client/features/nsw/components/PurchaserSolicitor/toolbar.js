import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import findIndex from 'lodash/findIndex';
import toolbarscss from 'features/nsw/components/Share/toolbar.scss';
import { purchaserSolicitorAcceptInitSP, purchaserSolicitorRejectInitSP, purchaserSolicitorFinishReview } from 'features/nsw/actions/purchaserSolicitor';
import * as documentStatusConstant from 'features/nsw/constants/documentStatus';
import Notification from 'share/Notification';
import Image from 'share/Image';
import { isSecionRejectOrCounterOffer } from 'utils/documentHelper';

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEmailBar: false,
      showEmailSendButton: false,
      swtichAcceptAndReject: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFinish !== this.props.isFinish && nextProps.isFinish) {
      this.refs.notification.addNotification('Email has been successfully sent', 'success');
    }
    if (nextProps.isNotifyEorror !== this.props.isNotifyEorror && nextProps.isNotifyEorror) {
      this.refs.notification.addNotification('Error occurs! Please try again', 'error');
    }
    if (nextProps.isSending !== this.props.isSending && nextProps.isSending) {
      this.refs.notification.addNotification('Email has been successfully sent', 'success');
    }
  }

  rejectConditions() {
    const payload = {
      documentId: this.props.documentId,
      receiverEmailAddress: this.emailInput.value
    };
    this.props.purchaserSolicitorRejectInitSP(payload);
  }

  acceptConditions() {
    const payload = {
      documentId: this.props.documentId,
      receiverEmailAddress: this.emailInput.value
    };
    this.props.purchaserSolicitorAcceptInitSP(payload);
  }

  finishConditions() {
    const { undoneSections, modifiedSections } = this.props;
    const payload = {
      documentId: this.props.documentId,
      receiverEmailAddress: this.emailInput.value
    };

    if (modifiedSections) {
      const rejectIndex = findIndex(modifiedSections, function(d) { return isSecionRejectOrCounterOffer(d.sectionStatus); });
      if (rejectIndex !== -1) {
        this.refs.notification.addNotification('all counter offers must be accepted or modified', 'error');
        return;
      }
    }

    if (undoneSections.length !== 0) {
      this.refs.notification.addNotification('Please reject or accept before send', 'error');
    } else {
      this.props.purchaserSolicitorFinishReview(payload);
    }
    this.setState({
      showEmailBar: false,
      showEmailSendButton: false
    });
  }

  showEmailBar(actionType) {
    this.setState({
      swtichAcceptAndReject: actionType,
      showEmailBar: true,
      showEmailSendButton: true
    });
  }

  rejectOrFinishSending() {
    if (this.props.documentStatus === documentStatusConstant.ViewerInitReview) {
      if (this.state.swtichAcceptAndReject === 'ACCEPT') {
        this.acceptConditions();
      }
      if (this.state.swtichAcceptAndReject === 'REJECT') {
        this.rejectConditions();
      }
    } else {
      this.finishConditions();
    }
    this.setState({
      showEmailBar: false,
      showEmailSendButton: false
    });
  }

  renderEmailBar(isInitView) {
    const { documentStatus, emailToPartyEmail } = this.props;
    const displayFormat = `${emailToPartyEmail}`;
    const viewInitRiewCss = documentStatus === documentStatusConstant.ViewerInitReview ? toolbarscss.emailBarWidthForPsInitial : toolbarscss.emailBarWidthForPsSend;
    if (!isInitView) {
      return (
         <div className={classnames(viewInitRiewCss)}>
              <input type="text" className={classnames('form-control', toolbarscss.emailBarAddress)} defaultValue={displayFormat} ref={(input) => { this.emailInput = input; }} />
          </div>
        );
    }

    return (
      <div className={classnames(viewInitRiewCss)}>
        <div className="input-group">
          <input type="text" className={classnames('form-control', toolbarscss.emailBarAddress)} defaultValue={displayFormat} ref={(input) => { this.emailInput = input; }} />
          <span className={classnames('input-group-btn')}>
            <button className={classnames('btn btn-default', toolbarscss.emailBarSendBtn)} type="button" onClick={() => this.rejectOrFinishSending()}>OK</button>
          </span>
        </div>
      </div>
    );
  }

  renderInitVersion() {
    const { clientReference, propertyAddress, emailToPartyEmail } = this.props;
    const displayFormat = `${emailToPartyEmail}`;

    return (
        <div className={classnames('row')}>
          <div className={classnames('col-xs-4', toolbarscss.toolbarIcon)} style= {{ paddingLeft: '131px', paddingRight: '15px' }}>
            <span className={classnames(toolbarscss.btnSendImagSpan)}>{clientReference} - {propertyAddress}</span>
          </div>

          <div className={classnames('col-xs-6')} style={{ width: '62%' }}>
            <div className="row">
              <div className={classnames('col-xs-12', toolbarscss.sendNav)}>
                <div className="pull-right">
                  <div className={classnames('col-xs-6', this.state.showEmailBar ? toolbarscss.utlVisible : toolbarscss.utlInvisible)} style={{ width: '343px' }}>
                    <div className="input-group">
                      <input type="text" className={classnames('form-control', toolbarscss.emailBarAddress)} defaultValue={displayFormat} ref={(input) => { this.emailInput = input; }} />
                      <span className={classnames('input-group-btn')}>
                        <button className={classnames('btn btn-default', toolbarscss.emailBarSendBtn)} type="button" onClick={() => this.rejectOrFinishSending()}>OK</button>
                      </span>
                    </div>
                  </div>

                  <span className={classnames(toolbarscss.toolbarButtonPS)} style={{ paddingRight: '22px' }} onClick={() => this.showEmailBar('ACCEPT')}>
                        <Image src="/Toolbar/send.png" className={classnames(toolbarscss.toolbarImage)} />
                        <span className={classnames(toolbarscss.btnSendImagSpan)}>Accept</span>
                  </span>

                  <span className={classnames(toolbarscss.toolbarButtonPS)} onClick={() => this.showEmailBar('REJECT')}>
                        <Image src="/Toolbar/send.png" className={classnames(toolbarscss.toolbarImage)} />
                        <span className={classnames(toolbarscss.btnSendImagSpan)}>Send</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
  }

  renderUpdateVersion() {
    const { clientReference, propertyAddress } = this.props;
    return (
        <div>
          <div className={classnames('row')}>
            <div className={classnames('col-xs-6', toolbarscss.toolbarIcon)} style= {{ paddingLeft: '131px', paddingRight: '15px' }}>
              <span className={classnames(toolbarscss.btnSendImagSpan)}>{clientReference} - {propertyAddress}</span>
            </div>

            <div className={classnames('col-xs-6')} style={{ width: '44.6%' }}>
              <div className={classnames('row pull-right')}>
                <div className={classnames('col-xs-9')}>
                  <div className={classnames(this.state.showEmailBar ? toolbarscss.utlVisible : toolbarscss.utlInvisible)}>
                    {this.renderEmailBar(false)}
                  </div>
                </div>

                <div className={classnames('col-xs-1', toolbarscss.sendNav, this.state.showEmailSendButton ? 'hidden' : '')} onClick={() => this.showEmailBar()}>
                  <div className={classnames(toolbarscss.toolbarButtonPS)}>
                    <Image src="/Toolbar/send.png" className={classnames(toolbarscss.toolbarImage)} />
                    <span className={classnames(toolbarscss.btnSendImagSpan)}>Email</span>
                  </div>
                </div>

                <div className={classnames('col-xs-1', toolbarscss.sendNav, this.state.showEmailSendButton ? '' : 'hidden')} onClick={() => this.rejectOrFinishSending()}>
                  <div className={classnames(toolbarscss.toolbarButtonPS)}>
                    <Image src="/Toolbar/send.png" className={classnames(toolbarscss.toolbarImage)} />
                    <span className={classnames(toolbarscss.btnSendImagSpan)}>Send</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
  }

  renderBasedDocumentStatus() {
    const { documentStatus } = this.props;
    if (documentStatus === documentStatusConstant.ViewerInitReview
        || documentStatus === documentStatusConstant.Rejected
        || documentStatus === documentStatusConstant.Approved) {
      return (
        <div className={classnames('collapse navbar-collapse', toolbarscss.toolbarContent)}>
          {this.renderInitVersion()}
        </div>
      );
    }

    return (
      <div className={classnames('collapse navbar-collapse', toolbarscss.toolbarContent)}>
        {this.renderUpdateVersion()}
      </div>
    );
  }

  render() {
    const { documentStatus } = this.props;
    const topNavColor = documentStatus === documentStatusConstant.ApproveReview
                        || documentStatus === documentStatusConstant.Rejected
                        || documentStatus === documentStatusConstant.Approved ? toolbarscss.topNavDone : toolbarscss.topNav;
    return (
       <nav className={classnames('navbar navbar-static-top', topNavColor)}>
         {this.renderBasedDocumentStatus()}
         <Notification ref="notification" />
      </nav>
    );
  }
}


Toolbar.propTypes = {
  sections: PropTypes.array,
  documentId: PropTypes.number,
  approverId: PropTypes.number,
  documentStatus: PropTypes.string,
  purchaserSolicitorAcceptInitSP: PropTypes.func,
  purchaserSolicitorRejectInitSP: PropTypes.func,
  purchaserSolicitorFinishReview: PropTypes.func,
  clientReference: PropTypes.string,
  propertyAddress: PropTypes.string,
  isFinish: PropTypes.number,
  undoneSections: PropTypes.array,
  emailToPartyName: PropTypes.string,
  emailToPartyEmail: PropTypes.string,
  isNotifyEorror: PropTypes.number,
  isSending: PropTypes.number,
  modifiedSections: PropTypes.array
};

function mapStateToProps(state) {
  return {
    documentId: state.nswPurchaserSolicitor.documentId,
    approverId: state.nswPurchaserSolicitor.approverId,
    documentStatus: state.nswPurchaserSolicitor.documentStatus,
    clientReference: state.nswPurchaserSolicitor.clientReference,
    propertyAddress: state.nswPurchaserSolicitor.propertyAddress,
    isFinish: state.nswPurchaserSolicitor.isFinish,
    undoneSections: state.nswDocument.undoneSections,
    emailToPartyName: state.nswPurchaserSolicitor.emailToPartyName,
    emailToPartyEmail: state.nswPurchaserSolicitor.emailToPartyEmail,
    isNotifyEorror: state.nswPurchaserSolicitor.isNotifyEorror,
    isSending: state.nswPurchaserSolicitor.isSending,
    modifiedSections: state.nswDocument.modifiedSections
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ purchaserSolicitorAcceptInitSP, purchaserSolicitorRejectInitSP, purchaserSolicitorFinishReview }, dispatch);
}

// export default Toolbar;
export default connect(mapStateToProps, matchDispatchToProps)(Toolbar);
