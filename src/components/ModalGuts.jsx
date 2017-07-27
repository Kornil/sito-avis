import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { resize, singleRuleRunner, required, generateSlug } from '../utils/';
import FormInput from './FormInput';


// / Custom ImageBlot to add alt text to inline images / ///

const Quill = ReactQuill.Quill;
const BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute('alt', value.alt);
    node.setAttribute('src', value.url);
    return node;
  }

  static value(node) {
    return {
      alt: node.getAttribute('alt'),
      url: node.getAttribute('src'),
    };
  }
}
ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
ImageBlot.className = 'inline-img';
Quill.register(ImageBlot);

class ModalGuts extends Component {
  constructor(props) {
    super(props);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.handleInsertImage = this.handleInsertImage.bind(this);
  }

  handleInsertImage(url, alt) {
    if (url) {
      const resized = resize(600, url);
      this.props.quillRef.focus();
      const range = this.props.quillRef.getSelection();
      this.props.quillRef.insertText(range.index, '\n', 'user');
      this.props.quillRef.insertEmbed(range.index + 1, 'image', {
        alt,
        url: resized,
      }, 'user');
      this.props.quillRef.setSelection(range.index + 2, 'silent');
      this.props.closeModal();
    }
  }

  handleModalSubmit() {
    this.props.updateErrorViz();
    let validationErrors = singleRuleRunner('alt', 'Alt text', required)(this.props.images.current);
    if (!validationErrors) { validationErrors = {}; }
    const callback = () => {
      if (validationErrors.alt || validationErrors.file) {
        return null;
      } else if (this.props.type === 'inline') {
        const fileNameClean = generateSlug(this.props.images.current.fileName);
        this.props.setAltText(true, fileNameClean);
        const current = this.props.images.current;
        this.handleInsertImage(current.url, current.alt);
        this.props.closeModal();
        return null;
      }
      this.props.setAltText(false);
      this.props.closeModal();
      return null;
    };
    this.props.updateValidationErrors(validationErrors, callback);
    return null;
  }

  render() {
    return (
      <div className="modal__dialog">
        <div className="modal__content">
          <div className="modal__header">
            <button
              type="button"
              onClick={this.props.closeModal}
              className="modal__close--x"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <h2 className="modal__title" id="modalTitle">{this.props.title}</h2>
          </div>
          <div className="modal__body">
            <div className="newBlog__fileUploadWrap newBlog__button">
              <span>Choose File</span>
              <input
                type="file"
                value=""
                className="newBlog__uploadBtn"
                title="uploadFile"
                name="uploadFile"
                id="uploadFile"
                onChange={e => this.props.handleImgUpload(e)}
              />
            </div>
            {this.props.images.current.progress > 0 && !this.props.images.current.success &&
            <span className="newBlog__imgProg">
              <span className="newBlog__img-upload-progress">Uploading... {this.props.images.current.progress}%</span>
            </span>}
            <div id="modalImgCont">
              {this.props.images.current.success &&
              <div>
                <img
                  className="newBlog__img--modal"
                  src={resize(document.getElementById('modalImgCont').offsetWidth, this.props.images.current.url)}
                  alt={this.props.images.current.alt}
                />
                <div className="newBlog__img-upload-success">Upload Successful </div>
              </div>}
            </div>
            <FormInput
              className="newBlog__input"
              handleChange={e => this.props.handleChange(e)}
              handleBlur={e => this.props.handleBlur(e)}
              handleFocus={e => this.props.handleFocus(e)}
              placeholder="Alt text for image"
              showError={this.props.showError}
              text={this.props.images.current.alt}
              errorText={this.props.errorFor('alt')}
              touched={this.props.touched.alt}
              name="alt"
              submit={this.props.submit}
            />
          </div>
          <div className="modal__footer">
            <button
              type="button"
              onClick={this.props.closeModal}
              className="modal__button modal__close--btn"
              data-dismiss="modal"
            >Cancel</button>
            <button
              type="button"
              onClick={this.handleModalSubmit}
              className={this.props.danger ? 'modal__button modal__confirm modal__confirm--danger' : 'modal__button modal__confirm'}
              data-dismiss="modal"
            >{this.props.confirm}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalGuts;
