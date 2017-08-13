import React, { Component } from 'react';
import shortid from 'shortid';

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
    console.log(faq);
    const faqEl = faq.map(el =>
      <div className="faq__card" key={shortid.generate()}>
        <h3 className="faq__title">{el.title}</h3>
        <div className="imgCont">
          {el.images && el.images.featured &&
          <img
            className="faq__img"
            src={resize(cardWidth, el.images.featured.url)}
            alt={el.images.featured.alt}
          />}
        </div>
        <div className="faq__body" dangerouslySetInnerHTML={sanitize(el.body)} />
      </div>
            );

    return (
      <div className="news">
        <h2 className="news__banner">FAQ</h2>
        <div className="blog__container">
          <div className="faq__masonry">
             {faqEl}
            </div>
        </div>
      </div>
    );
  }

}

export default FAQ;
