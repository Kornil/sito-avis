// TODO: Don't allow files with the same file.name
// TODO: Create image uploading progress

import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import * as firebase from 'firebase';
import FormInput from './FormInput';
import { fieldValidations, run } from '../utils/index';

const PreviewGrid = require('react-packery-component')(React);

const packeryOptions = {
  gutter: 10,
};

class CreatePhotoGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      galleryName: '',
      images: [],
      unsavedChanges: false,
      edit: '',
      // modal: {
      //   open: false,
      //   type: '',
      //   title: '',
      //   body: '',
      //   confirm: '',
      //   danger: false,
      //   url: '',
      // },
      showErrors: false,
      validationErrors: {},
      touched: {
        galleryName: false,
      },
      submit: false,
    };

    this.onImageDrop = this.onImageDrop.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.handleAltChange = this.handleAltChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.errorFor = this.errorFor.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.unsavedChanges);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.unsavedChanges);
  }

  onImageDrop(files) {
    files.forEach((file) => { file.altText = ''; }); // eslint-disable-line
    this.setState(prevState => ({ images: [...prevState.images, ...files] }));
  }

  errorFor(field) {
    if (this.state.validationErrors) {
      return this.state.validationErrors[field] || '';
    }
    return null;
  }

  handleChange(e) {
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value,
      unsavedChanges: true,
    });
  }

  handleBlur(e) {
    const field = e.target.name;
    const newState = {
      validationErrors: run(Object.assign({}, this.state), fieldValidations),
      showErrors: true,
      touched: { [field]: true },
    };
    this.setState(Object.assign({}, this.state, newState));
  }

  handleFocus(e) {
    const field = e.target.name;
    const newState = {
      validationErrors: run(Object.assign({}, this.state), fieldValidations),
      showErrors: false,
      touched: { [field]: false },
    };
    this.setState(Object.assign({}, this.state, newState));
  }

  handleUpload() {
    console.log(this.state.images[0]);
    const files = this.state.images;
    const storageRef = firebase.storage().ref();
    const dateStamp = Date.now();
    const promises = files.map((file) => {
      // TODO: figure out better way to handle making a unique id

      const task = storageRef
        .child(
        `images/galleries/${this.state
          .galleryName} (${dateStamp})/${file.name}`,
      )
        .put(file);

      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          (snap) => {
            const percentage = Math.round(
              snap.bytesTransferred / snap.totalBytes * 100, // eslint-disable-line
            );
            console.log(percentage);
          },
          (err) => {
            // newBlog.images.current.error = err;
            console.log(err);
            reject();
          },
          () => {
            console.log('upload successful');
            resolve();
          },
        );
      });
    });

    Promise.all(promises).then(() => {
      console.log('All files uploaded');
      this.setState({ images: [] });
    });
  }

  removeFile(e) {
    const fileName = e.target.name;
    console.log(fileName);
    this.setState({
      images: this.state.images.filter(img => img.name !== fileName),
    });
  }

  unsavedChanges(e) {
    if (this.state.unsavedChanges) {
      e.returnValue = 'Unsaved Changes!';
      return 'Unsaved Changes!';
    }
    return null;
  }

  handleAltChange(e) {
    const fileName = e.target.name;
    const imageIndex = this.state.images.findIndex(image => image.name === fileName);
    const newImages = [...this.state.images];
    newImages[imageIndex].altText = e.target.value;
    this.setState({ images: newImages });
  }

  render() {
    let dropzoneRef;
    return (
      <div>
        <h2>Create a new photo gallery</h2>
        <div className="newBlog__container">
          <form className="newBlog__form">
            <FormInput
              placeholder="Gallery Name"
              className="form__input"
              handleChange={this.handleChange}
              handleBlur={this.handleBlur}
              handleFocus={this.handleFocus}
              name="galleryName"
              showError={this.state.showErrors}
              errorText={this.errorFor('galleryName')}
              touched={this.state.touched.galleryName}
              text={this.state.galleryName}
            />
            <Dropzone
              style={{
                height: '200px',
                width: '200px',
                borderStyle: 'dashed',
                marginLeft: 'auto',
                marginRight: 'auto',
                textAlign: 'center',
                paddingTop: '20px',
                marginBottom: '20px',
              }}
              ref={(node) => {
                dropzoneRef = node;
              }}
              multiple
              accept="image/*"
              onDrop={this.onImageDrop}
            >
              <p>Drop images here</p>
            </Dropzone>
            {/* button container */}
            <div style={{ textAlign: 'center' }}>
              <a
                role="button"
                tabIndex="0"
                onKeyPress={(e) => {
                  const code = e.keyCode ? e.keyCode : e.which;
                  if (code === 32 || code === 13) {
                    this.openModal(
                      'featured',
                      'Set Featured Image',
                      'OK',
                      false,
                    );
                  }
                }}
                className="newBlog__button newBlog__button--featured"
                onClick={() => {
                  dropzoneRef.open();
                }}
              >
                Choose File
              </a>
              <a
                role="button"
                tabIndex="0"
                className="newBlog__button newBlog__button--featured"
                onClick={this.handleUpload}
              >
                Upload Gallery
              </a>
            </div>
          </form>
          <div className="newBlog__preview">
            <h3 className="newBlog__subhead">Preview</h3>
            <div className="newBlog__wrapper">
              <PreviewGrid options={packeryOptions}>
                {this.state.images.map(file => (
                  <div key={file.preview}>
                    <img
                      width={200}
                      height={200}
                      src={file.preview}
                      alt="preview"
                    />
                    <input
                      className="form__input"
                      type="text"
                      onChange={this.handleAltChange}
                      name={file.name}
                      value={this.state.images.find(item => item.name === file.name).altText}
                    />
                    <a
                      style={{ display: 'block' }}
                      name={file.name}
                      role="button"
                      tabIndex="0"
                      className="newBlog__button newBlog__button--featured"
                      onClick={this.removeFile}
                    >
                      Remove
                    </a>
                  </div>
                ))}
              </PreviewGrid>
              {/* <h3 className="newBlog__title" /> */}
              {/* <div id="imgCont"> */}
              {/* {images.featured &&
                images.featured.url &&
                <img
                  className="newBlog__img"
                  src={resize(document.getElementById('imgCont').offsetWidth, images.featured.url)}
                  alt={images.featured.alt}
                />} */}
              {/* </div> */}
              {/* <div className="newBlog__body" dangerouslySetInnerHTML={sanitize(body)} /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePhotoGallery;
