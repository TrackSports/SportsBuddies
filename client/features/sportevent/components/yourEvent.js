import React, { Component } from 'react';
// import classnames from 'classnames';
// import { connect } from 'react-redux';
// import Spinner from 'share/Spinner';
// import ActionSpinner from 'share/ActionSpinner';
// import { bindActionCreators } from 'redux';

export default class YourEvent extends Component {
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
      <div>
          <div>Your Events</div>
          <div>search box component</div>
          <div>Your event list</div>
      </div>
    );
  }
}
