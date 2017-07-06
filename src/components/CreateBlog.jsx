import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';

import * as firebase from 'firebase';
import { blogsRef, timeRef, generateSlug, sanitize } from '../utils/';
import CustomToolbar from './CustomToolbar';
import Loading from './Loading';

class CreateBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBlog: {
        title: '',
        images: {
          featured: {
          },
          current: {
            success: '',
            progress: '',
            url: '',
            fileName: '',
            alt: '',
            inline: '',
          },
        },
        body: '<br/>',
      },
      unsavedChanges: false,
      edit: '',
      modal: {
        open: false,
        type: '',
        title: '',
        body: '',
        confirm: '',
        danger: false,
        url: '',
      },
    };

    this.modules = {
      toolbar: {
        container: '#toolbar',
        handlers: {
          image: (value) => {
            const newBlog = Object.assign({}, this.state.newBlog);
            newBlog.images.current = {
              success: '',
              progress: '',
              url: '',
              fileName: '',
              alt: '',
              inline: true,
            };
            const type = 'inline';
            const title = 'Choose image';
            const confirm = 'Insert image';
            const danger = false;
            this.setState({ modal: { open: true, type, title, confirm, danger, value }, newBlog });
          },
        },
      },
    };

    this.formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote', 'color',
      'list', 'bullet', 'indent',
      'link', 'image',
    ];

    this.quillRef = null;
    this.reactQuillRef = null;

    this.handleChange = this.handleChange.bind(this);
    this.handleQuillChange = this.handleQuillChange.bind(this);
    this.handleImgUpload = this.handleImgUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.unsavedChanges = this.unsavedChanges.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.unsavedChanges);
    this.attachQuillRefs();
    if (this.props.match.params.key) {
      const key = this.props.match.params.key;
      blogsRef.child(key).once('value', (snapshot) => {
        const newBlog = snapshot.val();
        this.setState({
          newBlog,
          edit: true,
        });
      });
    }
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.unsavedChanges);
  }

  attachQuillRefs() {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    if (this.quillRef != null) return;
    const quillRef = this.reactQuillRef.getEditor();
    if (quillRef != null) this.quillRef = quillRef;
  }

  unsavedChanges(e) {
    if (this.state.unsavedChanges) {
      e.returnValue = 'Unsaved Changes!';
      return 'Unsaved Changes!';
    }
    return null;
  }

  handleChange(event) {
    const newBlog = Object.assign({}, this.state.newBlog);
    if (event.target.name === 'alt') {
      newBlog.images.current.alt = event.target.value;
    } else {
      newBlog[event.target.name] = event.target.value;
    }
    newBlog.timestamp = timeRef;
    newBlog.slug = generateSlug(newBlog.title);
    this.setState({
      newBlog,
    });
  }

  handleQuillChange(value) {
    const newBlog = Object.assign({}, this.state.newBlog);
    newBlog.body = value;
    this.setState({
      newBlog,
      unsavedChanges: true,
    });
  }

  handleInsertImage(url) {
    if (url) {
      this.quillRef.focus();
      const range = this.quillRef.getSelection();
      this.quillRef.insertEmbed(range.index, 'image', url, 'user');
      this.closeModal();
    }
  }

  handleImgUpload(event) {
    event.preventDefault();
    const newBlog = Object.assign({}, this.state.newBlog);
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref();
    const task = storageRef.child(`images/${file.name}`).put(file);
    task.on('state_changed', (snap) => {
      const percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      newBlog.images.current.progress = percentage;
      this.setState({
        newBlog,
      });
    }, (err) => {
      newBlog.images.current.error = err;
      console.log(err);
      this.setState({
        newBlog,
      });
    },
() => {
  const url = task.snapshot.downloadURL;
  const fileName = file.name;
  newBlog.images.current.url = url;
  newBlog.images.current.success = true;
  newBlog.images.current.fileName = fileName;
  if (this.state.newBlog.images.current.inline) {
    const inlineImage = Object.assign({}, newBlog.images.current);
    const fileNameClean = fileName.replace(/[^a-zA-Z0-9 ]/g, '');
    newBlog.images[fileNameClean] = inlineImage;
  } else {
    const featuredImage = Object.assign({}, newBlog.images.current);
    newBlog.images.featured = featuredImage;
  }
  this.setState({
    newBlog,
  });
});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.edit) {
      const { key } = this.state.newBlog;
      blogsRef.orderByChild('key').equalTo(key).once('value', (snapshot) => {
        if (snapshot.val() === null) {
          console.log('post not found');
        } else {
          snapshot.ref.child(key).update(this.state.newBlog).then(() => {
            this.props.history.push('/dashboard');
          });
        }
      });
    } else {
      const newBlog = Object.assign({}, this.state.newBlog);
      const newBlogKey = blogsRef.push().key;
      newBlog.key = newBlogKey;
      const updates = {};
      updates[newBlogKey] = newBlog;
      blogsRef.update(updates).then(() => {
        this.props.history.push('/dashboard');
      });
    }
  }

  closeModal() {
    this.setState({
      modal: { open: false, title: '' },
    });
  }

  openModal(type, title, confirm, danger, url) {
    const newBlog = Object.assign({}, this.state.newBlog);
    newBlog.images.current = {
      success: '',
      progress: '',
      url: '',
      fileName: '',
      alt: '',
      inline: false,
    };
    this.setState({ modal: { open: true, type, title, confirm, danger, url }, newBlog });
  }

  render() {
    const { title, body, images } = this.state.newBlog;
    const modalStyles = { overlay: { zIndex: 10 } };
    return (
      <div>
        <Modal
          style={modalStyles}
          isOpen={this.state.modal.open}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          className="modal"
          contentLabel={this.state.modal.title}
        >
          <div className="modal__dialog">
            <div className="modal__content">
              <div className="modal__header">
                <button
                  type="button"
                  onClick={this.closeModal}
                  className="modal__close--x"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <h2 className="modal__title" id="modalTitle">{this.state.modal.title}</h2>
              </div>
              {this.state.modal.type !== 'unsavedChanges' &&
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
                    onChange={e => this.handleImgUpload(e)}
                  />
                </div>
                {images.current.progress > 0 && !images.current.success &&
                <span className="newBlog__imgProg">
                  <span className="newBlog__img-upload-progress">Uploading... {images.current.progress}%</span>
                </span>
              }
                {images.current.success &&
                <div>
                  <img className="newBlog__img--modal" src={images.current.url} alt={images.current.alt} />
                  <div className="newBlog__img-upload-success">Upload Successful </div>
                </div>
              }
                <input
                  className="newBlog__input"
                  type="text"
                  name="alt"
                  onChange={e => this.handleChange(e)}
                  placeholder="Alt text for image"
                  value={images.current.alt}
                />
              </div>}
              {this.state.modal.type === 'unsavedChanges' &&
              <div className="modal__body" /> }
              <div className="modal__footer">
                <button
                  type="button"
                  onClick={this.closeModal}
                  className="modal__button modal__close--btn"
                  data-dismiss="modal"
                >Cancel</button>
                <button
                  type="button"
                  onClick={this.state.modal.type === 'inline' ? () => this.handleInsertImage(images.current.url) : () => this.closeModal()}
                  className={this.state.modal.danger ? 'modal__button modal__confirm modal__confirm--danger' : 'modal__button modal__confirm'}
                  data-dismiss="modal"
                >{this.state.modal.confirm}</button>
              </div>
            </div>
          </div>
        </Modal>
        <h2 className="newBlog__banner">{this.state.edit ? 'Update Post' : 'New Blog Post'}</h2>
        {this.state.edit && title === '' ? <Loading /> :
        <div className="newBlog__container">
          <form className="newBlog__form">
            <h3 className="newBlog__subhead">Input</h3>
            <input
              className="newBlog__input"
              type="text"
              name="title"
              onChange={e => this.handleChange(e)}
              placeholder="Blog Title"
              value={title}
            />
            <br />
            <h3 className="newBlog__subhead newBlog__subhead--sm">Set Featured Image</h3>
            <a
              role="button"
              tabIndex="0"
              onKeyPress={() => this.openModal('featured', 'Set Featured Image', 'OK', false)}
              className="newBlog__button newBlog__button--featured"
              onClick={() => this.openModal('featured', 'Set Featured Image', 'OK', false)}
            >Choose File</a>
            <br />
            <div className="newBlog__editor">
              <CustomToolbar
                handleInlineImage={this.handleInlineImage}
              />
              <ReactQuill
                theme="snow"
                value={body}
                placeholder="Your blog post here"
                onChange={this.handleQuillChange}
                modules={this.modules}
                formats={this.formats}
                ref={(el) => { this.reactQuillRef = el; }}
              >
                <div
                  key="editor"
                  className="quill-contents"
                />
              </ReactQuill>
            </div>
            <br />
            <button
              className="newBlog__submit newBlog__button"
              type="submit"
              onClick={e => this.handleSubmit(e)}
            >{this.state.edit ? 'Update Post' : 'Create Post'}</button>
            <Link
              to="/dashboard"
              className="newBlog__cancel newBlog__button"
            >Cancel</Link>
          </form>
          <div className="newBlog__preview">
            <h3 className="newBlog__subhead">Preview</h3>
            <div className="newBlog__wrapper">
              <h3 className="newBlog__title">{title}</h3>
              {images.featured && <img className="newBlog__img" src={images.featured.url} alt={images.featured.alt} />}
              <div
                className="newBlog__body"
                dangerouslySetInnerHTML={sanitize(body)}
              />
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

export default CreateBlog;
