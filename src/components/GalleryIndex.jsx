import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { formatDate, resize, galleriesRef } from '../utils/';
import Loading from './Loading';

class GalleryIndex extends Component {
  constructor() {
    super();
    this.state = {
      galleries: [],
      msg: false,
      // currentKey: '',
      modalOpen: false,
      galleriesExistInDb: false,
      // filterQuery: '',
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    galleriesRef.on('value', (snap) => {
      this.setState({
        galleriesExistInDb: !!snap.val(),
      });
      const galleries = [];

      snap.forEach((childSnap) => {
        const gallery = childSnap.val();
        gallery['.key'] = childSnap.key;
        galleries.push(gallery);
      });
      this.setState(() => ({
        galleries,
      }));
    });
  }

  componentWillUnmount() {
    galleriesRef.off();
  }
  // TODO: Delete photos in storage as well
  onDelete(key) {
    galleriesRef.child(key).remove().then(() => {
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
      {
        Header: () => <div className="blogInd__tableHead">Title</div>,
        accessor: 'title',
        minWidth: 160,
        Cell: props =>
          <div className="blogInd__cell">
            <Link className="blogInd__title" to={`/gallery/${props.original.slug}`}>{props.original.title}</Link></div>,
      },
      {
        Header: () => <div className="blogInd__tableHead">Cover Image</div>,
        accessor: 'image',
        minWidth: 30,
        filterable: false,
        Cell: props =>
          <div className="blogInd__cell center">
            <img
              className="blogInd__thumb"
              src={resize(50, props.original.images[0].url)}
              alt={props.original.images[0].alt}
            /> </div>,
      },
      {
        Header: () => <div className="blogInd__tableHead">Date</div>,
        accessor: 'date',
        minWidth: 60,
        filterable: false,
        defaultSortDesc: true,
        Cell: props => <div className="blogInd__cell center"> {formatDate(new Date(props.original.timestamp))}</div>,
      },
      {
        Header: () => <div className="blogInd__tableHead">Edit</div>,
        accessor: 'edit',
        minWidth: 40,
        filterable: false,
        Cell: props =>
          <div className="blogInd__cell center">
            <Link
              to={`/edit-gallery/${props.original.key}`}
              className=""
            >
              <div className="blogInd__icon blogInd__icon--edit" />
            </Link></div>,
      },
      {
        Header: () => <div className="blogInd__tableHead">Delete</div>,
        accessor: 'delete',
        minWidth: 40,
        filterable: false,
        Cell: props => <div className="blogInd__cell center"> <button
          className="blogInd__icon blogInd__icon--delete"
          onClick={() => this.openModal(props.original['.key'])}
        /></div>,
      },
    ];

    const galleries = [...this.state.galleries].reverse();
    // let galleriesArr = [];
    // if (galleries.length) {
    //   galleriesArr = galleries.map(gallery => (
    //     <tr key={gallery['.key']} className="blogInd__row" >
    //       <td className="blogInd__cell blogInd__title">
    //         <Link to={`/gallery/${gallery.slug}`}>
    //           {gallery.title}
    //         </Link>
    //       </td>
    //       <td className="galleryInd__cell galleryInd__imgCont">
    //         {gallery.images &&
    //           <img
    //             className="galleryInd__thumb"
    //             src={resize(50, gallery.images[0].url)}
    //             alt={gallery.images[0].alt}
    //           />}
    //       </td>
    //     </tr>));
    // }
    // TODO: add styling to <div>
    let noDataPlaceholder = <Loading />;
    if (!this.state.galleriesExistInDb) {
      noDataPlaceholder = <div>There are no galleries to display</div>;
    }
    // NOTE: Cover image shown should be controllable
    return (
      <div>
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
        <div className="dash__container">
          <h2 className="newBlog__banner--crumbs newBlog__banner">Dashboard</h2>
          <div className="dash__buttons-cont">
            <Link to="/createphotogallery" className="dash__button">
              Create New Photo Gallery
          </Link>
          </div>
        </div>
        {galleries.length === 0
          ? noDataPlaceholder
          : <div ref={(ref) => { this.componentRef = ref; }} className="blogInd__table-cont">
            <ReactTable
              className="blogInd__grid -striped"
              data={galleries}
              columns={tableColumns}
              defaultPageSize={5}
              defaultFilterMethod={(filter, row) =>
                row[filter.id].includes(filter.value)}
            />
          </div>}
      </div>
    );
  }
}
export default GalleryIndex;
