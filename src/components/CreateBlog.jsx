import React, { Component } from 'react';
import * as firebase from 'firebase';
import { blogsRef, timeRef, rootRef, generateSlug } from '../utils/';

class CreateBlog extends Component {
  constructor() {
    super();
    this.state = {
      newBlog: {
        title: '',
        body: '',
        imgAlt: '',
      },
      blogs: [],
    };
  }

  componentDidMount() {
    blogsRef.on('value', (snap) => {
      this.setState({
        blogs: snap.val() || [],
      });
    });
  }


  handleChange(event) {
    const newBlog = Object.assign({}, this.state.newBlog);
    newBlog[event.target.name] = event.target.value;
    newBlog.timestamp = timeRef;
    newBlog.slug = generateSlug(newBlog.title);
    newBlog.key = blogsRef.push().key;
    this.setState({
      newBlog,
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
    const blogs = Object.assign([], this.state.blogs);
    blogs.push(this.state.newBlog);

    rootRef.update({
      blogs,
    });

    this.props.history.push('/dashboard');
  }

  handleReset() {
    const newBlog = Object.assign({}, this.state.newBlog);
    newBlog.body = '';
    newBlog.imgAlt = '';
    newBlog.title = '';
    newBlog.imgUrl = '';
    this.setState({
      newBlog,
    });
  }

  render() {
    const { title, imgUrl, imgAlt, body, imgSuccess, imgProgress } = this.state.newBlog;
    return (
      <div>
        <h2 className="newBlog__banner">New Blog Post</h2>
        <div className="newBlog__container">
          <form className="newBlog__form">
            <h3 className="newBlog__subhead">Input</h3>
            <input
              className="newBlog__input"
              type="text" name="title"
              onChange={e => this.handleChange(e)}
              placeholder="Blog Title"
              value={title}
            />
            <br />
            <textarea
              className="newBlog__input"
              name="body" onChange={e => this.handleChange(e)}
              placeholder="Blog Content"
              value={body}
            />
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
            <button
              className="newBlog__cancel newBlog__button"
              type="reset"
              onClick={e => this.handleReset(e)}
            >Reset Form</button>
          </form>
          <div className="newBlog__preview">
            <h3 className="newBlog__subhead">Preview</h3>
            <div className="newBlog__wrapper">
              <h3 className="newBlog__title">{title}</h3>
              {imgUrl && <img className="newBlog__img" src={imgUrl} alt={imgAlt} />}
              <div className="blog__body">{body}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBlog;
