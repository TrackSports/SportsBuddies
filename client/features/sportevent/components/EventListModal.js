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

  renderEvents() {
    const { eventList } = this.props;
    return (
       <div>
           {eventList.map(d => {
             return (
              <div className = "row" key={d.name}>
                <div className = "col-xs-2">{d.name}</div>
                <div className = "col-xs-4">{d.location}</div>
                <div className = "col-xs-2">{d.time}</div>
                <div className = "col-xs-2">{d.isJoined}</div>
              </div>
            );})}
        </div>
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
