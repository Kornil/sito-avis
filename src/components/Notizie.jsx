import React, { Component } from 'react';
import shortid from 'shortid';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

const formatDate = (date) => {
  const monthNames = [
    'genn', 'febbr', 'mar', 'apr', 'magg', 'giugno', 'luglio', 'ag', 'sett', 'ott', 'nov', 'dic',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
};

class Notizie extends Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('avis');
    const blogsRef = rootRef.child('blogs');

    // fetch 3 most recent posts only
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
        <div className="blog__body">{blog.body}</div>
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
