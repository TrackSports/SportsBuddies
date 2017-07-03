import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Modal from 'app/components/UI/Modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeEventList } from 'features/sportevent/actions/toolbarAction';

class EventListModal extends Component {

  handleClose() {
    this.props.closeEventList();
  }

  renderJoinButton(isJoined) {
    if (!isJoined) {
      return (
        <button className="btn btn-success">Join</button>
      );
    }
  }

  renderEvents() {
    const { eventList } = this.props;
    return (
       <table className="table table-hover">
         <thead>
      <tr>
        <th>title</th>
        <th>location</th>
        <th>category</th>
        <th>day</th>
        <th>start</th>
        <th>duration</th>
        <th>join</th>
      </tr>
    </thead>
      <tbody>
        {eventList.map(d => {
          return (
            <tr key={d.name}>
              <td>{d.name}</td>
              <td>{d.location}</td>
              <td>{d.category}</td>
              <td>{d.weekday}</td>
              <td>{d.startTime}</td>
              <td>{d.duration}</td>
              <td>{this.renderJoinButton(d.isJoined)}</td>
            </tr>
          );})}
          </tbody>
        </table>
     );
  }

  render() {
    return (
      <Modal customerClassName = "commentModal" show={ this.props.isShowEventListModal } onHide={() => this.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>event</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          { this.renderEvents() }
        </Modal.Body>
        <Modal.Footer>
          <button className={classnames('btn btn-default')} onClick={() => this.handleClose()}>Cancel</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EventListModal.propTypes = {
  isShowEventListModal: PropTypes.bool,
  eventList: PropTypes.array,
  closeEventList: PropTypes.func
};

function mapStateToProps(state) {
  return {
    isShowEventListModal: state.sportToolbar.isShowEventListModal,
    eventList: state.sportToolbar.eventList
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ closeEventList }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(EventListModal);
