import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

import { formatDate, blogsRef, createMarkup } from '../utils/';

class Notizie extends Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
    };
  }

  componentDidMount() {
    blogsRef.on('value', (snap) => {
      this.setState({
        blogs: snap.val(),
      });
    });
  }

  render() {
    const blogs = this.state.blogs;
    const recentBlogs = Object.values(blogs);
    let blogsArr = [];
    blogsArr = recentBlogs.map(blog => (
      <div className="blog__card" key={shortid.generate()}>
        <h3 className="blog__title">{blog.title}</h3>
        <img className="blog__img" src={blog.imgUrl} alt={blog.imgAlt} />
        <div className="blog__meta">{formatDate(new Date(blog.timestamp))}</div>
        <div className="blog__body" dangerouslySetInnerHTML={createMarkup(blog.body)} />
        <Link to={`/blog/${blog.slug}`} className="blog__button">
          Leggi l&rsquo;articolo
          </Link>
      </div>
      ));

    return (
      <div className="news">
        <h2 className="news__banner">In evidenza</h2>
        <div className="blog__container">
          { blogsArr }
        </div>
      </div>
    );
  }

}

export default Notizie;