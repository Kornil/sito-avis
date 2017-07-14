import React, { Component } from 'react';
import { resize, run, fieldValidationsModal, generateSlug } from '../utils/';
import FormInput from './FormInput';

class ModalGuts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showErrors: false,
      validationErrors: { },
      touched: {
        alt: false,
      },
      submit: false,
    };
    this.errorFor = this.errorFor.bind(this);
  }

  errorFor(field) {
    return this.state.validationErrors[field] || '';
  }

  handleInsertImage(url, alt) {
    if (url) {
      const resized = resize(600, url);
      this.props.quillRef.focus();
      const range = this.props.quillRef.getSelection();
// this.props.quillRef.insertEmbed(range.index, 'image', resized, 'user');
      const imgHtml = `<img src="${resized}" alt="${alt}" />`;
      this.props.quillRef.clipboard.dangerouslyPasteHTML(range.index, imgHtml, 'user');
      this.props.closeModal();
    }
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
              showError={this.state.showErrors}
              text={this.props.images.current.alt}
              errorText={this.errorFor('alt')}
              touched={this.state.touched.alt}
              name="alt"
              submit={this.state.submit}
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
              onClick={() => {
                this.setState(() => ({ showErrors: true, submit: true }), () => {
                  const validationErrors = run(this.props.images.current, fieldValidationsModal);
                  this.setState(() => ({ validationErrors }), () => {
                    if (validationErrors.alt || validationErrors.file) {
                      return null;
                    } else if (this.props.type === 'inline') {
                      const fileNameClean = generateSlug(this.props.images.current.fileName);
                      this.props.setAlt(true, fileNameClean);
                      const current = this.props.images.current;
                      this.handleInsertImage(current.url, current.alt);
                      return null;
                    }
                    this.props.setAlt(false);
                    this.props.closeModal();
                    return null;
                  });
                });
              }}
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
