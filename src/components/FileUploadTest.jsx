import React, { Component } from 'react';
import shortid from 'shortid';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

{ /*   need to add file extention validation, alt text */ }

class ImgUpload extends Component {
  constructor() {
    super();
    this.state = {
      newImg: {
        key: null,
        progress: 0,
        fileUrl: '',
        fileName: '',
        folderName: '',
        altText: '',
        success: false,
      },
      images: [],

    };
  }

/*
    componentDidMount() {
    const rootRef = firebase.database().ref().child('avis');
    const imagesRef = rootRef.child('images');
    imagesRef.on('value', (snap) => {
      this.setState({
        images: snap.val() || [],
      });
      console.log('32 '+ this.state.images);
    });
  }
*/

/*  make an image folder name from today's date */

  setFolderName() {
    Date.prototype.yyyymmdd = function () {
      const mm = (this.getMonth() + 1).toString();
      const dd = this.getDate().toString();

      return [this.getFullYear(), mm.length === 2 ? '' : '0', mm, dd.length === 2 ? '' : '0', dd].join('');
    };

    const today = new Date();
    return today.yyyymmdd();
  }

  handleChange(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const folderName = this.setFolderName();
    this.setState({
      newImg: {
        fileName: file.name,
        folderName,
      },
    });

    const storageRef = firebase.storage().ref(`images/${folderName}/${file.name}`);
    const metadata = {
      altText: this.state.newImg.altText,
    };
    const task = storageRef.put(file, metadata);
    task.on('state_changed',
      (snapshot) => {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
          newImg: {
            progress: percentage,
          },
        });
      },
      (err) => {

      },
      (snapshot) => {
        const imgURL = task.snapshot.downloadURL;
        const key = shortid.generate();
        this.setState({
          newImg: {
            fileUrl: imgURL,
            success: true,
            key,
            fileName: file.name,
          },
        });

        const newImg = Object.assign({}, this.state.newImg);
        this.setState({
          newImg,
        });
        const images = Object.assign([], this.state.images);
        images.push(this.state.newImg);

        { /*
    firebase.database().ref('avis').update({
      images
    });

        */ }
      },


      );
  }

  handleSubmit(event) {


  }


  render() {
    const { images } = this.state;
    console.log(images);
    let imagesArr = [];

    imagesArr = images.map(img => (

      <div key={shortid.generate()}>
        <Link to="/" className="image__link">
          <img className="gallery__thumb" src={img.fileURL} alt="" />
        </Link>
      </div>
                ));


    return (
      <div>
        <div className="images">
          <h2 className="images__banner">Galleria</h2>
          <div className="images__link-container">
            <Link to="/" className="images__link">tutte gallerie &raquo; </Link>
          </div>
          <div className="images__gallery-container">
            { imagesArr }
          </div>
        </div>


        <div>
          <form>
            <progress value={this.state.progress} max="100" className="uploader">0%</progress>
            <input type="file" value="" className="fileButton" title="fileButton" name="fileButton" id="fileButton" onChange={e => this.handleChange(e)} /><br />
            {/*   <button type="submit" onClick={e => this.handleSubmit(e)}>Submit</button> */}
          </form>
          {this.state.newImg.success && <div>Your file was uploaded successfully to {this.state.newImg.fileURL}</div>}
        </div>
      </div>
    );
  }
}

export default ImgUpload;
