import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { galleriesRef, resize } from '../utils/index';

// get list list of cover images

class GalleryFooter extends Component {
  constructor() {
    super();
    this.state = {
      galleries: [],
      coverImages: [],
      galleriesExistInDb: false,
    };
  }

  componentDidMount() {
    galleriesRef.on('value', (snap) => {
      this.setState({
        galleriesExistInDb: !!snap.val(),
      });
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

  pullCoverImages() {
    if (this.state.galleriesExistInDb) {
      return this.state.galleries.map(gallery =>
        <div>
          <Link key={gallery.slug} to={`/gallery/${gallery.slug}`}>
            <img className="blogInd__thumb" src={resize(50, gallery.images[0].url)} alt={gallery.alt} />
          </Link>
        </div>,
      );
    }
    return null;
  }

  render() {
    console.log(this.state.galleries);
    const images = this.pullCoverImages();
    return (
      <div className="gallery-footer__img-container">
        {images}
      </div>
    );
  }
}

export default GalleryFooter;
