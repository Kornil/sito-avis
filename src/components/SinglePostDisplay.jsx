import React, { Component } from 'react';
import { formatDate, blogsRef, sanitize, resize } from '../utils/';
import Spinner from './Spinner';

class SinglePostDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPost: {},
    };
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    blogsRef.orderByChild('slug').equalTo(slug).once('value', (snap) => {
      const posts = snap.val();
      const currentPost = posts[Object.keys(posts)[0]];
      this.setState({
        currentPost,
      });
    });
  }


  render() {
    const { title, images, timestamp, body } = this.state.currentPost;
    return (
      <div id="imgCont">
        {!title ?
          <Spinner /> :
          <div className="sp__container">
            <h3 className="sp__title">{title}</h3>
            <div className="sp__img-cont">
              {images && images.featured &&
              <img
                className="sp__img"
                src={resize(document.getElementById('imgCont').offsetWidth, images.featured.url)}
                alt={images.featured.alt}
              />}
            </div>
            <div className="sp__meta">{formatDate(new Date(timestamp))}</div>
            <div className="newBlog__body" dangerouslySetInnerHTML={sanitize(body)} />
          </div>}
      </div>
    );
  }
}

export default SinglePostDisplay;
