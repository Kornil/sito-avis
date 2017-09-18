import React, { Component } from 'react';
import Lightbox from 'react-images';
import { galleriesRef, resize, formatDate } from '../utils/';
import Loading from './Loading';

class SingleGalleryDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGallery: {},
      lightboxIsOpen: false,
      currentImage: 0,
    };

    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    galleriesRef.orderByChild('slug').equalTo(slug).once('value', (snap) => {
      const currentGallery = Object.values(snap.val())[0];
      this.setState({
        currentGallery,
      });
    });
  }

  openLightbox(index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  gotoImage(index) {
    this.setState({
      currentImage: index,
    });
  }
  handleClickImage() {
    if (this.state.currentImage === this.state.currentGallery.images.length - 1) return;

    this.gotoNext();
  }

  render() {
    const { images, title, timestamp } = this.state.currentGallery;
    return (
      <div>
        { title &&
        <div>
          <h3 className="sg__title">
            {title}
          </h3>
          <div className="sg__meta">
            {formatDate(new Date(timestamp))}
          </div>
        </div> }
        {images &&
          images.length ?
            <div className="sg__image-container">
              {images.map((image, i) =>
                <a
                  href={image.url}
                  key={image.url}
                  onClick={e => this.openLightbox(i, e)}
                  alt={image.alt}
                >
                  <img src={resize(200, image.url)} alt={image.alt} className="sg__gallery-image" />
                </a>,
            )}

              <Lightbox
                currentImage={this.state.currentImage}
                images={images.map(img => ({ src: img.url }))}
                isOpen={this.state.lightboxIsOpen}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                onClose={this.closeLightbox}
                onClickImage={this.handleClickImage}
                backdropClosesModal
              />
            </div> : <Loading />}

      </div>
    );
  }
}
export default SingleGalleryDisplay;
