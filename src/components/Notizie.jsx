import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

import { formatDate, blogsRef, sanitizeExcerpt, resize, cardWidth } from '../utils/';
import Spinner from './Spinner';

class Notizie extends Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
    };
  }

  componentDidMount() {
    // fetch all posts from firebase
    blogsRef.on('value', (snap) => {
      this.setState({
        blogs: snap.val(),
      });
    });
  }

  render() {
    const blogs = this.state.blogs;
    // render only posts tagged 'homepage'
    const recentBlogs = Object.values(blogs).filter(blog => blog.tags && blog.tags.indexOf('Homepage') > -1);
    let blogsArr = [];
    blogsArr = recentBlogs.map(blog => (
      <div className="blog__card" key={shortid.generate()}>
        <h3 className="blog__title">{blog.title}</h3>
        <div className="imgCont">
          {blog.images && blog.images.featured &&
          <img
            className="blog__img"
            src={resize(cardWidth(this), blog.images.featured.url)}
            alt={blog.images.featured.alt}
          />}
        </div>
        <div className="blog__meta">{formatDate(new Date(blog.timestamp))}</div>
        <div className="blog__body blog__excerpt" dangerouslySetInnerHTML={sanitizeExcerpt(blog.body)} />
        <Link to={`/blog/${blog.slug}`} className="blog__button">
        Leggi l&rsquo;articolo</Link>
      </div>
      ));

    return (
      <div className="news">
        <h2 className="news__banner">In evidenza</h2>
        <div className="news__container">
          { this.state.blogs.length === 0 ? <Spinner /> : blogsArr.reverse() }
        </div>
      </div>
    );
  }

}

export default Notizie;
