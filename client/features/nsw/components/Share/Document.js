import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dscss from './document.scss';
import DocumentSection from './DocumentSection';
import CommentModal from './CommentModal';
import UserActivityModal from './UserActivityModal';
import ActionSpinner from 'share/ActionSpinner';
import Notification from 'share/Notification';
import * as statusConstant from 'features/nsw/constants/documentStatus';
import * as sectionTypeConstant from 'features/nsw/constants/documentType';
import { solicitorAcceptSection,
  solicitorRejectSection,
  solicitorAddUndoneSection,
  solicitorRemoveUndoneSection,
  showCommentModal,
  solicitorCounterOfferSection,
  showUserActivityModal } from 'features/nsw/actions/document';
import { purchaserSolicitorAcceptRejection } from 'features/nsw/actions/purchaserSolicitor';
import Image from 'share/Image';
import autosize from 'autosize';


class Document extends Component {

  componentDidMount() {
    autosize(document.querySelectorAll('textarea'));
  }

  getComments(sid, sectionIdentify) {
    const payload = {
      sid,
      sectionIdentify
    };
    this.props.showCommentModal(payload);
  }

  acceptSection(sectionId, parentId, identify) {
    this.props.solicitorRemoveUndoneSection(identify);
    const payload = {
      sectionId,
      parentSectionId: parentId,
      partyId: this.props.currentPartyId,
      sectionIdentify: identify,
      documentId: this.props.documentId
    };

    this.props.solicitorAcceptSection(payload);
  }

  rejecSection(sectionId, parentId, identify, uniqueId) {
    // user need put comment before trigger the reject action
    if (this.props.beforeRejectSections.indexOf(identify) > -1) {
      this.getComments(uniqueId, identify);
    }
  }

  acceptRejection(content) {
    // meaning the rejection has been accepted
    const { documentId, currentPartyId } = this.props;
    const payload = {
      documentId,
      partyId: currentPartyId,
      originalValue: content.content,
      newValue: content.previousContent,
      parentId: content.previousContent,
      sectionType: content.sectionType,
      sectionId: content.sectionId,
      sectionStatus: statusConstant.Accept,
      identify: content.identify,
      isAcceptReject: true
    };
    this.props.purchaserSolicitorAcceptRejection(payload);
  }

  showUserActivity() {
    const { documentId } = this.props;
    this.props.showUserActivityModal(documentId);
  }

  counterOffer(sectionId, parentId, identify) {
    this.props.solicitorRemoveUndoneSection(identify);
    const payload = {
      sectionId,
      parentSectionId: parentId,
      sectionIdentify: identify,
      partyId: this.props.currentPartyId,
      documentId: this.props.documentId
    };
    this.props.solicitorCounterOfferSection(payload);
  }

  renderReadOnlyContent(id, content, sectionType, isPrevious) {
    let spaceBlock = { width: '11%' };
    let actionBarWidth = 'col-xs-9';

    if (sectionType === sectionTypeConstant.subSection) {
      spaceBlock = { width: '17.5%' };
      actionBarWidth = 'col-xs-8';
    }
    if (sectionType === sectionTypeConstant.subSubSection) {
      spaceBlock = { width: '23.5%' };
      actionBarWidth = 'col-xs-7';
    }

    return (
        <div className={classnames('row')}>
          <div className={classnames('col-xs-1')} style={spaceBlock}></div>
          <div className={classnames(actionBarWidth, isPrevious ? dscss.previousContent : dscss.currentContent)}>
            <div className={classnames('col-xs-1')}>
                <span>{id}</span>
            </div>
            <div className={classnames('col-xs-9')}>
                <textarea className={classnames(dscss.documentSectionTextarea)} readOnly value= {content}></textarea>
            </div>
          </div>
        </div>
    );
  }

  renderPreviousContent(content, parentId, sectionType, isReadOnly) {
    const { documentId, currentPartyId, documentStatus } = this.props;
    let previousContent = this.renderReadOnlyContent(content.sectionId, content.previousContent, sectionType, true);
    if (!isReadOnly) {
      previousContent = <DocumentSection ref={content.sectionId} content={content} parentId={parentId} documentId={documentId} currentPartyId={currentPartyId} documentStatus={documentStatus} sectionStatus={content.sectionStatus} sectionType={sectionType} />;
    }

    return (
        <div>
          {previousContent}
        </div>
    );
  }

