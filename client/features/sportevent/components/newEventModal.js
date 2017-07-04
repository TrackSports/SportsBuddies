import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Modal from 'app/components/UI/Modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeNewEventModal, createEventSuccess } from 'features/sportevent/actions/toolbarAction';

class NewEventModal extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      category: 'football',
      weekDay: 'monday'
    };
  }

  componentDidMount() {
  //   $('#startTime').datetimepicker();
  //   $('#startTime').datetimepicker();
  }

  handleCategoryChange(event) {
    this.setState({ category: event.target.value });
  }

  handleWeekdayChange(event) {
    this.setState({ weekDay: event.target.value });
  }

  handleClose() {
    this.props.closeNewEventModal();
  }

  handleSave() {
    const payload = {
      id: '12312312',
      name: this.nameInput.value,
      catgegory: this.state.category,
      weekDay: this.state.weekDay,
      location: this.nameInput.value,
      startTime: this.startTimeInput.value,
      duration: this.durationInput.value,
      desciption: this.descriptionInput.value
    };
    let userId = location.href.substr(location.href.lastIndexOf('/') + 1);
    userId = userId.replace('-', '.');
    $.post(`http://localhost:57851/api/values/saveevent/${payload.name}/${payload.catgegory}/${payload.location}/{${payload.weekDay}}/${payload.startTime}/${payload.duration}/${userId}`, null,
    function(data) {
      debugger;
      location.reload();
    });

    this.props.createEventSuccess(payload);
  }

  renderEvents() {
    return (
       <div className="row">
          <div className = "col-xs-2"></div>
          <div className = "col-xs-8">
            <div className="row">
               <div className="form-group">
                  <input type="text" className="form-control" placeholder="Event title" ref={(input) => { this.nameInput = input; }} />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Location" ref={(input) => { this.locationInput = input; }} />
                </div>
                <div className="form-group">
                  <select className="form-control" value={this.state.category} onChange={(e) => this.handleCategoryChange(e)}>
                    <option value="football">football</option>
                    <option value="basketball">basketball</option>
                    <option value="netball">netball</option>
                    <option value="running">running</option>
                  </select>
                </div>
                <div className="form-group">
                  <select className="form-control" value={this.state.weekDay} onChange={(e) => this.handleWeekdayChange(e)}>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                  </select>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="start time: 13:00 pm" ref={(input) => { this.startTimeInput = input; }} />
                </div>
                <div className="form-group">
                   <input type="text" className="form-control" placeholder="duration: 60 minutes" ref={(input) => { this.durationInput = input; }} />
                </div>
                <div className="form-group">
                  <textarea style= {{ width: '100%' }} defaultValue="" ref={(input) => { this.descriptionInput = input; }}></textarea>
                </div>
            </div>
          </div>
          <div className = "col-xs-2"></div>
        </div>
     );
  }

  render() {
    return (
      <Modal customerClassName = "commentModal" show={ this.props.isShowNewEventModal } onHide={() => this.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>event</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          { this.renderEvents() }
        </Modal.Body>
        <Modal.Footer>
          <button className={classnames('btn btn-default')} onClick={() => this.handleClose()}>Cancel</button>
           <button className={classnames('btn btn-primary')} onClick={() => this.handleSave()}>Save</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

NewEventModal.propTypes = {
  isShowNewEventModal: PropTypes.bool,
  closeNewEventModal: PropTypes.func,
  createEventSuccess: PropTypes.func
};

function mapStateToProps(state) {
  return {
    isShowNewEventModal: state.sportToolbar.isShowNewEventModal
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ closeNewEventModal, createEventSuccess }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NewEventModal);
