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
import { getUserId } from 'features/sportevent/actions/toolbarAction';

class SportEvent extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      userId: ''
    };
  }

  componentDidMount() {
    const { params: { accessCode } } = this.props;
    const username = accessCode.replace('-', '.');
    this.props.getAllRelatedEvent(username);
    this.props.getUserId(username);
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
  getUserId: PropTypes.func,
  params: PropTypes.object
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getAllRelatedEvent, getUserId }, dispatch);
}

export default connect(null, matchDispatchToProps)(SportEvent);
