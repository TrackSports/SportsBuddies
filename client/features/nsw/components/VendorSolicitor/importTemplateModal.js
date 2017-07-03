import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import vsScss from './vendorSolicitor.scss';
import Modal from 'app/components/UI/Modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { importTemplate, closeTemplateModal } from 'features/nsw/actions/vendorSolicitor';

class ImportTemplateModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      selectedTemplate: {}
    };
  }

  handleClose = () => this.props.closeTemplateModal();

  // no good, need refactory
  selectTemplate(e, index) {
    if (e.target.checked) {
      $('.templateCheckboxs').not($(e.target)).prop('checked', false);
      this.setState({ selectedTemplate: this.props.templates[index] });
    } else {
      this.setState({ selectedTemplate: {} });
    }
  }

  ImportTemplateToEditor = () => {
    if (this.state.selectedTemplate) {
      this.props.importTemplate(this.state.selectedTemplate);
    }
    this.handleClose();
  }

  renderTemplateRecords(templates) {
    return (
      <div style= {{ height: '400px', overflowY: 'scroll' }}>
        <table className={classnames('table', 'table-hover', vsScss.table)}>
          <tbody>
            { templates.map((template, index) => {
              return (
                <tr key={index} className={classnames(vsScss.templateRecordRow)}>
                  <td><input type="checkbox" className="templateCheckboxs" onChange={ (e) => this.selectTemplate(e, index) } /></td>
                  <td>{template.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return (
      <Modal customerClassName = "importTemplateModal" show={this.props.showTemplateModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Template</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          {this.renderTemplateRecords(this.props.templates)}
        </Modal.Body>
        <Modal.Footer>
          <button className={classnames('btn btn-default', vsScss.commentCancelBtn)} onClick={this.handleClose}>Cancel</button>
          <button className="btn btn-primary" onClick={this.ImportTemplateToEditor}>Import</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ImportTemplateModal.propTypes = {
  showTemplateModal: PropTypes.bool,
  templates: PropTypes.array,
  importTemplate: PropTypes.func,
  closeTemplateModal: PropTypes.func
};

function mapStateToProps(state) {
  return {
    showTemplateModal: state.nswVendorSolicitor.showTemplateModal,
    templates: state.nswVendorSolicitor.templates
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ importTemplate, closeTemplateModal }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ImportTemplateModal);
