import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import { formatDate, blogsRef } from '../utils/';
import Loading from './Loading';

class BlogsIndex extends Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
      msg: false,
      currentKey: '',
      modalOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    blogsRef.on('value', (snap) => {
      const blogs = [];

      snap.forEach((childSnap) => {
        const blog = childSnap.val();
        blog['.key'] = childSnap.key;
        blogs.push(blog);
      });
      this.setState({
        blogs,
      });
    });
  }

  onDelete(key) {
    blogsRef.child(key).remove().then(() => {
      this.setState({
        msg: true,
        modalOpen: false,
      });
      setTimeout(() => {
        this.setState({
          msg: false,
          deleteKey: null,
        });
      }, 2000);
    });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  openModal(key) {
    this.setState({ modalOpen: true, deleteKey: key });
  }

  render() {
    const { blogs } = this.state;
    let blogsArr = [];
    if (blogs.length) {
      blogsArr = blogs.map(blog => (
        <tr key={blog['.key']} className="blogInd__row" >
          <td className="blogInd__cell blogInd__title">
            <Link to={`/blog/${blog.slug}`}>
              {blog.title}
            </Link>
          </td>
          <td className="blogInd__cell blogInd__imgCont">
            {blog.images && blog.images.featured &&
            <img
              className="blogInd__thumb"
              src={blog.images.featured.url}
              alt={blog.images.featured.alt}
            /> }
          </td>
          <td className="blogInd__cell blogInd__meta">{formatDate(new Date(blog.timestamp))}</td>
          <td className="blogInd__cell blogInd__icon-container">
            <Link
              to={`/edit/${blog.key}`}
              className=""
            >
              <div className="blogInd__icon blogInd__icon--edit" />
            </Link>
          </td>
          <td className="blogInd__cell blogInd__icon-container">
            <button
              className="blogInd__icon blogInd__icon--delete"
              onClick={() => this.openModal(blog['.key'])}
            />
          </td>
        </tr>));
    }

    return (
      <div className="blogInd__container">
        <Modal
          isOpen={this.state.modalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          className="modal"
          contentLabel="Confirm Delete"
        >
          <div className="modal__dialog">
            <div className="modal__content">
              <div className="modal__header">
                <button
                  type="button"
                  onClick={this.closeModal}
                  className="modal__close--x"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <h2 className="modal__title" id="modalTitle">Confirm Delete</h2>
              </div>
              <div className="modal__body">
                <p>Are you sure you want to delete this post? This cannot be undone.</p>
              </div>
              <div className="modal__footer">
                <button
                  type="button"
                  onClick={this.closeModal}
                  className="modal__button modal__close--btn"
                  data-dismiss="modal"
                >Cancel</button>
                <button
                  type="button"
                  onClick={() => this.onDelete(this.state.deleteKey)}
                  className="modal__button modal__confirm"
                  data-dismiss="modal"
                >Delete</button>
              </div>
            </div>
          </div>
        </Modal>
        {this.state.msg && <div className="blogInd__message">The post was successfully deleted.</div>}
        { (!blogsArr.length) ? <Loading /> :
        <div className="blogInd__table-cont">
          <table className="blogInd__grid">
            <thead>
              <tr>
                <th className="blogInd__tableHead">Title</th>
                <th className="blogInd__tableHead">Image</th>
                <th className="blogInd__tableHead">Date</th>
                <th className="blogInd__tableHead">Edit</th>
                <th className="blogInd__tableHead">Delete</th>
              </tr>
            </thead>
            <tbody>
              {blogsArr.reverse()}
            </tbody>
          </table>
        </div>}
      </div>
    );
  }
}

export default BlogsIndex;
