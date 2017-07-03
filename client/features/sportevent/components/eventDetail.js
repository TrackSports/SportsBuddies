import React, { Component } from 'react';
// import classnames from 'classnames';
// import { connect } from 'react-redux';
// import Spinner from 'share/Spinner';
// import ActionSpinner from 'share/ActionSpinner';
// import { bindActionCreators } from 'redux';

export default class EventDetail extends Component {
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
          <div>
            <span className="h2" >Name: </span>
            <span style={{ fontSize: 28 }}>football</span>
          </div>
          <div>
            <span className="h2" >Address: </span>
            <br />
            <img src={"https://maps.googleapis.com/maps/api/staticmap?center=Domain+sydney&zoom=15&marker&size=600x300&key=AIzaSyCw1cBpPP1OilflaK_S2Pw_hD-grXcXepw"} />
            <span style={{ color: 'red', Position: 'relative', left: '-300', fontSize: 30 }} className="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
          </div>
          <div style={{ marginTop: 5 }}>
            <span className="h2" >Category: </span>
            <span style={{ fontSize: 28 }}>football</span>
          </div>
          <div style={{ marginTop: 5 }}>
            <span style={{ fontSize: 28 }} className="glyphicon glyphicon-calendar" aria-hidden="true"></span>
            <span className="h2" >Date: </span>
            <span style={{ fontSize: 26 }}>Wednesday</span>
          </div>
          <div style={{ marginTop: 5 }}>
            <span style={{ fontSize: 28 }} className="glyphicon glyphicon-time" aria-hidden="true"></span>
            <span className="h2" >Time: </span>
            <span style={{ fontSize: 26 }}>12:30PM</span>
          </div>
          <div>User list component</div>
      </div>
    );
  }
}
