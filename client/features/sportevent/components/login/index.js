import React, { Component } from 'react';
import classnames from 'classnames';
// import classnames from 'classnames';
// import { connect } from 'react-redux';
// import Spinner from 'share/Spinner';
// import ActionSpinner from 'share/ActionSpinner';
// import { bindActionCreators } from 'redux';
const divStyle = {
  marginTop: '10px'
};
export default class Login extends Component {
  constructor() {
      super();
      this.state = {
          username: '',
          password: ''
      };
    }

  handleLogin() {
    $.post("http://localhost:57851/api/login/values/gaurav.kohirkar/darthvader123$",null,
    function(data, status){
        window.location = '/hackit/sport/123';
    });
}

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
     <div className={classnames('wrapper form-signin')}>
          <h2 className={classnames('form-signin-heading')}>Please login</h2>
          <input type="text" className={classnames('form-control')} placeholder="Windows Id" id="Username" name="Username" />
          <input type="password" className={classnames('form-control')} name="password" placeholder="Password" id="Password" />
          <button id="btnLogin" className={classnames('btn btn-lg btn-primary btn-block')} onClick={() => this.handleLogin() } style={divStyle}>Login</button>
          <div className={classnames('text-danger validation-summary-valid')} data-valmsg-summary="true">
        </div>
      </div>
    );
  }
}
