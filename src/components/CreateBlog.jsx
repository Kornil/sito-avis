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
    const rootRef = firebase.database().ref().child('react');
    const blogsRef = rootRef.child('blogs');
    blogsRef.on('value', (snap) => {
      console.log(JSON.stringify(snap.val()));
      this.setState({
        blogs: snap.val(),
      });
    });
  }

  handleChange(event) {
    const newBlog = Object.assign({}, this.state.newBlog);
    newBlog[event.target.name] = event.target.value;
    console.log(newBlog);
    this.setState({
      newBlog,
    });
  }

  handleCreate(event) {
    event.preventDefault();
    console.log('handleCreate');
    const blogs = Object.assign([], this.state.blogs);
    blogs.push(this.state.newBlog);

    firebase.database().ref('react').set({
      blogs,
    });
  }

  render() {
    let blogs = [];
    if (this.state.blogs.length) {
      blogs = this.state.blogs.map(blog => (
        <div key={shortid.generate()}>
          <h3>{blog.inputTitle}</h3>
          <p>{blog.inputBody}</p>
        </div>
      ));
      console.log(blogs);
    }

    return (
      <div>
        <form>
          <input type="text" name="inputTitle" onChange={e => this.handleChange(e)} placeholder="Blog Title"/><br/>
          <textarea name="inputBody" onChange={e => this.handleChange(e)} placeholder="Blog Content"/><br/>
          <button type="submit" onClick={e => this.handleCreate(e)}>Create</button>
        </form>
        {blogs}
      </div>
    );
  }
}

export default CreateBlog;