  renderCurrentContent(content, parentId, showChange, showActionBar, sectionType, isReadOnly) {
    const { documentId, currentPartyId, documentStatus, partyRole } = this.props;
    const RejectButton = partyRole === 'viewer' ? 'Counter Offer' : 'Reject';
    if (showChange) {
      return (
         <div>
              <DocumentSection ref={content.sectionId} content={content} parentId={parentId} documentId={documentId} currentPartyId={currentPartyId} documentStatus={documentStatus} sectionStatus={content.sectionStatus} sectionType={sectionType} />
          </div>
       );
    }

    let currentContent = this.renderReadOnlyContent(content.sectionId, content.content, sectionType, false);
    if (!isReadOnly) {
      currentContent = <DocumentSection ref={content.sectionId} content={content} parentId={parentId} documentId={documentId} currentPartyId={currentPartyId} documentStatus={documentStatus} sectionStatus={content.sectionStatus} sectionType={sectionType} />;
    }
    return (
       <div>
          <div>
            {currentContent}
          </div>
          <div className={classnames(dscss.actionBar, showActionBar ? '' : 'hidden')}>
              <span className={classnames(dscss.action, dscss.actionReject)} onClick={() => this.rejecSection(content.sectionId, parentId, content.identify, content.id)}>{RejectButton}</span>
              <span className={classnames(dscss.action, dscss.actionAccept)} onClick={() => this.acceptSection(content.sectionId, parentId, content.identify)}>Accept</span>
              <div className={classnames(dscss.commentBtnDivForDiscuss)} >
              <Image src="/Toolbar/comment.png" className={classnames(dscss.commentIconForDiscuss)} onClick={() => this.getComments(content.id, content.identify)} />
              </div>
          </div>
       </div>
    );
  }

  renderCounterOffer(content, parentId, sectionType) {
    return (
       <div>
          <div>
            {this.renderReadOnlyContent(content.sectionId, content.content, sectionType, false)}
          </div>
          <div className={classnames(dscss.actionBar)}>
              <span className={classnames(dscss.action, dscss.actionReject)} onClick={() => this.counterOffer(content.sectionId, parentId, content.identify, content.id)}>Counter Offer</span>
              <span className={classnames(dscss.action, dscss.actionAccept)} onClick={() => this.acceptRejection(content)}>Accept</span>
              <div className={classnames(dscss.commentBtnDivForDiscuss)} >
              <Image src="/Toolbar/comment.png" className={classnames(dscss.commentIconForDiscuss)} onClick={() => this.getComments(content.id, content.identify)} />
              </div>
          </div>
       </div>
    );
  }

  renderDisplayContent(content, parentId, sectionType) {
    const { documentStatus, currentPartyId, partyRole } = this.props;
    const displayContent = {};
    displayContent.previous = null;
    displayContent.current = null;
    // current content
    displayContent.current = this.renderCurrentContent(content, parentId, true, false, sectionType);

    if (content.previousContent && content.previousContent !== content.content
        && content.lastModifiedBy && content.lastModifiedBy !== currentPartyId) {
      displayContent.previous = this.renderPreviousContent(content, parentId, sectionType, true);
      displayContent.current = this.renderCurrentContent(content, parentId, false, true, sectionType, true);
    }

    if (content.sectionStatus === statusConstant.Accept) {
      displayContent.previous = null;
      displayContent.current = this.renderCurrentContent(content, parentId, false, false, sectionType, false);
    }

    if (content.sectionStatus === statusConstant.Reject) {
      displayContent.previous = this.renderPreviousContent(content, parentId, sectionType, false);
      displayContent.current = null;
       // we always show accept/counter offer in ps
      if (partyRole === 'viewer' && content.lastModifiedBy && content.lastModifiedBy === currentPartyId) {
        displayContent.previous = this.renderPreviousContent(content, parentId, sectionType, true);
        displayContent.current = this.renderCounterOffer(content, parentId, sectionType);
      }
    }

    if (content.sectionStatus === statusConstant.CounterOffer) {
      displayContent.previous = this.renderPreviousContent(content, parentId, sectionType, false);
      displayContent.current = null;
    }

      /* this is because for the first time viewer review the document, no modified needed */
    if (documentStatus === statusConstant.ViewerInitReview) {
      displayContent.previous = null;
      displayContent.current = this.renderCurrentContent(content, parentId, true, false, sectionType, false);
    }

    return displayContent;
  }

  renderSubSubSection(subsections, parentId) {
    if (subsections) {
      return (
        <div>
          {subsections.map(d => {
            const displayContent = this.renderDisplayContent(d, parentId, sectionTypeConstant.subSubSection);

            return (
             <div className={classnames('row', dscss.rowGap)} key={d.identify}>
                <div className={classnames('col-xs-12', dscss.subSubSectionRow)}>
                  { displayContent.previous }
                  { displayContent.current }
                </div>
              </div>
            );
          })
          }
        </div>
      );
    }
  }

