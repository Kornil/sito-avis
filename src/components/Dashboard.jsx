import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BlogsIndex from './BlogsIndex';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
    };
  }

  render() {
    return (
      <div className="dash__container">
        <h2 className="dash__banner">Dashboard</h2>
        <div className="dash__buttons-cont">
          <Link to="/createblog" className="dash__button">
            New Blog Post
          </Link>
          <Link to="/updatestats" className="dash__button">
            Update Statistics
          </Link>
          <Link to="/galleryindex" className="dash__button">
            Photo Galleries
          </Link>
        </div>
        <div className="blog__container">
          <BlogsIndex />
        </div>
      </div>
    );
  }
}

export default Dashboard;
