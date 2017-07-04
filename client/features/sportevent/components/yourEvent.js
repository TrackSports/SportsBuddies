import React, { Component, PropTypes } from 'react';
// import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showEventDetail } from 'features/sportevent/actions/eventDetailAction';

class YourEvent extends Component {

  handleSubmit(e) {
    e.preventDefault();
  }

  showTheEvent(eventId) {
    const payload = {
      eventId
    };
    this.props.showEventDetail(payload);
  }

  render() {
    const { eventList } = this.props;
    return (
      <div>
          <div className="sidebarTitle">Your Events</div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <form className="navbar-form navbar-left">
              <div className="form-group">
                <input type="text" className="form-control sidebarSearchField" placeholder="Search" />
              </div>
            </form>
          </div>
            <br />
          <div>
              <ul className="nav nav-pills nav-stacked">
                {eventList.map(d => {
                  return (
                    <li key={d.id} role="presentation"><a className="sidebarItem" onClick={() => { this.showTheEvent(d.id); }}> {d.weekday} {d.name}</a></li>
                  );})}
              </ul>
            </div>
          </div>
    );
  }
}

YourEvent.propTypes = {
  showEventDetail: PropTypes.func,
  eventList: PropTypes.array
};

function mapStateToProps(state) {
  return {
    eventList: state.sportEventDetail.eventList
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ showEventDetail }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(YourEvent);