  renderSubsections (subSections, parentId) {
    // const { documentId, currentPartyId, documentStatus } = this.props;
    return (
      <div>
        {subSections.map(d => {
          const displayContent = this.renderDisplayContent(d.content, parentId, sectionTypeConstant.subSection);
          return (
            <div key={d.content.identify}>
              <div className={classnames('row', dscss.rowGap)}>
                  <div className={classnames('col-xs-12', dscss.subSectionRow)}>
                     { displayContent.previous }
                     { displayContent.current }
                </div>
              </div>
              {this.renderSubSubSection(d.subSections, d.content.sectionId)}
            </div>
          );
        })}
      </div>
    );
  }

  renderSections(sections) {
    return (
      <div className={classnames('container-fluid')}>
      {sections.map(d => {
        const displayContent = this.renderDisplayContent(d.content, null, sectionTypeConstant.section);

        return (
          <div key={d.content.identify}>
            <div className={classnames('row', dscss.rowGap)}>
                { displayContent.previous }
                { displayContent.current }
            </div>
            {this.renderSubsections(d.subSections, d.content.sectionId)}
          </div>
        );
      })}
      </div>
    );
  }

  renderContractIframe() {
    let src = this.props.documentLocationUrl;
    if ((src || '').indexOf('null') > 0) {
      src = '';
    }
    if (src) {
      src = `${src}#scrollbar=0&navpanes=1&zoom=100&toolbar=0`;
    }

    return (
              <iframe
                ref="iframe"
                src={src}
                type="application/pdf"
                style={{ width: '100%',
                         height: '100%',
                         border: '1px solid #ddd' }}
              />
    );
  }

  render() {
    const { sections } = this.props;
    let sectionRender = null;
    if (sections) {
      sectionRender = this.renderSections(sections);
    }
    const IframeHeight = `${$(window).height() * 0.8}px`;

    return (
      <div>
        <div className={classnames('container-fluid', dscss.documentContainer, dscss.documentContent)}>
          <div className="row">
            <div className={classnames('col-xs-11', dscss.activityBtnCol)} style={{ width: '95.4%', textAlign: 'right' }}>
              <button className={classnames('btn btn-primary', dscss.btnColor)} onClick={() => this.showUserActivity()}>Activity</button>
            </div>
          </div>

          <div className="row">
              <div className={classnames('col-xs-6', dscss.documentSectionWrapper)} style= {{ height: IframeHeight, background: '#FFF' }}>
                {sectionRender}
              </div>
              <div className={classnames('col-xs-6', dscss.documentIframeWidth)} style={{ height: IframeHeight }}>
                {this.renderContractIframe()}
              </div>
          </div>
          <CommentModal />
          <UserActivityModal />
          <Notification ref="notification" />
        </div>
        <ActionSpinner isShowSpinner={this.props.isShowSpinner} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sections: state.nswDocument.specialConditions,
    documentId: state.nswDocument.documentId,
    currentPartyId: state.nswDocument.partyId,
    documentStatus: state.nswDocument.documentStatus,
    partyRole: state.nswDocument.partyRole,
    documentLocationUrl: state.nswDocument.documentLocationUrl,
    beforeRejectSections: state.nswDocument.beforeRejectSections,
    isShowSpinner: state.nswDocument.isShowSpinner
  };
}


Document.propTypes = {
  sections: PropTypes.array,
  documentId: PropTypes.number,
  partyRole: PropTypes.string,
  currentPartyId: PropTypes.number,
  documentStatus: PropTypes.string,
  solicitorAcceptSection: PropTypes.func,
  solicitorRejectSection: PropTypes.func,
  solicitorAddUndoneSection: PropTypes.func,
  solicitorRemoveUndoneSection: PropTypes.func,
  solicitorCounterOfferSection: PropTypes.func,
  purchaserSolicitorAcceptRejection: PropTypes.func,
  showCommentModal: PropTypes.func,
  documentLocationUrl: PropTypes.string,
  beforeRejectSections: PropTypes.array,
  showUserActivityModal: PropTypes.func,
  isShowSpinner: PropTypes.bool
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ solicitorAcceptSection, solicitorRejectSection, solicitorAddUndoneSection, solicitorRemoveUndoneSection, showCommentModal, purchaserSolicitorAcceptRejection, solicitorCounterOfferSection, showUserActivityModal }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Document);
