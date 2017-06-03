import React, { Component } from 'react';
import shortid from 'shortid';
import * as firebase from 'firebase';

class CreateBlog extends Component {
  constructor() {
    super();
    this.state = {
      newBlog: {},
      blogs: [],
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


  handleChange(event) {
    const newBlog = Object.assign({}, this.state.newBlog);
    newBlog[event.target.name] = event.target.value;
    newBlog.timestamp = firebase.database.ServerValue.TIMESTAMP;
    this.setState({
      newBlog,
    });
  }

  handleCreate(event) {
    event.preventDefault();
    const blogs = Object.assign([], this.state.blogs);
    blogs.push(this.state.newBlog);

    firebase.database().ref('avis').update({
      blogs,
    });
  }

  render() {
    const { blogs } = this.state;

    let blogsArr = [];
    if (blogs.length) {
      blogsArr = blogs.map(blog => (
        <div key={shortid.generate()}>
          <h3>{blog.title}</h3>
          <p>{blog.body}</p>
          <p>{new Date(blog.timestamp).toString()}</p>
        </div>
      ));
    }

    return (
      <div>
        <form>
          <input type="text" name="title" onChange={e => this.handleChange(e)} placeholder="Blog Title" /><br />
          <textarea name="body" onChange={e => this.handleChange(e)} placeholder="Blog Content" /><br />
          <button type="submit" onClick={e => this.handleCreate(e)}>Create</button>
        </form>
        { blogsArr }
      </div>
    );
  }
}

export default CreateBlog;
