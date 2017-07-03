import React, { Component } from 'react';
// import classnames from 'classnames';
// import { connect } from 'react-redux';
// import Spinner from 'share/Spinner';
// import ActionSpinner from 'share/ActionSpinner';
// import { bindActionCreators } from 'redux';
import EventDetail from './EventDetail';
import Toolbar from './toolbar';
import YourEvent from './YourEvent';

export default class SportEvent extends Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//   }

//   componentWillReceiveProps(nextProps) {
//   }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Toolbar />
        </div>
        <div className="row">
          <div className="col-xs-4">
            <EventDetail />
          </div>
          <div className="col-xs-8">
            <YourEvent />
          </div>
        </div>
      </div>
    );
  }
}
