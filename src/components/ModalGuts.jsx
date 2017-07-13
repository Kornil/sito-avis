import React, { Component } from 'react';
import { resize } from '../utils/';

class ModalGuts extends Component {

  handleInsertImage(url) {
    if (url) {
      const resized = resize(600, url);
      this.props.quillRef.focus();
      const range = this.props.quillRef.getSelection();
      this.props.quillRef.insertEmbed(range.index, 'image', resized, 'user');
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
            <input
              className="newBlog__input"
              type="text"
              name="alt"
              onChange={e => this.props.handleChange(e)}
              placeholder="Alt text for image"
              value={this.props.images.current.alt}
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
              onClick={this.props.type === 'inline' ? () => this.handleInsertImage(this.props.images.current.url) : () => this.props.closeModal()}
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
