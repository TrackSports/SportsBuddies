import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
// import dateFormat, { parseISOString } from 'utils/customizeDate';
// import dscss from './document.scss';
import Modal from 'app/components/UI/Modal';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { saveComment, hideCommentModal, saveCommentAndUpdateStatus } from 'features/nsw/actions/document';

class EventListModal extends Component {

  handleClose() {
    // this.props.hideCommentModal();
  }

  render() {
    return (
      <Modal customerClassName = "commentModal" show={ this.props.isShowEventListModal } onHide={() => this.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          { /* {this.renderComments(this.props.comments)}*/}
        </Modal.Body>
        <Modal.Footer>
          <button className={classnames('btn btn-default')} onClick={() => this.handleClose()}>Cancel</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EventListModal.propTypes = {
  isShowEventListModal: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    isShowEventListModal: state.sportToolbar.isShowEventListModal
  };
}

// function matchDispatchToProps(dispatch) {
//   return bindActionCreators({ saveComment, hideCommentModal, saveCommentAndUpdateStatus }, dispatch);
// }

export default connect(mapStateToProps, null)(EventListModal);
