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
        images: {
          featured: {
          },
          current: {
            success: '',
            progress: '',
            url: '',
            fileName: '',
            alt: '',
          },
        },
        body: '<br/>',
      },
      unsavedChanges: false,
    };
    this.quillRef = null;
    this.reactQuillRef = null;

    const toolbarOptions = {
      container: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
      ],
      handlers: { image: this.handleInlineImage },
    };

    this.modules = {
      toolbar: toolbarOptions,
    };

    this.formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image',
    ];

    this.handleChange = this.handleChange.bind(this);
    this.handleQuillChange = this.handleQuillChange.bind(this);
    this.handleImgUpload = this.handleImgUpload.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.unsavedChanges = this.unsavedChanges.bind(this);
// this.attachQuillRefs = this.attachQuillRefs.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.unsavedChanges);
// this.attachQuillRefs();
  }

  componentDidUpdate() {
// this.attachQuillRefs();
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.unsavedChanges);
  }

/* attachQuillRefs() {
if (typeof this.reactQuillRef.getEditor !== 'function') return;
if (this.quillRef != null) return;
const quillRef = this.reactQuillRef.getEditor();
if (quillRef != null) this.quillRef = quillRef;
console.log(this.reactQuillRef);
console.log(this.quillRef);
}*/

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

  handleInlineImage() {
    console.log(this.quill);
    const range = this.quill.getSelection();
    document.getElementById('inlineImg').click();
    const value = prompt('What is the image URL');
    if (value) {
      this.quill.insertEmbed(range.index, 'image', value, 'user');
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
    },
(err) => {
  newBlog.images.current.error = err;
  console.log(err);
  this.setState({
    newBlog,
  });
},
() => {
  const url = task.snapshot.downloadURL;
  const filename = file.name;
  newBlog.images.current.url = url;
  newBlog.images.current.success = true;
  newBlog.images.current.fileName = filename;
// instead of checking className, set state to be inline and check that)
  if (event.target.className === 'ql-image') {
    console.log('inline image');
    const inlineImage = Object.assign({}, newBlog.images.current);
    newBlog.images.filename = inlineImage;
  } else {
    console.log('featured image');
    const featuredImage = Object.assign({}, newBlog.images.current);
    newBlog.images.featured = featuredImage;
  }
  this.setState({
    newBlog,
  });
  setTimeout(() => {
    newBlog.images.current.success = '';
    newBlog.images.current.progress = 0;
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
    const { title, images, body } = this.state.newBlog;
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
                ref={(el) => { this.reactQuillRef = el; }}
                state={this.state}
              >
                <div
                  key="editor"
                  className="quill-contents"
                />
              </ReactQuill>
            </div>
            <input type="file" id="inlineImg" onChange={e => this.handleImgUpload(e)} />
            <br />
            <div className="newBlog__fileUploadWrap newBlog__button">
              <span>Choose Featured Image</span>
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
            </span>}
            {images.current.success &&
            <span>
              <span className="newBlog__img-upload-progress">Upload Successful </span>
            </span>}
            <br />
            <input
              className="newBlog__input"
              type="text" name="imgAlt"
              onChange={e => this.handleChange(e)}
              placeholder="Alt text for image"
              value={images.current.alt}
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
              {images.featured.url && <img className="newBlog__img" src={images.featured.url} alt={images.featured.alt} />}
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
