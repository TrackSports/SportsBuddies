import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Spinner from 'share/Spinner';
import ActionSpinner from 'share/ActionSpinner';
import { bindActionCreators } from 'redux';
import { Editor, createEditorState } from 'medium-draft';
import { stateFromHTML } from 'draft-js-import-html';
import isEmpty from 'lodash/isEmpty';
import Toolbar from './toolbar';
import Document from 'features/nsw/components/Share/Document';
import TopNav from 'features/nsw/components/Share/TopNav';
import ImportTemplateModal from './importTemplateModal';
import { convertToRaw, EditorState, Modifier, ContentState } from 'draft-js';
import { showTemplateNameModal, getVendorSolicitorDocument, showTemplateModal, getDemoDocument,
         resetTemplateId, updateTemplate, showUpdateTemplate, createAnotherNewTemplate } from 'features/nsw/actions/vendorSolicitor';
import * as DocumentStatus from 'features/nsw/constants/documentStatus';
import * as DocumentType from 'features/nsw/constants/documentType';
import TemplateNameModal from './TemplateNameModal';
import ContractViewer from 'features/nsw/components/Share/ContractViewer';
import dpcss from 'features/nsw/components/Share/document.scss';
import Notification from 'share/Notification';

class VendorSolicitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: createEditorState(), // for empty content
      selectCreateNew: false,
      showDropDown: true,
      showUploadWordSpin: false
    };

    this.onChange = (editorState) => {
      this.setState({ editorState });
    };

    this.handlePastedText = (text, html) => {
      const { editorState } = this.state;
      const blockMap = html ? stateFromHTML(html).blockMap : ContentState.createFromText(text).blockMap;
      const newState = Modifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), blockMap);
      this.onChange(EditorState.push(editorState, newState, 'insert-fragment'));
      return true;
    };
  }


  componentDidMount() {
    const { params: { documentAccessCode } } = this.props;
    if (documentAccessCode) {
      this.props.getVendorSolicitorDocument(documentAccessCode);
    } else {
      this.props.getDemoDocument();
    }

    $('#upload_docx').fileupload({
      dataType: 'text',
      url: `${window.API_BASE}/api/nswvs/uploadWordDocument`,
      submit: (e, data) => {
        if (data.files.length > 0) {
          const fileType = data.files[0].name.split('.').pop().toLowerCase();
          const allowdtypes = 'docx';
          if (allowdtypes.indexOf(fileType) < 0) {
            alert('Invalid file type. Attach docx files only');
            return false;
          }
        }
        this.setState({ showUploadWordSpin: true });
        return true;
      },
      autoUpload: true,
      done: (e, data) => {
        this.setState({ showUploadWordSpin: false });
        const result = $.parseJSON(data.result || data.jqXHR.responseText);
        this.handlePastedText('', result);
        this.setState({ selectCreateNew: true });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    // use this way to update internal state after special action is finished
    if (!isEmpty(nextProps.ImportedTemplate) && nextProps.ImportedTemplate !== this.props.ImportedTemplate) {
      const newEditorState = createEditorState(JSON.parse(nextProps.ImportedTemplate.content));
      this.setState({ editorState: newEditorState });
    }
    if (nextProps.templateId !== this.props.templateId && nextProps.templateId) {
      this.setState({ selectCreateNew: true });
    }

    // for the new template which created by SR
    if (!isEmpty(nextProps.templateContent) && nextProps.templateContent !== this.props.templateContent) {
      const newEditorState = createEditorState(JSON.parse(nextProps.templateContent));
      this.setState({ editorState: newEditorState, selectCreateNew: true, showDropDown: false });
    }
  }

  showEditor() {
    // show a blank editor
    this.setState({
      editorState: createEditorState(),
      selectCreateNew: true
    });
    // reset TemplateID be null
    this.props.resetTemplateId();
  }

  showImportModal() {
    this.setState({ selectCreateNew: false });
    const { clientId } = this.props;
    this.props.showTemplateModal(clientId);
  }

  showTemplateName() {
    const editorState = this.state.editorState;
    const renderedBlock = convertToRaw(editorState.getCurrentContent());

    const payload = {
      templateContent: JSON.stringify(renderedBlock),
      isShowTemplateNameModal: true
    };

    this.props.showTemplateNameModal(payload);
  }

  showUpdateTemplateModal() {
    const editorState = this.state.editorState;
    const updatedTemplateContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

    const { templateId } = this.props;
    const payload = {
      id: templateId,
      content: updatedTemplateContent
    };

    this.props.updateTemplate(payload);
    this.refs.notification.addNotification('The template has been successfully saved', 'success');
  }

  createAnotherNewTemplate() {
    const newEditorState = createEditorState();
    this.setState({ editorState: newEditorState, selectCreateNew: true, showDropDown: true });
    this.props.createAnotherNewTemplate();
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  optionChanges(e) {
    if (e.target.value === 'template') {
      this.showImportModal();
    } else if (e.target.value === 'newTemplate') {
      this.showEditor();
    } else if (e.target.value === 'wordDocument') {
      $('#upload_docx').click();
    } else {
      this.setState({ selectCreateNew: false });
    }
  }

  renderDropDown() {
    return (
      <div className={classnames(dpcss.selectActionRow)}>
        <select className="form-control" onChange={(e) => this.optionChanges(e)}>
          <option value="none">please select</option>
          <option value="template">existing template</option>
          <option value="newTemplate">create a new template</option>
          <option value="wordDocument">upload from word</option>
        </select>
      </div>

    );
  }

  renderEditorAndContract() {
    const { editorState } = this.state;
    const { documentLocationUrl, documentId, isShowCreateButton, documentType, templateName } = this.props;
    const IframeHeight = `${$(window).height() * 0.8}px`;
    const showContractView = documentType !== DocumentType.custom;
    const documentLocationSrc = showContractView ? documentLocationUrl : null;
    if (!documentId) {
      return (
        <div className="row">
            <div className="col-xs-2"></div>
            <div className="col-xs-8">
                <Editor ref="editor" editorState={editorState} sideButtons={[]} placeholder="create a new template" onChange={this.onChange} handlePastedText={this.handlePastedText} />
                <div style={{ marginTop: '20px' }}>
                   <button className={classnames('btn btn-primary', isShowCreateButton ? '' : 'hidden')} onClick={() => this.showTemplateName()}>Save</button>
                </div>
            </div>
            <div className="col-xs-2"></div>
          </div>
      );
    }

    return (
        <div className="row">
            <div className={classnames(showContractView ? 'col-xs-5' : 'col-xs-11', dpcss.documentSectionWrapper)} style={{ height: IframeHeight, marginLeft: '111px' }}>
                <Editor ref="editor" editorState={editorState} sideButtons={[]} placeholder="create a new template" onChange={this.onChange} handlePastedText={this.handlePastedText} />
                <div style={{ marginTop: '20px' }}>
                   <button className={classnames('btn btn-primary', isShowCreateButton ? '' : 'hidden')} onClick={() => this.showTemplateName()}>Save as new template</button>
                   <button className={classnames('btn btn-primary', isShowCreateButton ? 'hidden' : '')} onClick={() => this.showUpdateTemplateModal()}>Save {templateName}</button>
                   <button className={classnames('btn btn-primary', isShowCreateButton ? 'hidden' : '')} onClick={() => this.createAnotherNewTemplate()}style={{ marginLeft: '5px' }} >New Template</button>
                </div>
            </div>
            <div className={classnames(showContractView ? 'col-xs-5' : 'hidden', dpcss.documentIframeWidth)} style={{ height: IframeHeight }}>
               <ContractViewer documentLocationUrl={documentLocationSrc} />
            </div>
          </div>
      );
  }

  render() {
    if (this.props.isLoading) {
      return <Spinner />;
    }

    const { eCOSAccessUrl, isShowSpinner } = this.props;

    if (this.props.documentStatus === DocumentStatus.New || this.props.documentStatus === DocumentStatus.Initlized) {
      const { editorState } = this.state;
      const currentRenderBlocks = convertToRaw(editorState.getCurrentContent());
      const hideEditor = this.state.selectCreateNew ? { visibility: 'visible' } : { visibility: 'hidden' };
      return (
          <div>
             <TopNav eCOSAccessUrl={eCOSAccessUrl} />
              <Toolbar currentRenderBlocks={currentRenderBlocks} />
              <div className={classnames('row', this.state.showDropDown ? '' : 'hidden')}>
                <div className="col-xs-2" style={{ marginLeft: '115px' }}>
                  {this.renderDropDown()}
                </div>
              </div>
              <div style={hideEditor}>
                {this.renderEditorAndContract()}
              </div>
              <ImportTemplateModal />
              <TemplateNameModal />
              <ActionSpinner isShowSpinner={isShowSpinner || this.state.showUploadWordSpin} />
              <Notification ref="notification" />
        </div>
        );
    }

    return (
      <div>
          <TopNav eCOSAccessUrl={eCOSAccessUrl} />
          <Toolbar />
          <Document />
          <ActionSpinner isShowSpinner={isShowSpinner} />
      </div>
    );
  }
}

VendorSolicitor.propTypes = {
  isLoading: PropTypes.bool,
  documentId: PropTypes.number,
  documentStatus: PropTypes.string,
  documentType: PropTypes.string,
  isShowCreateButton: PropTypes.bool,
  clientId: PropTypes.number,
  showTemplateNameModal: PropTypes.func,
  createAnotherNewTemplate: PropTypes.func,
  params: PropTypes.object,
  isShowSpinner: PropTypes.bool,
  ImportedTemplate: PropTypes.object,
  getVendorSolicitorDocument: PropTypes.func,
  showTemplateModal: PropTypes.func,
  templateId: PropTypes.number,
  templateName: PropTypes.string,
  resetTemplateId: PropTypes.func,
  updateTemplate: PropTypes.func,
  templateContent: PropTypes.string,
  eCOSAccessUrl: PropTypes.string,
  documentLocationUrl: PropTypes.string,
  getDemoDocument: PropTypes.func,
  showUpdateTemplate: PropTypes.func
};

function mapStateToProps(state) {
  return {
    isLoading: state.nswVendorSolicitor.isLoading,
    isShowCreateButton: state.nswVendorSolicitor.isShowCreateButton,
    ImportedTemplate: state.nswVendorSolicitor.importedTemplate,
    documentStatus: state.nswVendorSolicitor.documentStatus,
    documentType: state.nswVendorSolicitor.documentType,
    documentId: state.nswVendorSolicitor.documentId,
    isShowSpinner: state.nswVendorSolicitor.isShowSpinner,
    clientId: state.nswVendorSolicitor.clientId,
    showTemplateModal: state.nswVendorSolicitor.showTemplateModal,
    templateId: state.nswVendorSolicitor.templateId,
    templateName: state.nswVendorSolicitor.templateName,
    templateContent: state.nswVendorSolicitor.templateContent,
    eCOSAccessUrl: state.nswVendorSolicitor.eCOSAccessUrl,
    documentLocationUrl: state.nswDocument.documentLocationUrl
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ showTemplateNameModal,
                              getVendorSolicitorDocument,
                              getDemoDocument,
                              showTemplateModal,
                              resetTemplateId,
                              updateTemplate,
                              showUpdateTemplate,
                              createAnotherNewTemplate
                            }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(VendorSolicitor);
