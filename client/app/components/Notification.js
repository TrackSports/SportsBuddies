import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';

class Notification extends Component {

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  _notificationSystem = null;

  addNotification(message, level) {
    this._notificationSystem.addNotification({
      message,
      level,
      autoDismiss: 2.5,
      position: 'tc',
      dismissible: false
    });
  }

  render() {
    const notificationStyle = {
      NotificationItem: {
        success: {
          color: '#fff',
          backgroundColor: '#59a759'
        },
        error: {
          color: '#fff',
          backgroundColor: '#f0ad4e',
          borderTop: '2px solid #f0ad4e'
        }
      }
    };
    return (
           <NotificationSystem ref="notificationSystem" style={notificationStyle} />
    );
  }
}

export default Notification;
