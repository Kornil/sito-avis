import React, { Component } from 'react';
import shortid from 'shortid';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

class CreateBlog extends Component {
  constructor() {
    super();
    this.state = {
      newBlog: {},
      blogs: []
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('avis');
    const blogsRef = rootRef.child('blogs');
    blogsRef.on('value', (snap) => {
      this.setState({
        blogs: snap.val() || [],
      });
      });
  }

  generateSlug(title){
    return title.split(/\s|_|(?=[A-Z])/).join('-').toLowerCase();
  }

  formatDate(date) {
  let monthNames = [
    "genn","febbr","mar","apr","magg","giugno","luglio","ag","sett","ott","nov","dic"
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}


  handleChange(event) {
    const newBlog = Object.assign({}, this.state.newBlog);
    newBlog[event.target.name] = event.target.value;
    newBlog.timestamp = firebase.database.ServerValue.TIMESTAMP;
    newBlog.slug = this.generateSlug(newBlog.title);
    this.setState({
      newBlog
    });
  }

  handleImgUpload(event) {
    event.preventDefault();
    const newBlog = Object.assign({}, this.state.newBlog);
    let file = event.target.files[0];
    let storageRef = firebase.storage().ref('images/' + file.name);

    let task = storageRef.put(file);
    task.on('state_changed',
      function progress(snapshot) {
        let percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        newBlog.imgProgress = percentage;
        this.setState({
          newBlog
        });

      }.bind(this),
      function error(err) {
        newBlog.imgError = err;
        this.setState({
          newBlog
        });

      }.bind(this),
      function complete(snapshot) {
        let url = task.snapshot.downloadURL;
        newBlog.imgUrl = url;
        newBlog.imgSuccess = true;
        newBlog.imgFileName = file.name;
        this.setState({
          newBlog
        });
    }.bind(this));
}

  handleCreate(event) {
    event.preventDefault();
    const blogs = Object.assign([], this.state.blogs);
    blogs.push(this.state.newBlog);

    firebase.database().ref('avis').update({
      blogs,
    });

    const newBlog = Object.assign({}, this.state.newBlog);
    newBlog.body = "";
    newBlog.imgAlt = "";
    newBlog.title = "";
    this.setState({
          newBlog
        });
    console.log('body data cleared? ' + this.state.newBlog.body);
  }

  render() {
    const { blogs } = this.state;

    let blogsArr = [];
    if (blogs.length) {
      blogsArr = blogs.map(blog => (
        <div className="blog__card" key={shortid.generate()}>
          <h3 className="blog__title">{blog.title}</h3>
          <img className="blog__img" src={blog.imgUrl} alt={blog.imgAlt} />
          <div className="blog__meta">{this.formatDate(new Date(blog.timestamp))}</div>
          <div className="blog__body">{blog.body}</div>
          <Link to={`/blog/${blog.slug}`} className="blog__button">
          Leggi l&rsquo;articolo
          </Link>
        </div>
      ));
    }

    return (
      <div>
        <form>
          <input type="text" name="title" onChange={e => this.handleChange(e)} placeholder="Blog Title" /><br />
          <textarea name="body" onChange={e => this.handleChange(e)} placeholder="Blog Content" /><br />
          Upload image: &nbsp;
{this.state.newBlog.imgProgress >0 && !this.state.newBlog.imgSuccess && <span className="blog__img-upload-progress">Uploading... {this.state.newBlog.imgProgress}% </span>}
{this.state.newBlog.imgSuccess &&
  <div>
    <span className="blog__img-upload-success">Upload Successful </span>
    <img className='blog__img--thumb' src={this.state.newBlog.imgUrl} alt={this.state.newBlog.imgAlt} /><br />
    <span className="blog__img-caption">{this.state.newBlog.imgFileName}</span>
  </div>
}
          <br />
{!this.state.newBlog.imgSuccess && <input
                                      type="file"
                                      value=""
                                      className="fileButton"
                                      title="fileButton"
                                      name="fileButton"
                                      id="fileButton"
                                      onChange={e => this.handleImgUpload(e)}
                                      />}
          <br />
          <input type="text" name="imgAlt" onChange={e => this.handleChange(e)} placeholder="Alt text for image" /><br />
          <button type="submit" onClick={e => this.handleCreate(e)}>Create Post</button>
        </form>
        <div className='blog__container'>
        { blogsArr }
        </div>
      </div>
    );
  }
}

export default CreateBlog;
