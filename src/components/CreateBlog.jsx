import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';

import * as firebase from 'firebase';
import { blogsRef, timeRef, generateSlug, sanitize, resize, fieldValidations, run } from '../utils/';
import Loading from './Loading';
import ModalGuts from './ModalGuts';
import FormInput from './FormInput';

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
      showErrors: false,
      validationErrors: { },
      touched: {
        title: false,
        body: false,
        alt: false,
      },
      submit: false,
    };

    this.modules = {
      toolbar: {
        container: [[{ header: [3, 4, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote',
{ color: ['#007DC5', '#ED1C24', '#7a7a7a'] }],
[{ list: 'ordered' }, { list: 'bullet' }, { indent: '+1' }, { indent: '-1' }, 'link', 'image', 'clean'],
        ],
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
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleQuillChange = this.handleQuillChange.bind(this);
    this.handleImgUpload = this.handleImgUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.errorFor = this.errorFor.bind(this);
    this.setAltText = this.setAltText.bind(this);
    this.updateValidationErrors = this.updateValidationErrors.bind(this);
    this.updateErrorViz = this.updateErrorViz.bind(this);
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

  setAltText(inline, filename) {
    const newBlog = Object.assign({}, this.state.newBlog);
    if (inline) {
      const inlineImg = Object.assign({}, newBlog.images[filename]);
      inlineImg.alt = newBlog.images.current.alt;
      newBlog.images[filename] = inlineImg;
    } else {
      newBlog.images.featured.alt = newBlog.images.current.alt;
    }
    this.setState(() => ({ newBlog }), () => {
      if (filename) {
        // console.log(this.state.newBlog.images[filename]);
      }
    });
  }

  handleChange(e) {
    const newBlog = Object.assign({}, this.state.newBlog);
    if (e.target.name === 'alt') {
      newBlog.images.current.alt = e.target.value;
    } else {
      newBlog[e.target.name] = e.target.value;
    }
    newBlog.timestamp = timeRef;
    newBlog.slug = generateSlug(newBlog.title);
    this.setState({
      newBlog,
      unsavedChanges: true,
    });
  }

  handleBlur(e) {
    const field = e.target.name;
    const newBlog = Object.assign({}, this.state.newBlog);
    newBlog[e.target.name] = e.target.value;
    const validationErrors = run(newBlog, fieldValidations);
    const touched = Object.assign({}, this.state.touched);
    touched[field] = true;
    const showErrors = !!(Object.values(validationErrors).length && touched[field]);
    this.setState({
      validationErrors,
      showErrors,
      touched,
    }, () => {
      console.log(this.state.validationErrors);
    });
  }

  handleFocus(e) {
    const field = e.target.name;
    const newBlog = Object.assign({}, this.state.newBlog);
    const validationErrors = run(newBlog, fieldValidations);
    validationErrors[field] = false;
    const showErrors = false;
    this.setState({
      validationErrors,
      showErrors,
    }, () => {
      console.log(this.state.validationErrors);
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
    const fileNameClean = generateSlug(fileName);
    newBlog.images[fileNameClean] = inlineImage;
  } else {
    const featuredImage = Object.assign({}, newBlog.images.current);
    newBlog.images.featured = featuredImage;
  }
  this.setState(() => ({
    newBlog,
  }),
);
});
  }

  errorFor(field) {
    if (this.state.validationErrors) {
      return this.state.validationErrors[field] || '';
    }
    return null;
  }

  unsavedChanges(e) {
    if (this.state.unsavedChanges) {
      e.returnValue = 'Unsaved Changes!';
      return 'Unsaved Changes!';
    }
    return null;
  }

  attachQuillRefs() {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    if (this.quillRef != null) return;
    const quillRef = this.reactQuillRef.getEditor();
    if (quillRef != null) this.quillRef = quillRef;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ showErrors: true, submit: true });
    const newBlog = Object.assign({}, this.state.newBlog);
    const validationErrors = run(newBlog, fieldValidations);
    this.setState({
      validationErrors,
    }, () => {
      if (validationErrors.title) {
        return null;
      }
      if (this.state.edit) {
        const { key } = this.state.newBlog;
        blogsRef.orderByChild('key').equalTo(key).once('value', (snapshot) => {
          if (snapshot.val() === null) {
            console.log('post not found');
            return null;
          }
          snapshot.ref.child(key).update(this.state.newBlog).then(() => {
            this.props.history.push('/dashboard');
          });
          return null;
        });
        return null;
      }
      const newBlogKey = blogsRef.push().key;
      newBlog.key = newBlogKey;
      const updates = {};
      updates[newBlogKey] = newBlog;
      blogsRef.update(updates).then(() => {
        this.setState({ showErrors: true });
        this.props.history.push('/dashboard');
      });
      return null;
    });
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

  updateValidationErrors(validationErrors, callback) {
    this.setState({
      validationErrors,
    }, () => {
      callback();
    });
  }

  updateErrorViz() {
    this.setState({
      showErrors: true,
      submit: true,
    }, () => {
      // console.log(this.state.showErrors, this.state.submit);
    });
  }

  render() {
    const { title, body, images } = this.state.newBlog;
    const modalStyles = { overlay: { zIndex: 10 } };
    return (
      <div id="cb">
        <Modal
          style={modalStyles}
          isOpen={this.state.modal.open}
          onRequestClose={this.closeModal}
          className="modal"
          contentLabel={this.state.modal.title}
        >
          <ModalGuts
            closeModal={this.closeModal}
            title={this.state.modal.title}
            handleImgUpload={this.handleImgUpload}
            images={this.state.newBlog.images}
            handleChange={this.handleChange}
            type={this.state.modal.type}
            danger={this.state.modal.danger}
            confirm={this.state.modal.confirm}
            handleInsertImage={this.handleInsertImage}
            quillRef={this.quillRef}
            handleBlur={this.handleBlur}
            handleFocus={this.handleFocus}
            setAltText={this.setAltText}
            validatonErrors={this.state.validationErrors}
            errorFor={this.errorFor}
            touched={this.state.touched}
            showError={this.state.showErrors}
            updateValidationErrors={this.updateValidationErrors}
            updateErrorViz={this.updateErrorViz}
            submit={this.state.submit}
          />
        </Modal>
        <h2 className="newBlog__banner">{this.state.edit ? 'Update Post' : 'New Blog Post'}</h2>
        {this.state.edit && title === '' && !body ? <Loading /> :
        <div className="newBlog__container">
          <form className="newBlog__form">
            <h3 className="newBlog__subhead">Input</h3>
            <FormInput
              className="newBlog__input"
              handleChange={this.handleChange}
              handleBlur={this.handleBlur}
              handleFocus={this.handleFocus}
              placeholder="Blog Title"
              showError={this.state.showErrors}
              text={this.state.newBlog.title}
              errorText={this.errorFor('title')}
              touched={this.state.touched.title}
              name="title"
              submit={this.state.submit}
            />
            <br />
            <h3 className="newBlog__subhead newBlog__subhead--sm">Set Featured Image</h3>
            <a
              role="button"
              tabIndex="0"
              onKeyPress={(e) => {
                const code = (e.keyCode ? e.keyCode : e.which);
                if (code === 32 || code === 13) {
                  this.openModal('featured', 'Set Featured Image', 'OK', false);
                }
              }
            }
              className="newBlog__button newBlog__button--featured"
              onClick={() => this.openModal('featured', 'Set Featured Image', 'OK', false)}
            >Choose File</a>
            <br />
            <div className="newBlog__editor">
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
              <div id="imgCont">
                {images.featured && images.featured.url &&
                <img
                  className="newBlog__img"
                  src={resize(document.getElementById('imgCont').offsetWidth, images.featured.url)}
                  alt={images.featured.alt}
                />}
              </div>
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
