import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import dscss from './document.scss';
import Modal from 'app/components/UI/Modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentStatusConstant from 'features/nsw/constants/documentStatus';
import { hideUserActivityModal } from 'features/nsw/actions/document';
import uuidGenerator from 'node-uuid';

class UserActivityModal extends Component {

  handleClose = () => this.props.hideUserActivityModal();

  printActivityLog = () => {
    // get DIV content as clone
    const divContents = $('.UserActivityModal').clone();
    // detatch DOM body
    const body = $('body').detach();
    // create new body to hold just the DIV contents
    document.body = document.createElement('body');
    // add DIV content to body
    divContents.appendTo($('body'));
    // print body
    window.print();
    // remove body with DIV content
    $('html body').remove();
    // attach original body
    body.appendTo($('html'));
  }

  renderActivities() {
    const groupedActivities = this.props.activities;
    if (groupedActivities.length > 0) {
      return (
        <div style={{ width: '97.5%' }} >
          {groupedActivities.map(activities => {
            const uuidForA = uuidGenerator();
            return (
              <div key={uuidForA}>
                <p className={classnames(dscss.activityGroupByDateSection)}>{activities[0].createAt.format('D/MM/YY')}</p>
                {this.renderActivity(activities)}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div>No activity found.</div>
    );
  }

  renderActivity(activities) {
    return (
      <div>
        {activities.map(a => {
          const uuidForA = uuidGenerator();
          return (
            <div className={classnames(dscss.activitySection)} key={uuidForA}>
              {this.renderEachAction(a)}
            </div>
          );
        })}
      </div>
    );
  }

  renderEachAction(activity) {
    const { action, actorName, recepientName, comment, currentContent, sectionId, sectionStatus } = activity;
    const createAt = activity.createAt.format('D/MM/YY h:mm:ss A');
    const sectionOrder = sectionId ? `section ${sectionId}` : 'Title';

    if (action) {
      return (
        <div>
          <p className={classnames(dscss.actionMsg)}><span className={classnames(dscss.actorName)}>{actorName}</span>
          {action} <span className={classnames(dscss.actorName)}>{recepientName}</span>
          </p>
          <p className={classnames(dscss.actionTime)}>{createAt}</p>
        </div>
      );
    }

    if (comment) {
      return (
        <div>
          <p className={classnames(dscss.actionMsg)}>
            <span className={classnames(dscss.actorName)}>{actorName}</span>
            left a comment on {sectionOrder} to "{comment}"
          </p>
          <p className={classnames(dscss.actionTime)}>{createAt}</p>
        </div>
      );
    }

    if (currentContent) {
      if (sectionStatus === documentStatusConstant.Accept || sectionStatus === documentStatusConstant.AcceptReject) {
        return (
          <div>
            <p className={classnames(dscss.actionMsg)}>
              <span className={classnames(dscss.actorName)}>{actorName}</span>
              accepted the change of {sectionOrder} to "{currentContent}"
            </p>
            <p className={classnames(dscss.actionTime)}>{createAt}</p>
          </div>
        );
      }

      if (sectionStatus === documentStatusConstant.Reject) {
        return (
          <div>
            <p className={classnames(dscss.actionMsg)}>
              <span className={classnames(dscss.actorName)}>{actorName}</span>
              rejected the change of {sectionOrder} to "{currentContent}"
            </p>
            <p className={classnames(dscss.actionTime)}>{createAt}</p>
          </div>
        );
      }

      if (sectionStatus === documentStatusConstant.Discuss) {
        return (
          <div>
            <p className={classnames(dscss.actionMsg)}>
              <span className={classnames(dscss.actorName)}>{actorName}</span>
              modified {sectionOrder} to "{currentContent}"
            </p>
            <p className={classnames(dscss.actionTime)}>{createAt}</p>
          </div>
        );
      }

      if (sectionStatus === documentStatusConstant.CounterOffer) {
        return (
          <div>
            <p className={classnames(dscss.actionMsg)}>
              <span className={classnames(dscss.actorName)}>{actorName}</span>
              asked a counteroffer for {sectionOrder}
            </p>
            <p className={classnames(dscss.actionTime)}>{createAt}</p>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <Modal customerClassName = "UserActivityModal" show={this.props.showUserActivityModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          { this.renderActivities() }
        </Modal.Body>
        <Modal.Footer>
          <button className={classnames('btn btn-default', dscss.commentCancelBtn)} onClick={this.handleClose}>Cancel</button>
          <button className={classnames('btn btn-primary', dscss.btnColor)} onClick={this.printActivityLog}>Print</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

UserActivityModal.propTypes = {
  showUserActivityModal: PropTypes.bool,
  hideUserActivityModal: PropTypes.func,
  activities: PropTypes.array
};

function mapStateToProps(state) {
  return {
    showUserActivityModal: state.nswDocument.showUserActivityModal,
    activities: state.nswDocument.activities
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ hideUserActivityModal }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(UserActivityModal);
