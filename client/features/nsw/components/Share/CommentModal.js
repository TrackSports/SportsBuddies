import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import dateFormat, { parseISOString } from 'utils/customizeDate';
import dscss from './document.scss';
import Modal from 'app/components/UI/Modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveComment, hideCommentModal, saveCommentAndUpdateStatus } from 'features/nsw/actions/document';

class CommentModal extends Component {

  handleClose() {
    this.props.hideCommentModal();
  }

  saveComments() {
    const { sid, sectionIdentify, partyId, partyName, partyRole, beforeRejectSections, documentId } = this.props;

    if (this.refs.newComment.value) {
      const payload = {
        sid,
        sectionIdentify,
        modifiedByPartyId: partyId,
        comments: [{
          name: partyName,
          partyRole,
          content: this.refs.newComment.value
        }],
        documentId
      };

      if (beforeRejectSections.indexOf(sectionIdentify) > -1) {
        this.props.saveCommentAndUpdateStatus(payload);
      } else {
        this.props.saveComment(payload);
      }
      // set textarea be blank after save
      this.refs.newComment.value = '';
    }
  }

  renderComments (comments) {
    if (!comments) {
      return (
        <p>No comments yet</p>
      );
    }

    return (
     <div className={classnames(dscss.commentContainer)}>
        { comments.map((comment, index) => {
          const createTime = dateFormat(parseISOString(comment.createAt));

          return (
            <div key={index} className={classnames(dscss.commentSection)}>
              <pre className={classnames(dscss.commentContent)}>{ comment.content}</pre>
              <div className={classnames(dscss.commentNameAndDate)}>
                <span>{ comment.name } </span>
                <span>{ createTime }</span>
              </div>
            </div>
          );
        })}
    </div>
    );
  }

  render() {
    return (
      <Modal customerClassName = "commentModal" show={ this.props.isShowCommentModal } onHide={() => this.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          {this.renderComments(this.props.comments)}
          <div className={classnames(dscss.commentTextAreaSection)}>
            <textarea className={classnames(dscss.commentTextArea)} ref="newComment" rows="4" cols="50"></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className={classnames('btn btn-default', dscss.commentCancelBtn)} onClick={() => this.handleClose()}>Cancel</button>
          <button className="btn btn-primary" onClick={(e) => this.saveComments(e)}>Save</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CommentModal.propTypes = {
  isShowCommentModal: PropTypes.bool,
  hideCommentModal: PropTypes.func,
  comments: PropTypes.array,
  partyId: PropTypes.number,
  partyRole: PropTypes.string,
  partyName: PropTypes.string,
  saveComment: PropTypes.func,
  sid: PropTypes.number,
  sectionIdentify: PropTypes.string,
  beforeRejectSections: PropTypes.array,
  saveCommentAndUpdateStatus: PropTypes.func,
  documentId: PropTypes.number
};

function mapStateToProps(state) {
  return {
    isShowCommentModal: state.nswDocument.isShowCommentModal,
    comments: state.nswDocument.sectionComment,
    partyRole: state.nswDocument.partyRole,
    partyName: state.nswDocument.partyName,
    partyId: state.nswDocument.partyId,
    sid: state.nswDocument.commentSid,
    sectionIdentify: state.nswDocument.commentSectionIdentify,
    beforeRejectSections: state.nswDocument.beforeRejectSections,
    documentId: state.nswDocument.documentId
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ saveComment, hideCommentModal, saveCommentAndUpdateStatus }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CommentModal);
