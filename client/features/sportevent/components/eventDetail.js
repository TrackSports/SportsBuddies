import React, { Component, PropTypes } from 'react';
// import classnames from 'classnames';
import { connect } from 'react-redux';
// import Spinner from 'share/Spinner';
// import ActionSpinner from 'share/ActionSpinner';
// import { bindActionCreators } from 'redux';

class EventDetail extends Component {

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { selectedEvent } = this.props;
    if (!selectedEvent || typeof selectedEvent.id === 'undefined') {
      return null;
    }
    return (
      <div>
          <div>
            <span className="h2" >Name: </span>
            <span style={{ fontSize: 28 }}>{selectedEvent.name}</span>
          </div>
          <div>
            <span className="h2" >Address: </span>
            <span style={{ fontSize: 28 }}>{selectedEvent.location}</span>
            <br />
            <img src={"https://maps.googleapis.com/maps/api/staticmap?center=Domain+sydney&zoom=15&marker&size=600x300&key=AIzaSyCw1cBpPP1OilflaK_S2Pw_hD-grXcXepw"} />
            <span style={{ color: 'red', Position: 'relative', left: '-300', fontSize: 30 }} className="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
          </div>
          <div style={{ marginTop: 5 }}>
            <span className="h2" >Category: </span>
            <span style={{ fontSize: 28 }}>{selectedEvent.category}</span>
          </div>
          <div style={{ marginTop: 5 }}>
            <span style={{ fontSize: 28 }} className="glyphicon glyphicon-calendar" aria-hidden="true"></span>
            <span className="h2" >Date: </span>
            <span style={{ fontSize: 26 }}>{selectedEvent.weekday}</span>
          </div>
          <div style={{ marginTop: 5 }}>
            <span style={{ fontSize: 28 }} className="glyphicon glyphicon-time" aria-hidden="true"></span>
            <span className="h2" >Time: </span>
            <span style={{ fontSize: 26 }}>{selectedEvent.startTime}</span>
             <span className="h2" >Duration: </span>
            <span style={{ fontSize: 26 }}>{selectedEvent.duration}</span>
          </div>
          <div></div>
          <div className="panel panel-default">
            <div className="panel-heading">Attending members</div>
            <div className="panel-body">
             {selectedEvent.members.map(d => {
               return (
                  <li key={d}> {d}</li>
                );})}
            </div>
          </div>
      </div>
    );
  }
}

EventDetail.propTypes = {
  selectedEvent: PropTypes.object
};

function mapStateToProps(state) {
  return {
    selectedEvent: state.sportEventDetail.selectedEvent
  };
}

export default connect(mapStateToProps, null)(EventDetail);
