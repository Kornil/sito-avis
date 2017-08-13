import React, { Component } from 'react';
import { galleriesRef, resize, formatDate } from '../utils/';

const renderImage = (image) => {
  console.log('here');
  return (
    <img
      className="sg__gallery-image"
      key={image.url}
      src={resize(200, image.url)}
      alt={image.alt}
    />
  );
};

class SingleGalleryDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGallery: {},
    };
  }
  componentDidMount() {
    const slug = this.props.match.params.slug;
    console.log('slug: ', slug);
    galleriesRef.orderByChild('slug').equalTo(slug).once('value', (snap) => {
      const currentGallery = Object.values(snap.val())[0];
      console.log(currentGallery);
      this.setState({
        currentGallery,
      });
    });
  }

  render() {
    const { images, title, timestamp } = this.state.currentGallery;
    console.log();
    return (
      <div>
        {!title
          ? <div className="sg__loader">Loading...</div>
          : <div>
            <h3 className="sg__title">
              {title}
            </h3>
            <div className="sg__meta">
              {formatDate(new Date(timestamp))}
            </div>
          </div>}
        {images &&
          images.length &&
          <div className="sg__image-container">
            {images.map(image => renderImage(image))}
          </div>}
      </div>
    );
  }
}
export default SingleGalleryDisplay;
