import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';

import { formatDate, galleriesRef, cropSquare } from '../utils/index';
import Spinner from './Spinner';


class Gallerie extends Component {
  constructor() {
    super();
    this.state = {
      galleries: [],
    };
  }

  componentDidMount() {
    // fetch all photo galleries from firebase and save to local state
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
    const galleries = this.state.galleries;
    const recentGalleries = Object.values(galleries);
    let galleriesArr = [];
    galleriesArr = recentGalleries.map(gallery => (
      <div className="blog__card" key={gallery.key}>
        {!gallery.title
          ? <Spinner />
          : <div>
            <h3 className="rg__title">
              {gallery.title}
            </h3>
          </div>}
        {gallery.images &&
          gallery.images.length &&
          <div className="rg__image-container">
            {gallery.images.map(image =>
              <img src={cropSquare(50, image.url)} alt={image.alt} className="rg__gallery-image" key={shortid.generate()} />).slice(0, 4)}
          </div>}
        <div className="blog__meta">{formatDate(new Date(gallery.timestamp))}</div>
        <Link to={`/gallery/${gallery.slug}`} className="blog__button">Galleria completa</Link>
      </div>));

    return (
      <div className="news">
        <h2 className="news__banner">Gallerie</h2>
        <div className="news__container">
          { galleries.length === 0 ? <Spinner /> : galleriesArr.reverse() }
        </div>
      </div>
    );
  }

}

export default Gallerie;
