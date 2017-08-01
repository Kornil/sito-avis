// TODO: Remove main error display after delay

import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import * as firebase from 'firebase';
import FormInput from './FormInput';
import ErrorMessages from './ErrorMessages';
import { fieldValidationsPhotoGallery, run, ruleRunner, required } from '../utils/index';

const PreviewGrid = require('react-packery-component')(React);

const packeryOptions = {
  gutter: 10,
  itemSelector: '.preview-item',
};

class CreatePhotoGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      galleryName: '',
      images: [],
      unsavedChanges: false,
      uploadProgress: {
        files: [],
        totalBytes: 0,
        bytesTransferred: 0,
        percentProgress: 0,
      },
      uploading: false,
      mainErrorDisplay: '',
      showErrors: {
        galleryName: false,
      },
      validationErrors: {},
      touched: {
        galleryName: false,
      },
      submit: false,
    };

    this.onImageDrop = this.onImageDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.errorFor = this.errorFor.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  onImageDrop(files) {
    // check to ensure file names are unique
    if (files.some(file => this.state.images.some(image => image.name === file.name))) {
      this.setState({ mainErrorDisplay: 'File names must be unique ' });
      return;
    }

    files.forEach((file) => {
      // create a new ruleRunner for each new image
      fieldValidationsPhotoGallery.push(
        ruleRunner(file.name, 'Alt text', required),
      );

      this.setState({
        images: [...this.state.images, ...files],
        validationErrors: run(Object.assign({}, this.state), fieldValidationsPhotoGallery),
      });
    });
  }

  errorFor(field) {
    if (this.state.validationErrors[field]) {
      return this.state.validationErrors[field] || '';
    }
    return null;
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      unsavedChanges: true,
    });
  }

  handleBlur(e) {
    const field = e.target.name;
    const newState = {
      validationErrors: run(Object.assign({}, this.state), fieldValidationsPhotoGallery),
      showErrors: Object.assign({}, this.state.showErrors, { [field]: true }),
      touched: Object.assign({}, this.state.touched, { [field]: true }),
    };
    this.setState(Object.assign({}, this.state, newState));
  }

  handleFocus(e) {
    const field = e.target.name;
    const newState = {
      validationErrors: run(Object.assign({}, this.state), fieldValidationsPhotoGallery),
      showErrors: Object.assign({}, this.state.showErrors, { [field]: false }),
      touched: Object.assign({}, this.state.touched, { [field]: false }),
    };
    this.setState(Object.assign({}, this.state, newState));
  }

  _updateProgress(snap, fileName) {
    let totalBytes = this.state.uploadProgress.totalBytes;
    const files = [...this.state.uploadProgress.files];
    const fileIndex = files.findIndex(f => Object.keys(f)[0] === fileName);
    if (fileIndex === -1) {
      files.push({ [fileName]: snap.bytesTransferred });
      totalBytes = this.state.uploadProgress.totalBytes + snap.totalBytes;
    } else {
      files[fileIndex][fileName] = snap.bytesTransferred;
    }
    const bytesTransferred = files.reduce((total, file) => total + Object.values(file)[0], 0);
    this.setState({
      uploadProgress: {
        totalBytes,
        files,
        percentProgress: Math.round((bytesTransferred / totalBytes) * 100),
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    // Prevent submit when no images have been selected for upload
    if (this.state.images.length === 0) {
      // display error message
      return;
    }

    const newState = Object.assign(
      {}, this.state, {
        validationErrors: run(Object.assign({}, this.state), fieldValidationsPhotoGallery),
        showErrors: { galleryName: true },
        submit: true,
      });
    this.state.images.forEach((image) => { newState.showErrors[image.name] = true; });

    Object.keys(newState.touched).forEach((key) => { newState.touched[key] = true; });
    this.setState(
      Object.assign({}, this.state, newState), () => {
        if (Object.keys(this.state.validationErrors).length > 0) {
          return;
        }

        // VALIDATION OK: BEGIN UPLOAD PRCOCESS
        this.setState({ uploading: true });
        const files = this.state.images;
        const storageRef = firebase.storage().ref();
        const dateStamp = Date.now();

        const uploads = files.map((file) => {
          // TODO: figure out better way to handle making a unique id

          const metaData = {
            customMetadata: {
              altText: this.state[file.name],
            },
          };

          const task = storageRef
            .child(
            `images/galleries/${this.state
              .galleryName} (${dateStamp})/${file.name}`,
          )
            .put(file, metaData);

          return new Promise((resolve, reject) => {
            task.on(
              'state_changed',
              (snap) => {
                this._updateProgress(snap, file.name);
              },
              (err) => {
                console.log(err);
                reject();
              },
              () => {
                resolve();
              },
            );
          });
        });

        Promise.all(uploads).then(() => {
          this.props.history.push('/dashboard');
        });
      });
  }

  removeFile(e) {
    const fileName = e.target.name;
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
              showError={this.state.showErrors.galleryName}
              errorText={this.errorFor('galleryName')}
              touched={this.state.touched.galleryName}
              text={this.state.galleryName}
            />
            <ErrorMessages display={!!this.state.mainErrorDisplay}>
              <div className="form__error-wrap">
                <span className="form__error-content">{this.state.mainErrorDisplay}</span>
              </div>
            </ErrorMessages>
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
                    dropzoneRef.open();
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
                onClick={this.handleSubmit}
              >
                {!this.state.uploading ? 'Upload Gallery' : 'Uploading'}
              </a>
            </div>
            {this.state.uploadProgress.percentProgress > 0 &&
              <span className="newBlog__imgProg">
                <span className="newBlog__img-upload-progress">Uploading... {this.state.uploadProgress.percentProgress}%</span>
              </span>}
          </form>
          <div className="newBlog__preview createGallery__preview">
            <h3 className="newBlog__subhead">Preview</h3>
            <div className="newBlog__wrapper">
              <PreviewGrid options={packeryOptions}>
                {this.state.images.map(file => (
                  <div key={file.preview} className="preview-item">
                    <div className="image-container">
                      <div>
                        <img
                          className="preview-image"
                          src={file.preview}
                          alt="preview"
                        />
                      </div>
                    </div>
                    <div className="preview-form-items">
                      <FormInput
                        className="form__input"
                        type="text"
                        name={file.name}
                        value={this.state.images.find(item => item.name === file.name).altText}
                        placeholder="Alt text for image"
                        handleChange={this.handleChange}
                        handleBlur={this.handleBlur}
                        handleFocus={this.handleFocus}
                        showError={this.state.showErrors[file.name]}
                        errorText={this.errorFor(file.name)}
                        touched={this.state.touched[file.name]}
                        submit={this.state.submit}
                      />
                      <a
                        style={{ display: 'block' }}
                        name={file.name}
                        role="button"
                        tabIndex="0"
                        className="removeButton newBlog__button newBlog__button--featured"
                        onClick={this.removeFile}
                      >
                        Remove
                    </a>
                    </div>
                  </div>
                ))}
              </PreviewGrid>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePhotoGallery;
