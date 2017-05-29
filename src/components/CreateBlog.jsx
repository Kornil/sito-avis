import React, { Component } from 'react';
import shortid from 'shortid';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

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
      this.setState({
        blogs: snap.val(),
      });
    });
  }

  handleChange(event) {
    const newBlog = Object.assign({}, this.state.newBlog);
    newBlog[event.target.name] = event.target.value;
    this.setState({
      newBlog,
    });
  }

  handleCreate(event) {
    event.preventDefault();
    const blogs = Object.assign([], this.state.blogs);
    blogs.push(this.state.newBlog);

    firebase.database().ref('react').set({
      blogs,
    });
  }

  render() {
    if (!this.props.auth) { return <p>Please log in</p>; }

    let blogs = [];
    if (this.state.blogs.length) {
      blogs = this.state.blogs.map(blog => (
        <div key={shortid.generate()}>
          <h3>{blog.inputTitle}</h3>
          <p>{blog.inputBody}</p>
        </div>
      ));
    }

    return (
      <div>
        <form>
          <input type="text" name="inputTitle" onChange={e => this.handleChange(e)} placeholder="Blog Title" /><br />
          <textarea name="inputBody" onChange={e => this.handleChange(e)} placeholder="Blog Content" /><br />
          <button type="submit" onClick={e => this.handleCreate(e)}>Create</button>
        </form>
        {blogs}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CreateBlog);
