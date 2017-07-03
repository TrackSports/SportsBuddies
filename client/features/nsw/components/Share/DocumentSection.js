import React, { Component, PropTypes } from 'react';
import dscss from './document.scss';
import classnames from 'classnames';
import { solicitorUpdateSection, showCommentModal } from 'features/nsw/actions/document';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Notification from 'share/Notification';
import * as documentStatusConstant from 'features/nsw/constants/documentStatus';
import * as documentTypeConstant from 'features/nsw/constants/documentType';
import Image from 'share/Image';
import autosize from 'autosize';

class SectionInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hover_flag: false,
      click_flag: false,
      isEditable_flag: false,
      isFinishEditing_flag: false,
      showComment_flag: false,
      putFinishFlagBack: false
    };
  }

  componentDidMount() {
    autosize(this.textarea);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isNotifyEorror !== this.props.isNotifyEorror && nextProps.isNotifyEorror) {
      this.refs.notification.addNotification('Error occurs! Please try again', 'error');
    }
  }

  componentDidUpdate() {

  }

  getComments(sid, sectionIdentify) {
    const payload = {
      sid,
      sectionIdentify
    };
    this.props.showCommentModal(payload);
  }


  setEachSectionStyle(status, sectionType, sectionId) {
    const sectionStyle = {
      backgoundClass: dscss.unchangedContent,
      indentGap: '',
      contentIdDisplay: '',
      contentSectionWidth: 'col-xs-10'
    };

    if (status === documentStatusConstant.Reject || status === documentStatusConstant.CounterOffer) {
      sectionStyle.backgoundClass = dscss.previousContent;
    }
    if (status === documentStatusConstant.Accept) {
      sectionStyle.backgoundClass = dscss.currentContent;
    }

    // section has 4 different level, according to different level, the section style will be different
    let contentIdPadding = null;
    if (!sectionId) {
      sectionStyle.contentSectionWidth = 'col-xs-10 col-sm-12';
    }
    if (sectionType === documentTypeConstant.section) {
      sectionStyle.contentSectionWidth = 'col-xs-9 col-sm-10 col-lg-11';
    }
    if (sectionType === documentTypeConstant.subSection) {
      sectionStyle.contentSectionWidth = 'col-xs-8 col-sm-8 col-lg-10';
      sectionStyle.indentGap = <div className={classnames('col-xs-1')}></div>;
    }
    if (sectionType === documentTypeConstant.subSubSection) {
      sectionStyle.contentSectionWidth = 'col-xs-7 col-sm-7 col-lg-8';
      sectionStyle.indentGap = <div className={classnames('col-xs-2')}></div>;
      contentIdPadding = { paddingRight: '28px' };
    }

    // render content Id
    if (sectionId) {
      sectionStyle.contentIdDisplay = <div className={classnames('col-xs-1')} style={contentIdPadding}><span>{sectionId}</span></div>;
    }
    return sectionStyle;
  }

  isSectionEditable() {
    let isEditEnable = true;

    if (this.props.partyRole === 'approver') {
      if (this.props.documentStatus === documentStatusConstant.ViewerReview
          || this.props.documentStatus === documentStatusConstant.ViewerInitReview) {
        isEditEnable = false;
      }
    }

    if (this.props.partyRole === 'viewer') {
      if (this.props.documentStatus === documentStatusConstant.ApproveReview
          || this.props.documentStatus === documentStatusConstant.Rejected
          || this.props.documentStatus === documentStatusConstant.Approved
          || status === documentStatusConstant.CounterOffer) {
        isEditEnable = false;
      }
    }

    // ticket: web-2638
    // if (this.props.documentStatus === documentStatusConstant.ViewerInitReview) {
    //   isEditEnable = false;
    // }

    return isEditEnable;
  }

  hoverEvent(hover) {
    if (this.isSectionEditable()) {
      this.setState({
        hover_flag: hover,
        showComment_flag: hover
      });
    }

    // M: solve the unsend and edit show at the same time issue
    // M: save isFinish state in a flag and use it to switch the state
    if (this.state.isFinishEditing_flag && hover) {
      this.setState({
        putFinishFlagBack: this.state.isFinishEditing_flag,
        isFinishEditing_flag: false
      });
    }

    if (this.state.putFinishFlagBack && !hover) {
      this.setState({
        isFinishEditing_flag: true
      });
    }
  }

  subsectionSaveClick(event, sectionId) {
    if (this.textarea.defaultValue !== this.textarea.value) {
      this.setState({ click_flag: false, hover_flag: false, isFinishEditing_flag: true });
      const payload = {
        documentId: this.props.documentId,
        partyId: this.props.currentPartyId,
        originalValue: this.textarea.defaultValue,
        newValue: this.textarea.value,
        parentId: this.props.parentId,
        sectionType: this.props.sectionType,
        sectionId,
        sectionStatus: documentStatusConstant.Discuss,
        identify: this.props.content.identify
      };

      this.props.solicitorUpdateSection(payload);
    }

    this.setState({ click_flag: false, hover_flag: false, isEditable_flag: false });
  }

  renderDisplaySpan(status) {
    const sectioNStatusDisplay = {};

    sectioNStatusDisplay.text = this.props.content.content;
    sectioNStatusDisplay.style = {
      backgroundColor: 'none'
    };

    if (status === documentStatusConstant.Reject || status === documentStatusConstant.CounterOffer) {
      sectioNStatusDisplay.style = {
        backgroundColor: '#FFF1F2'
      };

      if (this.props.content.previousContent !== this.props.content.content) {
        sectioNStatusDisplay.text = this.props.content.previousContent;
      }
    } else if (status === documentStatusConstant.Accept) {
      sectioNStatusDisplay.style = {
        backgroundColor: '#F1FEF5'
      };
    }
    return sectioNStatusDisplay;
  }

  renderBlockquotoStyle() {
    const bqStyle = {};
    bqStyle.editingquoteLeft = '';
    bqStyle.editingquoteRight = '';
    bqStyle.editingquoteText = '';
    bqStyle.editablequoteLeft = '';
    bqStyle.editablequoteRight = '';
    bqStyle.editablequoteText = '';
    bqStyle.unsendquoteLeft = '';
    bqStyle.unsendquoteRight = '';
    bqStyle.unsendquoteText = '';

    if (this.state.click_flag) {
      bqStyle.editingquoteLeft = dscss.editingquoteLeft;
      bqStyle.editingquoteRight = dscss.editingquoteRight;
      bqStyle.editingquoteText = 'Editing';
    }

    if (this.state.hover_flag) {
      bqStyle.editablequoteLeft = dscss.editablequoteLeft;
      bqStyle.editablequoteRight = dscss.editablequoteRight;
      if (bqStyle.editingquoteText !== 'Editing' && bqStyle.editingquoteText !== 'Unsent') {
        bqStyle.editablequoteText = 'Edit';
      }
    }

    if (this.state.isFinishEditing_flag) {
      bqStyle.unsendquoteLeft = dscss.unsendquoteLeft;
      bqStyle.unsendquoteRight = dscss.unsendquoteRight;
      bqStyle.unsendquoteText = 'Unsent';
    }

    if (!this.isSectionEditable() && this.state.isFinishEditing_flag) {
      bqStyle.unsendquoteLeft = dscss.sendquoteLeft;
      bqStyle.unsendquoteRight = dscss.sendquoteRight;
      bqStyle.unsendquoteText = 'Sent';
    }
    return bqStyle;
  }

  render() {
    const { sectionStatus, hasLatestComment, sectionId } = this.props.content;
    const sectionType = this.props.sectionType;

    // display section status and text
    const displaySectionStatus = this.renderDisplaySpan(sectionStatus);

    // set blockquote style
    const bqStyle = this.renderBlockquotoStyle();

    // check the status
    const textareaReadonly = {};
    if (!this.isSectionEditable()) {
      textareaReadonly.readOnly = 'readOnly';
    }

    // set each section style
    const { backgoundClass, contentSectionWidth, contentIdDisplay, indentGap } = this.setEachSectionStyle(sectionStatus, sectionType, sectionId);

    // show comment icon
    let commentDivClass = dscss.hiddenElement;
    if (this.state.showComment_flag || hasLatestComment) {
      commentDivClass = dscss.commentBtnDiv;
    }

    return (
      <div>
        <div className={classnames('row')} onMouseEnter={() => this.hoverEvent(true)} onMouseLeave={() => this.hoverEvent(false)}>

          <div className={classnames('col-xs-2 col-sm-2 col-lg-1', dscss.blockquoteSection)}>
            <span className={classnames(bqStyle.editingquoteLeft, bqStyle.editablequoteLeft, bqStyle.unsendquoteLeft, dscss.blockquoteSpanFirst)}>
            {bqStyle.editingquoteText}{bqStyle.editablequoteText}{bqStyle.unsendquoteText}
            </span>
          </div>

          <div className={classnames('col-xs-7 col-sm-8 col-lg-9', backgoundClass)}>
            <div className={classnames('row')}>
              {indentGap}
              {contentIdDisplay}
              <div className={classnames(contentSectionWidth)}>
                <textarea ref={(input) => { this.textarea = input; }} defaultValue={displaySectionStatus.text} onBlur={(e) => this.subsectionSaveClick(e, this.props.content.sectionId)}
                  className={classnames(dscss.documentSectionTextarea, backgoundClass, 'cursor-pointer')} {...textareaReadonly}
                ></textarea>
              </div>
            </div>
          </div>

          <div className={classnames('col-xs-1')}>
            <div className={classnames(commentDivClass)} onClick={() => this.getComments(this.props.content.id, this.props.content.identify)}>
              <Image src="/Toolbar/comment.png" className={classnames(dscss.commentIcon)} />
            </div>
          </div>
        </div>
        <Notification ref="notification" />
      </div>
  );
  }
}

SectionInput.propTypes = {
  solicitorUpdateSection: PropTypes.func,
  parentId: PropTypes.string,
  sectionType: PropTypes.string,
  documentId: PropTypes.number,
  currentPartyId: PropTypes.number,
  documentStatus: PropTypes.string,
  content: PropTypes.object,
  partyRole: PropTypes.string,
  showCommentModal: PropTypes.func,
  sid: PropTypes.number,
  isShowCommentIcon: PropTypes.bool,
  isNotifyEorror: PropTypes.number
};

function mapStateToProps(state) {
  return {
    partyRole: state.nswDocument.partyRole,
    isNotifyEorror: state.nswDocument.isNotifyEorror
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ solicitorUpdateSection, showCommentModal }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SectionInput);
