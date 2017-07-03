import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinner from 'app/components/Spinner';
import ActionSpinner from 'share/ActionSpinner';
import TopNav from 'features/nsw/components/Share/TopNav';
import { bindActionCreators } from 'redux';
import Toolbar from './toolbar';
import { getPurchaserSolicitorDocument } from 'features/nsw/actions/purchaserSolicitor';
import Document from 'features/nsw/components/Share/Document';


class PurchaserSolicitor extends Component {
  componentDidMount() {
    // load ajax
    const { params: { documentAccessCode } } = this.props;
    this.props.getPurchaserSolicitorDocument(documentAccessCode);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    if (this.props.isLoading) {
      return <Spinner />;
    }
    const { isShowSpinner } = this.props;
    return (
      <div>
          <TopNav />
          <Toolbar />
          <Document />
          <ActionSpinner isShowSpinner={isShowSpinner} />
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    isShowSpinner: state.nswPurchaserSolicitor.isShowSpinner,
    isLoading: state.nswPurchaserSolicitor.isLoading
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getPurchaserSolicitorDocument }, dispatch);
}

PurchaserSolicitor.propTypes = {
  isLoading: PropTypes.bool,
  getPurchaserSolicitorDocument: PropTypes.func,
  params: PropTypes.object,
  isShowSpinner: PropTypes.bool
};


export default connect(mapStateToProps, matchDispatchToProps)(PurchaserSolicitor);
