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
    const username = this.username.value;
    const password = this.password.value;
    $.post(`http://localhost:57851/api/values/login/${username}/${password}`, null,
    function() {
      const path = username.replace('.', '-');
      window.location = `/hackit/sport/${path}`;
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
     <div className={classnames('wrapper form-signin loginOuterContainer')}>
       <div className="loginInnerContainer">
          <h2 className={classnames('form-signin-heading')}>Please login</h2>
          <input type="text" className={classnames('form-control')} placeholder="Windows Id" id="Username" name="Username" ref={(input) => { this.username = input; }} />
          <input type="password" className={classnames('form-control')} name="password" placeholder="Password" id="Password" ref={(input) => { this.password = input; }} />
          <button id="btnLogin" className={classnames('btn btn-lg btn-primary btn-block')} onClick={() => this.handleLogin() } style={divStyle}>Login</button>
          <div className={classnames('text-danger validation-summary-valid')} data-valmsg-summary="true"></div>
       </div>          
      </div>
    );
  }
}
