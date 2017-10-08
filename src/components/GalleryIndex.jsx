import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import 'react-table/react-table.css';

import { formatDate, resize, galleriesRef, galleriesDbRef } from '../utils/';
import Spinner from './Spinner';

class GalleryIndex extends Component {
  constructor() {
    super();
    this.state = {
      galleries: [],
      msg: false,
      modalOpen: false,
      galleriesExistInDb: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    // fetch galleries from firebase
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

  onDelete(key) {
    // delete from storage
    const fileNamesToDelete = this.state.galleries
      .find(gallery => gallery.key === key).images
      .map(image => image.fileName);
    fileNamesToDelete.forEach((fileName) => {
      galleriesDbRef.child(`${key}/${fileName}`).delete()
        .catch(err => console.log(`error deleting ${fileName}: ${err}`));
    });

    // delete from database
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
        Filter: ({ filter, onChange }) =>
          <input
            type="text"
            placeholder="Search galleries"
            onChange={e => onChange(e.target.value)}
            style={{ width: '100%' }}
            value={filter ? filter.value : ''}
          />,
        // filter array of titles by query string, sort potential matches by relevance
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['title'] }),
        filterAll: true,
      },
      // image column is not filterable
      {
        Header: () => <div className="blogInd__tableHead" />,
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
      // date column is not filterable
      {
        Header: () => <div className="blogInd__tableHead">Date</div>,
        accessor: 'date',
        minWidth: 60,
        filterable: false,
        defaultSortDesc: true,
        Cell: props => <div className="blogInd__cell center"> {formatDate(new Date(props.original.timestamp))}</div>,
      },
      // edit column is not filterable
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
              title="Edit"
            >
              <i className="fa fa-pencil blogInd__icon blogInd__icon--edit" />
            </Link></div>,
      },
      // delete column is not filterable
      {
        Header: () => <div className="blogInd__tableHead">Delete</div>,
        accessor: 'delete',
        minWidth: 40,
        filterable: false,
        Cell: props => <div className="blogInd__cell center"> <button
          className="fa fa-trash blogInd__icon blogInd__icon--delete"
          aria-label="Delete"
          onClick={() => this.openModal(props.original['.key'])}
        /></div>,
      },
    ];

    const galleries = [...this.state.galleries].reverse();

    let noDataPlaceholder = <Spinner />;
    if (!this.state.galleriesExistInDb) {
      noDataPlaceholder = <div>There are no galleries to display</div>;
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
                <p>Are you sure you want to delete this gallery? This cannot be undone.</p>
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
        {this.state.msg && <div className="blogInd__msg">Gallery successfully deleted.</div>}
        <div className="dash__container">
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
