import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { formatDate, blogsRef, resize } from '../utils/';
import Loading from './Loading';

class BlogsIndex extends Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
      msg: false,
      currentKey: '',
      modalOpen: false,
      filterQuery: '',
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    blogsRef.on('value', (snap) => {
      const blogs = [];

      snap.forEach((childSnap) => {
        const blog = childSnap.val();
        blog['.key'] = childSnap.key;
        blogs.push(blog);
      });
      this.setState(() => ({
        blogs,
      }));
    });
  }

  componentWillUnmount() {
    blogsRef.off();
  }

  onDelete(key) {
    blogsRef.child(key).remove().then(() => {
      this.setState({
        msg: true,
        modalOpen: false,
      });
      setTimeout(() => {
        if (this.componentRef) {
          this.setState({
            msg: false,
            deleteKey: null,
          });
        }
      }, 2000);
    });
  }

  closeModal() {
    this.setState(() => ({ modalOpen: false }));
  }

  openModal(key) {
    this.setState(() => ({ modalOpen: true, deleteKey: key }));
  }

  render() {
    const tableColumns = [
      { Header: () => <div className="blogInd__tableHead">Title</div>,
        accessor: 'title',
        minWidth: 160,
        Cell: props =>
          <div className="blogInd__cell">
            <Link className="blogInd__title" to={`/blog/${props.original.slug}`}>{props.original.title}</Link> </div> },
      { Header: () => <div className="blogInd__tableHead">Image</div>,
        accessor: 'image',
        minWidth: 30,
        filterable: false,
        Cell: props =>
          <div className="blogInd__cell center">
            <img
              className="blogInd__thumb"
              src={resize(50, props.original.images.featured.url)}
              alt={props.original.images.featured.alt}
            /> </div> },
      { Header: () => <div className="blogInd__tableHead">Date</div>,
        accessor: 'date',
        minWidth: 60,
        filterable: false,
        Cell: props => <div className="blogInd__cell center"> {formatDate(new Date(props.original.timestamp))}</div>,
      },
      { Header: () => <div className="blogInd__tableHead">Edit</div>,
        accessor: 'edit',
        minWidth: 40,
        filterable: false,
        Cell: props =>
          <div className="blogInd__cell center">
            <Link
              to={`/edit/${props.original.key}`}
              className=""
            >
              <div className="blogInd__icon blogInd__icon--edit" />
            </Link> </div> },
      { Header: () => <div className="blogInd__tableHead">Delete</div>,
        accessor: 'delete',
        minWidth: 40,
        filterable: false,
        Cell: props => <div className="blogInd__cell center"> <button
          className="blogInd__icon blogInd__icon--delete"
          onClick={() => this.openModal(props.original['.key'])}
        /></div> },
    ];

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
                src={resize(50, blog.images.featured.url)}
                alt={blog.images.featured.alt}
              />}
          </td>
          <td className="blogInd__cell blogInd__meta">
            {formatDate(new Date(blog.timestamp))}</td>
          <td className="blogInd__cell blogInd__icon-container">
            <Link
              to={`/edit/${blog.key}`}
              className=""
            >
              <div className="blogInd__icon blogInd__icon--edit" />
            </Link>
          </td>
          <td className="blogInd__cell blogInd__icon-container" column="Delete">
            <button
              className="blogInd__icon blogInd__icon--delete"
              onClick={() => this.openModal(blog['.key'])}
            />
          </td>
        </tr>));
    }

    return (
      <div className="blogInd__container" id="blogInd">
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
        {(!blogsArr.length)
          ? <Loading />
          : <div ref={(ref) => { this.componentRef = ref; }} className="blogInd__table-cont">
            <ReactTable
              className="blogInd__grid -striped"
              data={blogs}
              columns={tableColumns}
              defaultPageSize={5}
              filterable
              defaultFilterMethod={(filter, row) =>
                    row[filter.id].includes(filter.value)}
            />
          </div>}
      </div>
    );
  }
}

export default BlogsIndex;
