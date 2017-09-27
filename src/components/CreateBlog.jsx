import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';

import * as firebase from 'firebase';
import { blogsRef, timeRef, generateSlug, sanitize, resize, fieldValidations, run } from '../utils/';
import Spinner from './Spinner';
import ModalGuts from './ModalGuts';
import FormInput from './FormInput';
import CheckboxGroup from './CheckboxGroup';

class CreateBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBlog: {
        title: '',
        tags: ['Homepage'],
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

    // custom configuration for quill (rich text editor)
    this.modules = {
      toolbar: {
        container: [[{ header: [3, 4, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote',
{ color: ['#007DC5', '#ED1C24', '#7a7a7a'] }],
[{ list: 'ordered' }, { list: 'bullet' }, { indent: '+1' }, { indent: '-1' }, 'link', 'image', 'clean'],
        ],
        // custom image handler stores image file in firebase and renders alt text for inline images
        handlers: {
          image: (value) => {
            const newBlog = { ...this.state.newBlog };
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
            // open inline image upload modal
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
    this.handleTagSelection = this.handleTagSelection.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.errorFor = this.errorFor.bind(this);
    this.setAltText = this.setAltText.bind(this);
    this.setFeatured = this.setFeatured.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.updateValidationErrors = this.updateValidationErrors.bind(this);
    this.updateErrorViz = this.updateErrorViz.bind(this);
  }

  componentDidMount() {
    // attach ref to Quill
    // this is necessary to give focus to the editor
    // when inserting inline images
    this.attachQuillRefs();
    // check to see if user is editing existing post or creating new post
    if (this.props.match.params.key) {
      const key = this.props.match.params.key;
      // if editing existing post, fetch it from firebase
      blogsRef.child(key).once('value', (snapshot) => {
        const newBlog = snapshot.val();
        if (!newBlog.tags) {
          newBlog.tags = [''];
        }
        // save post data to local state
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

  setAltText(inline, filename) {
    // alt text is first stored in 'current image' object on file upload,
    // then copied either to 'featured' or 'images.filename'
    const newBlog = { ...this.state.newBlog };
    // for inline images, create a new key in the images object
    // for the filename, and store alt text there
    if (inline) {
      const inlineImg = { ...newBlog.images[filename] };
      inlineImg.alt = newBlog.images.current.alt;
      newBlog.images[filename] = inlineImg;
    // otherwise store alt text in the featured image object
    } else {
      newBlog.images.featured.alt = newBlog.images.current.alt;
    }
    this.setState({ newBlog });
  }

  setFeatured() {
    // copy current image to featured image object
    const newBlog = { ...this.state.newBlog };
    const featuredImage = newBlog.images.current;
    newBlog.images.featured = featuredImage;
    this.setState({
      newBlog,
    });
  }

  handleChange(e) {
    const newBlog = { ...this.state.newBlog };
    // alt text is stored in newBlog.images.current
    if (e.target.name === 'alt') {
      newBlog.images.current.alt = e.target.value;
    } else {
    // for all other fields, set value on newBlog object
      newBlog[e.target.name] = e.target.value;
    }
    // get timestamp from firebase and store in newBlog
    newBlog.timestamp = timeRef;
    // generate url slug from title string
    newBlog.slug = generateSlug(newBlog.title);
    this.setState({ ...this.state, newBlog });
  }

  handleTagSelection(e) {
    // handle change on checkbox input for post tags, allow multiple selection
    const newBlog = { ...this.state.newBlog };
    const newSelection = e.target.value;
    let newSelectionArray;
    if (this.state.newBlog.tags.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.newBlog.tags.filter(s => s !== newSelection);
    } else {
      newSelectionArray = [...this.state.newBlog.tags, newSelection];
    }
    newBlog.tags = newSelectionArray;
    this.setState({ newBlog });
  }

  handleBlur(e) {
    // field validation
    const field = e.target.name;
    const newBlog = { ...this.state.newBlog };
    newBlog[e.target.name] = e.target.value;
    // run fieldValidations on fields in newBlog object
    const validationErrors = run(newBlog, fieldValidations);
    // track which fields have been touched by user
    const touched = { ...this.state.touched };
    touched[field] = true;
    // show errors for touched fields with validation errors
    const showErrors = !!(Object.values(validationErrors).length && touched[field]);
    this.setState({
      validationErrors,
      showErrors,
      touched,
    });
  }

  handleFocus(e) {
    // hide validation errors for field with focus
    const field = e.target.name;
    const newBlog = { ...this.state.newBlog };
    const validationErrors = run(newBlog, fieldValidations);
    validationErrors[field] = false;
    const showErrors = false;
    this.setState({
      validationErrors,
      showErrors,
    });
  }

  handleQuillChange(value) {
    // save quill value to local state
    const newBlog = { ...this.state.newBlog };
    newBlog.body = value;
    this.setState({
      newBlog,
    });
  }

  handleImgUpload(event) {
    // handle image upload to firebase storage, save url to blog post object
    event.preventDefault();
    const newBlog = { ...this.state.newBlog };
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref();
    // put uploaded file to firebase storage
    const task = storageRef.child(`images/${file.name}`).put(file);
    // display upload progress
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
  // after upload, get download url from firebase storage
  const url = task.snapshot.downloadURL;
  const fileName = file.name;
  // store download url in current image object
  newBlog.images.current.url = url;
  // log image success
  newBlog.images.current.success = true;
  // store filename in current image object
  newBlog.images.current.fileName = fileName;
  if (this.state.newBlog.images.current.inline) {
    // for inline images, clean filename, then add new key to newBlog.images
    const inlineImage = { ...newBlog.images.current };
    const fileNameClean = generateSlug(fileName);
    newBlog.images[fileNameClean] = inlineImage;
  }
  this.setState({
    newBlog,
  });
});
  }

  removeImage(type, filename) {
    const newBlog = { ...this.state.newBlog };
    // clear current image object
    newBlog.images.current = {};
    if (type === 'inline') {
      // for inline images, remove key from newBlog.images
      delete newBlog.images[filename];
    } else {
      // for featured images, clear featured object
      newBlog.featured = {};
    }
    this.setState({
      newBlog,
    }, () => this.closeModal());
  }

  errorFor(field) {
    // run validation check and return error(s) for this field
    if (this.state.validationErrors) {
      return this.state.validationErrors[field] || '';
    }
    return null;
  }

  attachQuillRefs() {
    // need this ref in order to give focus to editor
    // when inserting inline images
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    if (this.quillRef != null) return;
    const quillRef = this.reactQuillRef.getEditor();
    if (quillRef != null) this.quillRef = quillRef;
  }

  handleSubmit(e) {
    // submit blog post to firebase
    e.preventDefault();
    // show validation errors
    this.setState({ showErrors: true, submit: true });
    const newBlog = { ...this.state.newBlog };
    const validationErrors = run(newBlog, fieldValidations);
    this.setState({
      validationErrors,
    }, () => {
      // can't submit a post without a title
      if (validationErrors.title) {
        return null;
      }
      if (this.state.edit) {
        // if user is editing a previously-created post
        const { key } = this.state.newBlog;
        // find the post in firebase by key
        blogsRef.orderByChild('key').equalTo(key).once('value', (snapshot) => {
          if (snapshot.val() === null) {
            console.log('post not found');
            return null;
          }
          // update existing post with new data
          snapshot.ref.child(key).update(this.state.newBlog).then(() => {
            // then return to admin dashboard
            this.props.history.push('/dashboard');
          });
          return null;
        });
        return null;
      }
      // if it's a new post, get a key from firebase
      // and store it in newBlog object
      const newBlogKey = blogsRef.push().key;
      newBlog.key = newBlogKey;
      const updates = {};
      updates[newBlogKey] = newBlog;
      // store key in firebase
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
    // render image upload modal
    const newBlog = { ...this.state.newBlog };
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
    // save validation errors to local state
    this.setState({
      validationErrors,
    }, () => {
      callback();
    });
  }

  updateErrorViz() {
    // show errors on submit
    this.setState({
      showErrors: true,
      submit: true,
    });
  }

  render() {
    const { title, body, images, tags } = this.state.newBlog;
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
            removeImage={this.removeImage}
            setFeatured={this.setFeatured}
          />
        </Modal>
        <h2 className="newBlog__banner newBlog__banner--crumbs">{this.state.edit ? 'Update Post' : 'New Blog Post'}</h2>
        {this.state.edit && title === '' && !body ? <Spinner /> :
        <div className="newBlog__container">
          <form className="newBlog__form">
            <h3 className="newBlog__subhead">Input</h3>
            <FormInput
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
            <CheckboxGroup
              title={'Tags'}
              setName={'tags'}
              type={'checkbox'}
              controlFunc={this.handleTagSelection}
              options={['Homepage', 'FAQ']}
              selectedOptions={tags}
            />
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
                {images && images.featured && images.featured.url &&
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
