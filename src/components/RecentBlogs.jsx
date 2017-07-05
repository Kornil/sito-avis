import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

import { formatDate, blogsRef, sanitizeExcerpt } from '../utils/';

class RecentBlogs extends Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
    };
  }

  componentDidMount() {
    // fetch 3 most recent posts only
    blogsRef.orderByChild('id').limitToLast(3).on('value', (snap) => {
      this.setState({
        blogs: snap.val(),
      });
    });
  }

  render() {
    const blogs = this.state.blogs;
    const recentBlogs = Object.values(blogs).reverse();
    let blogsArr = [];
    blogsArr = recentBlogs.map(blog => (
      <div className="blog__card" key={shortid.generate()}>
        <h3 className="blog__title">{blog.title}</h3>
        {blog.images &&
        <img className="blog__img" src={blog.images.featured.url} alt={blog.images.featured.alt} />
      }
        <div className="blog__meta">{formatDate(new Date(blog.timestamp))}</div>
        <div className="blog__body blog__excerpt" dangerouslySetInnerHTML={sanitizeExcerpt(blog.body)} />
        <Link to={`/blog/${blog.slug}`} className="blog__button">
          Leggi l&rsquo;articolo
          </Link>
      </div>
      ));

    return (
      <div className="news">
        <h2 className="news__banner">In evidenza</h2>
        <div className="news__link-container">
          <Link to="/notizie" className="stats__link">altre notizie &raquo; </Link>
        </div>
        <div className="blog__container">
          { blogsArr }
        </div>
      </div>
    );
  }

}

export default RecentBlogs;
