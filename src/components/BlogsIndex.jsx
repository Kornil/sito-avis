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
      { Header: 'Title',
        accessor: 'title',
        minWidth: 160,
        Cell: props =>
          <Link to={`/blog/${props.original.slug}`}>{props.original.title}</Link> },
      { Header: 'Image',
        accessor: 'image',
        minWidth: 30,
        filterable: false,
        Cell: props =>
          <img
            className="blogInd__thumb"
            src={resize(50, props.original.images.featured.url)}
            alt={props.original.images.featured.alt}
          /> },
      { Header: 'Date', accessor: 'date', minWidth: 60, filterable: false, Cell: props => formatDate(new Date(props.original.timestamp)),
    // sortMethod: (a, b) => {
    //                 if (a.length === b.length) {
    //                   return a > b ? 1 : -1;
    //                 }
    //                 return a.length > b.length ? 1 : -1;
    //               }
      },
      { Header: 'Edit',
        accessor: 'edit',
        minWidth: 40,
        filterable: false,
        Cell: props =>
          <Link
            to={`/edit/${props.original.key}`}
            className=""
          >
            <div className="blogInd__icon blogInd__icon--edit" />
          </Link> },
      { Header: 'Delete',
        accessor: 'delete',
        minWidth: 40,
        filterable: false,
        Cell: props => <button
          className="blogInd__icon blogInd__icon--delete"
          onClick={() => this.openModal(props.original['.key'])}
        /> },
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
              className="blogInd__grid table"
              data={blogs}
              columns={tableColumns}
              defaultPageSize={10}
              filterable
              defaultFilterMethod={(filter, row) =>
                    row[filter.id].includes(filter.value)}
            />
            {/*  <thead>
                <tr>
                  <th className="blogInd__tableHead">Title</th>
                  <th className="blogInd__tableHead">Image</th>
                  <th className="blogInd__tableHead">Date</th>
                  <th className="blogInd__tableHead">Edit</th>
                  <th className="blogInd__tableHead">Delete</th>
                </tr>
              </thead>
                {blogsArr.reverse()}
            </Table> */}

          </div>}
      </div>
    );
  }
}

export default BlogsIndex;
