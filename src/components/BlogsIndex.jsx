import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, blogsRef } from '../utils/';
import Loading from './Loading';

class BlogsIndex extends Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
      msg: '',
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    blogsRef.on('value', (snap) => {
      const blogs = [];

      snap.forEach((childSnap) => {
        const blog = childSnap.val();
        blog['.key'] = childSnap.key;
        blogs.push(blog);
      });
      this.setState({
        blogs,
      });
    });
  }

  handleDelete(key, title) {
// clean this up and make it a modal popup later
    if (confirm('Are you sure you want to delete this post?')) {
      blogsRef.child(key).remove();
    }
    const msg = title;
    this.setState({
      msg,
    });
  }

  render() {
    const { blogs } = this.state;

    let blogsArr = [];
    if (blogs.length) {
      blogsArr = blogs.map(blog => (
        <tr key={blog['.key']} className="blogInd__row" >
          <td className="blogInd__cell blogInd__title">
            <Link to={`/${blog.slug}`}>
              {blog.title}
            </Link>
          </td>
          <td className="blogInd__cell blogInd__imgCont">
            <img
              className="blogInd__thumb"
              src={blog.imgUrl}
              alt={blog.imgAlt}
            />
          </td>
          <td className="blogInd__cell blogInd__meta">{formatDate(new Date(blog.timestamp))}</td>
          <td className="blogInd__cell blogInd__icon-container">
            <Link
              to={`/${blog.slug}/edit`}
              className=""
            >
              <div className="blogInd__icon blogInd__icon--edit" />
            </Link>
          </td>
          <td className="blogInd__cell blogInd__icon-container">
            <button
              className="blogInd__icon blogInd__icon--delete"
              onClick={() => this.handleDelete(blog['.key'], blog.title)}
            />
          </td>
        </tr>
      ));
    }

    return (
      <div className="blogInd__container">
        <div className="blogInd__message">
          {this.state.msg}
        </div>
        { (!blogsArr.length) ? <Loading /> :
        <table className="blogInd__grid">
          <thead>
            <tr>
              <th className="blogInd__tableHead">Title</th>
              <th className="blogInd__tableHead">Image</th>
              <th className="blogInd__tableHead">Date</th>
              <th className="blogInd__tableHead">Edit</th>
              <th className="blogInd__tableHead">Delete</th>
            </tr>
          </thead>
          <tbody>
            {blogsArr.reverse()}
          </tbody>
        </table> }
      </div>
    );
  }
}

export default BlogsIndex;
