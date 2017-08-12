import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

import { blogsRef, sanitize, resize, cardWidth } from '../utils/';

class FAQ extends Component {
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
    const faq = Object.values(blogs).filter(blog => blog.tags && blog.tags.indexOf('FAQ') > -1).reverse();
    let faqArr = [];
    faqArr = faq.map(blog => (
      <div className="faq__card" key={shortid.generate()}>
        <h3 className="faq__title">{blog.title}</h3>
        <div className="imgCont">
          {blog.images && blog.images.featured &&
          <img
            className="faq__img"
            src={resize(cardWidth, blog.images.featured.url)}
            alt={blog.images.featured.alt}
          />}
        </div>
        <div className="faq__body" dangerouslySetInnerHTML={sanitize(blog.body)} />
      </div>
      ));

    return (
      <div className="news">
        <h2 className="news__banner">FAQ</h2>
        <div className="blog__container">
          { faqArr.reverse() }
        </div>
      </div>
    );
  }

}

export default FAQ;
