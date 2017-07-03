import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEventList } from 'features/sportevent/actions/toolbarAction';
import EventListModal from './EventListModal';

export class Toolbar extends Component {

  handleSubmit(e) {
    e.preventDefault();
  }

  showEventList() {
    this.props.getEventList();
  }

  render() {
    return (
     <div>
        <nav className={classnames('navbar navbar-static-top')}>
           <div className={classnames('collapse navbar-collapse')}>
            <ul>
              <li>search</li>
              <li onClick={() => this.showEventList() }>event list</li>
              <li>create your own</li>
            </ul>
          </div>
        </nav>

        <EventListModal />
      </div>
    );
  }
}

Toolbar.propTypes = {
  getEventList: PropTypes.func
};

// function mapStateToProps(state) {
//   return {
//     isShowEventListModal: state.nswDocument.isShowCommentModal
//   };
// }

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getEventList }, dispatch);
}

export default connect(null, matchDispatchToProps)(Toolbar);
