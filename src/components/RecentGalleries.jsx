import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, galleriesRef, resize, cardWidth } from '../utils/index';

class RecentGalleries extends Component {
  constructor() {
    super();
    this.state = {
      galleries: [],
    };
  }

  componentDidMount() {
    galleriesRef.on('value', (snap) => {
      const galleries = [];
      snap.forEach((childSnap) => {
        const gallery = childSnap.val();
        gallery['.key'] = childSnap.key;
        galleries.push(gallery);
      });
      this.setState(() => ({
        galleries,
      }));
    });
  }

  render() {
    const galleriesArr = this.state.galleries.map(gallery => (
      <div className="blog__card" key={gallery['.key']}>
        <h3 className="blog__title">{gallery.title}</h3>
        <img
          className="blog__img"
          src={resize(cardWidth(this), gallery.images[0].url)}
          alt={gallery.images[0].alt}
        />
        <div className="blog__meta">{formatDate(new Date(gallery.timestamp))}</div>
        <Link to={`/gallery/${gallery.slug}`} className="blog__button">Visualizzare la galleria</Link>
      </div>))
      .reverse().slice(0, 3);

    return (
      <div className="blog__container">
        {galleriesArr}
      </div>
    );
  }
}

export default RecentGalleries;
