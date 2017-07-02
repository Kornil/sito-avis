import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';

import * as firebase from 'firebase';
import { blogsRef, timeRef, generateSlug, createMarkup } from '../utils/';

class CreateBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBlog: {
        title: '',
        imgAlt: '',
        imgSuccess: '',
        imgProgress: '',
        body: '<br/>',
      },
      unsavedChanges: false,
    };
    this.modules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
      ],
    };
    this.formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image',
    ];
    this.handleChange = this.handleChange.bind(this);
    this.handleQuillChange = this.handleQuillChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.unsavedChanges = this.unsavedChanges.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.unsavedChanges);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.unsavedChanges);
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
    newBlog[event.target.name] = event.target.value;
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

  handleImgUpload(event) {
    event.preventDefault();
    const newBlog = Object.assign({}, this.state.newBlog);
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref();
    const task = storageRef.child(`images/${file.name}`).put(file);
    task.on('state_changed', (snap) => {
      const percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      newBlog.imgProgress = percentage;
      this.setState({
        newBlog,
      });
    },
(err) => {
  newBlog.imgError = err;
  console.log(err);
  this.setState({
    newBlog,
  });
},
() => {
  const url = task.snapshot.downloadURL;
  newBlog.imgUrl = url;
  newBlog.imgSuccess = true;
  newBlog.imgFileName = file.name;
  this.setState({
    newBlog,
  });
  setTimeout(() => {
    newBlog.imgSuccess = '';
    newBlog.imgProgress = 0;
    this.setState({
      newBlog,
    });
  }, 2000);
});
  }

  handleCreate(event) {
    event.preventDefault();
    const newBlog = Object.assign({}, this.state.newBlog);
    const newBlogKey = blogsRef.push().key;
    newBlog.key = newBlogKey;
    const updates = {};
    updates[newBlogKey] = newBlog;
    blogsRef.update(updates).then(() => {
      this.props.history.push('/dashboard');
    });
  }

  render() {
    const { title, imgUrl, imgAlt, imgSuccess, imgProgress, body } = this.state.newBlog;
    return (
      <div>
        <h2 className="newBlog__banner">New Blog Post</h2>
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
            <div className="newBlog__editor">
              <ReactQuill
                theme="snow"
                value={body}
                placeholder="Your blog post here"
                onChange={this.handleQuillChange}
                modules={this.modules}
                formats={this.formats}
              >
                <div
                  key="editor"
                  className="quill-contents"
                />
              </ReactQuill>
            </div>
            <br />
            <div className="newBlog__fileUploadWrap newBlog__button">
              <span>Upload Image</span>
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
            {imgProgress > 0 && !imgSuccess &&
            <span className="newBlog__imgProg">
              <span className="newBlog__img-upload-progress">Uploading... {imgProgress}%</span>
            </span>}
            {imgSuccess &&
            <span>
              <span className="newBlog__img-upload-progress">Upload Successful </span>
            </span>}
            <br />
            <input
              className="newBlog__input"
              type="text" name="imgAlt"
              onChange={e => this.handleChange(e)}
              placeholder="Alt text for image"
              value={imgAlt}
            />
            <br />
            <button
              className="newBlog__submit newBlog__button"
              type="submit"
              onClick={e => this.handleCreate(e)}
            >Create Post</button>
            <Link
              to="/dashboard"
              className="newBlog__cancel newBlog__button"
            >Cancel</Link>
          </form>
          <div className="newBlog__preview">
            <h3 className="newBlog__subhead">Preview</h3>
            <div className="newBlog__wrapper">
              <h3 className="newBlog__title">{title}</h3>
              {imgUrl && <img className="newBlog__img" src={imgUrl} alt={imgAlt} />}
              <div
                className="blog__body"
                dangerouslySetInnerHTML={createMarkup(body)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBlog;
