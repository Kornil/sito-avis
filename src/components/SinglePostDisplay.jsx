import React, { Component } from 'react';
import * as firebase from 'firebase';

const formatDate = (date) => {
  const monthNames = [
    'genn', 'febbr', 'mar', 'apr', 'magg', 'giugno', 'luglio', 'ag', 'sett', 'ott', 'nov', 'dic',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
};

class SinglePostDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPost: {},
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('avis');
    const blogsRef = rootRef.child('blogs');
    const slug = this.props.match.params.slug;
    blogsRef.orderByChild('slug').equalTo(slug).limitToLast(1).once('value', (snap) => {
      const posts = snap.val();
      const currentPost = posts[1];
      this.setState({
        currentPost,
      });
    });
  }


  render() {
    const { title, imgUrl, imgAlt, timestamp, body } = this.state.currentPost;
    return (
      <div>
        {!this.state.currentPost.title ?
          <div>Loading...</div> :
          <div>
            <h3 className="blog__title">{title}</h3>
            <img className="blog__img" src={imgUrl} alt={imgAlt} />
            <div className="blog__meta">{formatDate(new Date(timestamp))}</div>
            <div className="blog__body">{body}</div>
          </div>
        }
      </div>
    );
  }
}

export default SinglePostDisplay;
