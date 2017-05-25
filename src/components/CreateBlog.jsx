import React, { Component } from 'react';
import shortid from 'shortid';

class CreateBlog extends Component {
  constructor() {
    super();
    this.state = {
      newBlog: {},
      blogs: [],
    };
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
    console.log(blogs);
    this.setState({
      blogs,
    });
  }

  render() {
    const blogs = this.state.blogs.map(blog => (
      <div key={shortid.generate()}>
        <h3>{blog.inputTitle}</h3>
        <p>{blog.inputBody}</p>
      </div>
            ));

    console.log(blogs);

    return (
      <div>
        <form>
          <input type="text" name="inputTitle" onChange={e => this.handleChange(e)} />
          <input name="inputBody" onChange={e => this.handleChange(e)} />
          <button type="submit" onClick={e => this.handleCreate(e)}>Create</button>
        </form>
        {blogs}
      </div>
    );
  }
}

export default CreateBlog;
