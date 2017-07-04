import React, { Component, PropTypes } from 'react';
// import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEventList, createEvent } from 'features/sportevent/actions/toolbarAction';
import EventListModal from './EventListModal';
import NewEventModal from './NewEventModal';

export class Toolbar extends Component {

  handleSubmit(e) {
    e.preventDefault();
  }

  showEventList() {
    this.props.getEventList();
  }

  createEvent() {
    this.props.createEvent();
  }

  render() {
    return (
     <div>
          <div className="">
            <div className="barIcon">
              <a className="navbar-brand" href="#">Sport</a>
            </div>
            <div className="barMenu" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><a onClick={() => this.showEventList() }>event list</a></li>
                <li><a onClick={() => this.createEvent() }>create your own</a></li>
              </ul>
            </div>
            <div className="barSearch">
              <form className="navbar-form navbar-left">
                <div className="form-group">
                  <input type="text" className=" form-control barSearchField" placeholder="Search" />
                </div>
              </form>
            <div className="barMenu" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><a onClick={() => this.showEventList() }>event list</a></li>
                <li><a onClick={() => this.createEvent() }>create your own</a></li>
              </ul>
            </div>

          </div>
        <EventListModal />
        <NewEventModal />
      </div>
    );
  }
}

Toolbar.propTypes = {
  getEventList: PropTypes.func,
  createEvent: PropTypes.func
};

// function mapStateToProps(state) {
//   return {
//     isShowEventListModal: state.nswDocument.isShowCommentModal
//   };
// }

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getEventList, createEvent }, dispatch);
}

export default connect(null, matchDispatchToProps)(Toolbar);
