import React, { Component } from 'react';
// import classnames from 'classnames';
// import { connect } from 'react-redux';
// import Spinner from 'share/Spinner';
// import ActionSpinner from 'share/ActionSpinner';
// import { bindActionCreators } from 'redux';

export default class Login extends Component {
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
     <div className="wrapper">
          <h2 className="form-signin-heading">Please login</h2>
          <input type="text" className="form-control" placeholder="Windows Id" id="Username" name="Username" value=""></input>
          <input type="password" className="form-control" name="password" placeholder="Password" id="Password">
          </input>
          <button id="btnLogin" className="btn btn-lg btn-primary btn-block" style="margin-top:10px;" type="submit" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Logging in">Login</button>
          <div className="text-danger validation-summary-valid" data-valmsg-summary="true"><ul><li style="display:none"></li>
        </ul></div>
      </div>
    );
  }
}
