import React, { Component } from 'react';
import shortid from 'shortid';

import { blogsRef } from '../utils/';
import ToggleCard from './ToggleCard';

class FAQ extends Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
    };
  }

  componentDidMount() {
    // fetch blog posts from firebase
    blogsRef.on('value', (snap) => {
      this.setState({
        blogs: snap.val(),
      });
    });
  }

  render() {
    const blogs = this.state.blogs;
    // filter array by tag, return tag list includes 'faq',
    // sort reverse order by date
    const faq = Object.values(blogs).filter(blog => blog.tags && blog.tags.indexOf('FAQ') > -1).reverse();
    const faqEl = faq.map(el =>
      <div className="faq__card" key={shortid.generate()}>
        <ToggleCard
          id={shortid.generate()}
          title={el.title}
          images={el.images}
          body={el.body}
        />
      </div>,
            );

    return (
      <div className="news">
        <h2 className="news__banner">FAQ</h2>
        <div className="faq__container">
          <div className="faq__masonry">
            {faqEl}
          </div>
        </div>
      </div>
    );
  }

}

export default FAQ;
