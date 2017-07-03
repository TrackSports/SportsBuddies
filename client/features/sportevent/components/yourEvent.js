import React, { Component, PropTypes } from 'react';
// import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEventList } from 'features/sportevent/actions/toolbarAction';

export class YourEvent extends Component {

  handleSubmit(e) {
    e.preventDefault();
  }

  showTheEvent(EventId) {
    alert(EventId);
    // this.props.getEventList();
  }

  render() {
    return (
      <div>
          <div>Your Events</div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <form className="navbar-form navbar-left">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" />
              </div>
            </form>
          </div>

          <div>
            <ul>
                <li><a onClick={() => this.showTheEvent('1') }>Sat Football</a></li>
                <li><a onClick={() => this.showTheEvent('2') }>Sun Netball</a></li>
                <li><a onClick={() => this.showTheEvent('3') }>Wed Yoga</a></li>
                <li><a onClick={() => this.showTheEvent('4') }>Thur Weights</a></li>
            </ul>
          </div>
      </div>
    );
  }
}

YourEvent.propTypes = {
  getEventList: PropTypes.func
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getEventList }, dispatch);
}

export default connect(null, matchDispatchToProps)(YourEvent);
