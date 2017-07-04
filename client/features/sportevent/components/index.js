import React, { Component, PropTypes } from 'react';
// import classnames from 'classnames';
import { connect } from 'react-redux';
// import Spinner from 'share/Spinner';
// import ActionSpinner from 'share/ActionSpinner';
import { bindActionCreators } from 'redux';
import EventDetail from './EventDetail';
import Toolbar from './toolbar';
import YourEvent from './YourEvent';
import { getAllRelatedEvent } from 'features/sportevent/actions/eventDetailAction';

class SportEvent extends Component {

  componentDidMount() {
    const { params: { accessCode } } = this.props;
    const username = accessCode.replace('-', '.');
    this.props.getAllRelatedEvent(username);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="header">
          <Toolbar />
        </div>
        <div className="midbody">
          <div className="sidebar">
            <YourEvent />
          </div>
          <div className="mainContent">
            <EventDetail />
          </div>
        </div>
      </div>
    );
  }
}

SportEvent.propTypes = {
  getAllRelatedEvent: PropTypes.func,
  params: PropTypes.object
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getAllRelatedEvent }, dispatch);
}

export default connect(null, matchDispatchToProps)(SportEvent);
