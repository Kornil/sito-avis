// TODO: Create featured/cover image selection
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import FormInput from './FormInput';
import ErrorMessages from './ErrorMessages';
import {
  fieldValidationsPhotoGallery,
  run,
  ruleRunner,
  required,
  timeRef,
  generateSlug,
  galleriesRef,
} from '../utils/index';

const PreviewGrid = require('react-packery-component')(React);

const packeryOptions = {
  gutter: 10,
  itemSelector: '.preview-item',
};

class CreatePhotoGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      newGallery: {
        title: '',
        images: [],
        key: '',
      },
      localFieldValidations: [...fieldValidationsPhotoGallery],
      uploadProgress: {
        files: [],
        totalBytes: 0,
        bytesTransferred: 0,
        percentProgress: 0,
      },
      uploading: false,
      mainErrorDisplay: '',
      showErrors: {
        title: false,
      },
      validationErrors: {},
      touched: {
        title: false,
      },
      submit: false,
      componentRef: null,
    };

    this.onImageDrop = this.onImageDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.errorFor = this.errorFor.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentWillMount() {
    // check to see if editing existing gallery
    if (this.props.match.params.key) {
      const key = this.props.match.params.key;
      const newState = { ...this.state };
      galleriesRef.child(key).once('value', (snapshot) => {
        // fetch existing gallery from firebase and save to local state
        const newGallery = snapshot.val();
        newState.newGallery = { ...newGallery };
        newState.edit = true;
        this.setState({ ...newState });
      });
    }
  }

  onImageDrop(files) {
    const newState = { ...this.state };
    // check to ensure file names are unique
    if (
      files.some(file =>
        newState.newGallery.images.some(image => image.name === file.name),
      )
    ) {
      this.displayMainError('File names must be unique');
      return;
    }

    files.forEach((file) => {
      // create a new ruleRunner for each new image
      this.createFieldValidations(file);

      newState.newGallery.images = [...this.state.newGallery.images, file];

      newState.validationErrors = run(
          { ...newState.newGallery },
          this.state.localFieldValidations,
        );

      this.setState({
        ...newState,
      });
    });
  }

  createFieldValidations(file) {
    // set validation rule for alt text field on each image upload
    this.setState({
      localFieldValidations: [
        ...this.state.localFieldValidations,
        ruleRunner(file.name, 'Alt text', required),
      ],
    });
  }

  errorFor(field) {
    // return error for each field
    if (this.state.validationErrors[field]) {
      return this.state.validationErrors[field] || '';
    }
    return null;
  }

  handleChange(e) {
    // handle input for gallery title, and for alt text for NEW galleries
    const newState = { ...this.state };
    newState.newGallery[e.target.name] = e.target.value;
    this.setState({
      ...newState,
    });
  }

  handleAltText(e, idx) {
    // handle input for alt text for existing galleries
    // these galleries already have alt text stored in firebase
    // so need to use controlled inputs and store input in local state
    const currImg = { ...this.state.newGallery.images[idx] };
    currImg.alt = e.target.value;
    const newState = { ...this.state };
    // for each image in gallery, get alt text from input on
    // current image object
    newState.newGallery.images[idx] = { ...currImg };
    this.setState({
      ...newState,
    });
  }

  handleBlur(e) {
    // display validation errors onBlur
    const field = e.target.name;
    const newState = { ...this.state };
    // run validation rule for each field
    newState.validationErrors = run(
        { ...this.state.newGallery },
        this.state.localFieldValidations,
      );
    // display errors
    if (newState.validationErrors[field]) {
      newState.showErrors = { ...this.state.showErrors, [field]: true };
    }
    // set field state to touched
    newState.touched = { ...this.state.touched, [field]: true };
    this.setState({ ...newState });
  }

  handleFocus(e) {
    // hide validation errors for field with focus
    const field = e.target.name;
    const newState = {
      validationErrors: run(
        { ...this.state },
        this.state.localFieldValidations,
      ),
      showErrors: { ...this.state.showErrors, [field]: false },
      touched: { ...this.state.touched, [field]: false },
    };
    this.setState({ ...this.state, ...newState });
  }

  _updateProgress(snap, fileName) {
    // display image upload progress
    let totalBytes = this.state.uploadProgress.totalBytes;
    const files = [...this.state.uploadProgress.files];
    const fileIndex = files.findIndex(f => Object.keys(f)[0] === fileName);
    if (fileIndex === -1) {
      files.push({ [fileName]: snap.bytesTransferred });
      totalBytes = this.state.uploadProgress.totalBytes + snap.totalBytes;
    } else {
      files[fileIndex][fileName] = snap.bytesTransferred;
    }
    const bytesTransferred = files.reduce(
      (total, file) => total + Object.values(file)[0],
      0,
    );
    this.setState({
      uploadProgress: {
        totalBytes,
        files,
        percentProgress: Math.round((bytesTransferred / totalBytes) * 100),
      },
    });
  }

  displayMainError(errorMsg) {
    // error handling for gallery submit
    this.setState({ mainErrorDisplay: errorMsg });
    setTimeout(() => {
      if (this.componentRef) {
        this.setState({ mainErrorDisplay: '' });
      }
    }, 2000);
  }

  handleSubmit(e) {
    e.preventDefault();
    // Prevent submit when no images have been selected for upload
    if (this.state.newGallery.images.length === 0) {
      this.displayMainError('Gallery cannot be empty');
      return;
    }

    const newState = {
      ...this.state,
      ...{
        validationErrors: run(
          { ...this.state.newGallery },
          this.state.localFieldValidations,
        ),
        showErrors: { title: true },
        submit: true,
      },
    };
    // display validation errors for each image
    this.state.newGallery.images.forEach((image) => {
      newState.showErrors[image.name] = true;
    });

    Object.keys(newState.touched).forEach((key) => {
      newState.touched[key] = true;
    });
    this.setState({ ...this.state, ...newState }, () => {
      if (Object.keys(this.state.validationErrors).length > 0) {
        console.log('validation errors');
        return;
      }

      // VALIDATION OK: BEGIN UPLOAD PROCESS
      if (this.state.edit) {
        // if editing an existing gallery, find it in firebase by key
        const { key } = this.state.newGallery;
        galleriesRef.orderByChild('key').equalTo(key).once('value', (snapshot) => {
          if (snapshot.val() === null) {
            console.log('gallery not found');
            return null;
          }
          // update firebase data with new input
          snapshot.ref.child(key).update(this.state.newGallery).then(() => {
            // then redirect to gallery list
            this.props.history.push('/galleryindex');
          });
          return null;
        });
      }
      // if new gallery, generate key in firebase
      const newGalleryKey = galleriesRef.push().key;

      this.setState({ uploading: true });
      const files = [...this.state.newGallery.images];
      const storageRef = firebase.storage().ref();
      // populate database entry
      const dbEntry = {
        images: [],
        title: this.state.newGallery.title,
        timestamp: timeRef,
        slug: generateSlug(this.state.newGallery.title),
        key: newGalleryKey,
      };
      // for each image file...
      const uploads = files.map((file) => {
        // attach metadata (alt text)
        const metaData = {
          customMetadata: {
            altText: this.state.newGallery[file.name],
          },
        };
        // write the file and metadata to firebase storage
        const task = storageRef
          .child(
          `images/galleries/${newGalleryKey}/${file.name}`,
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
              // on success, save filename, url, and alt to db entry
              dbEntry.images.push({
                fileName: file.name,
                url: task.snapshot.downloadURL,
                alt: this.state.newGallery[file.name],
              });
              resolve();
            },
          );
        }).catch((err) => {
          console.error(err);
        });
      });

      Promise.all(uploads).then(() => {
        // after all image files have been saved to storage, then
        // save reference in database
        galleriesRef
          .child(newGalleryKey)
          .set(dbEntry)
          .then(() => {
            this.props.history.push('/galleryindex');
          });
      });
    });
  }

  removeFile(e) {
    // delete image from storage and delete reference from database
    const fileName = e.target.name;

    this.setState(
      {
        images: this.state.newGallery.images.filter(img => img.name !== fileName),
      },
      () => {
        // reset field validations
        this.setState({
          localFieldValidations: [...fieldValidationsPhotoGallery],
        });
        this.state.newGallery.images.forEach((file) => {
          this.createFieldValidations(file);
        });
      },
    );
  }

  render() {
    let dropzoneRef;
    return (
      <div
        ref={(ref) => {
          this.componentRef = ref;
        }}
      >
        <h2 className="newBlog__banner newBlog__banner--crumbs">New photo gallery</h2>
        <div className="newBlog__container">
          <form className="newBlog__form">
            <FormInput
              placeholder="Gallery Name"
              className="form__input"
              handleChange={this.handleChange}
              handleBlur={this.handleBlur}
              handleFocus={this.handleFocus}
              name="title"
              showError={this.state.showErrors.title}
              errorText={this.errorFor('title')}
              touched={this.state.touched.title}
              text={this.state.newGallery.title}
            />
            <ErrorMessages display={!!this.state.mainErrorDisplay}>
              <div className="form__error-wrap">
                <span className="form__error-content">
                  {this.state.mainErrorDisplay}
                </span>
              </div>
            </ErrorMessages>
            <Dropzone
              style={{
                height: '200px',
                width: '100%',
                borderStyle: 'dotted',
                marginLeft: '5px',
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
              <br />
              <a
                role="button"
                tabIndex="0"
                className="newBlog__button newBlog__button--featured"
                onClick={this.handleSubmit}
              >
                {!this.state.uploading ? 'Save Gallery' : 'Uploading'}
              </a>
              <Link
                to="/galleryindex"
                className="newBlog__cancel newBlog__button"
              >Cancel</Link>
            </div>
            {this.state.uploadProgress.percentProgress > 0 &&
              <span className="newBlog__imgProg">
                <span className="newBlog__img-upload-progress">
                  Uploading... {this.state.uploadProgress.percentProgress}%
                </span>
              </span>}
          </form>
          <div className="newBlog__preview createGallery__preview">
            <h3 className="newBlog__subhead">Preview</h3>
            <div className="newBlog__wrapper">
              <PreviewGrid options={packeryOptions}>
                {this.state.newGallery.images.map((file, idx) => (
                  <div key={file.preview || file.fileName} className="preview-item">
                    <div className="image-container">
                      <div>
                        <img
                          className="preview-image"
                          src={this.state.edit ? file.url : file.preview}
                          alt="preview"
                        />
                      </div>
                    </div>
                    <div className="preview-form-items">
                      <FormInput
                        className="form__input"
                        type="text"
                        name={file.name || file.fileName}
                        text={this.state.newGallery.images[idx].alt}
                        placeholder="Alt text for image"
                        handleChange={this.state.edit ?
                          e => this.handleAltText(e, idx) : this.handleChange}
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
                  </div>),
                )}
              </PreviewGrid>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePhotoGallery;
