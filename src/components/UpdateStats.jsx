import React, { Component } from 'react';
import * as firebase from 'firebase';
import { formatDate } from '../utils/';
import bloodBag from '../images/blood-bag.svg';
import handsHeart from '../images/hands-heart.svg';

class UpdateStats extends Component {
  constructor() {
    super();
    this.state = {
      newStats: {
        donatori: '',
        donazTotali: '',
        nuoviMembri: '',
        membriTotali: '',
      },
    };
  }

  componentDidMount() {
    // fetch stats from firebase
    const rootRef = firebase.database().ref().child('avis');
    const statsRef = rootRef.child('stats');
    statsRef.on('value', (snap) => {
      this.setState({
        newStats: snap.val()[snap.val().length - 1] || {},
      });
    });
  }

  handleChange(e) {
    // handle user input and timestamp submission
    const newStats = { ...this.state.newStats };
    newStats[e.target.name] = e.target.value;
    newStats.timestamp = firebase.database.ServerValue.TIMESTAMP;
    this.setState({
      newStats,
    });
  }

  handleCreate(event) {
    // create new stats object and write to firebase
    event.preventDefault();
    const stats = [...this.state.stats];
    stats.push(this.state.newStats);

    firebase.database().ref('avis').update({
      stats,
    });
  }

  render() {
    const { newStats } = this.state;
    return (
      <div>
        <h2 className="newBlog__banner">Update Statistics</h2>
        <div className="stats__container">
          <form className="newBlog__form">
            <label
              htmlFor="donatori"
              className="form__label"
            >
                Donatori
              </label>
            <input
              type="number"
              title="donatori"
              name="donatori"
              id="donatori"
              value={newStats.donatori}
              onChange={e => this.handleChange(e)}
              placeholder="Donatori"
              className="form__input"
            /><br />
            <label
              htmlFor="donazTotali"
              className="form__label"
            >
                Donazione Totali
              </label>
            <input
              type="number"
              title="donazione totali"
              name="donazTotali"
              id="donazTotali"
              value={newStats.donazTotali}
              onChange={e => this.handleChange(e)}
              placeholder="Donazione Totali"
              className="form__input"
            /><br />
            <label
              htmlFor="nuoviMembri"
              className="form__label"
            >
                Nuovi Membri
              </label>
            <input
              type="number"
              title="nuovi membri"
              name="nuoviMembri"
              id="nuoviMembri"
              value={newStats.nuoviMembri}
              onChange={e => this.handleChange(e)}
              placeholder="Nuovi Membri"
              className="form__input"
            /><br />
            <label
              htmlFor="membriTotali"
              className="form__label"
            >
                Membri Totali
              </label>
            <input
              type="number"
              title="membri totali"
              name="membriTotali"
              id="membriTotali"
              value={newStats.membriTotali}
              onChange={e => this.handleChange(e)}
              placeholder="Membri Totali"
              className="form__input"
            /><br />
            <button
              className="newBlog__button"
              type="submit"
              onClick={e => this.handleCreate(e)}
            >
                Update
              </button>
          </form>
          <div>
            <h3 className="newBlog__subhead">Stats updated: {formatDate(new Date(newStats.timestamp))}</h3>
            <div className="stats">
              <h2 className="stats__banner">Statistiche</h2>
              <div className="stats__link-container" />
              <div className="stats__card-container">
                <div className="stats__card">
                  <img className="stats__icon" src={handsHeart} alt="" />
                  <div className="stats__number">{newStats.donatori}</div>
                  <div className="stats__label">Donatori</div>
                </div>
                <div className="stats__card">
                  <img className="stats__icon" src={bloodBag} alt="" />
                  <div className="stats__number">{newStats.donazTotali}</div>
                  <div className="stats__label">Donazioni totali</div>
                </div>
                <div className="stats__card">
                  <div className="fa fa-user-plus stats__icon stats__icon--new-member" />
                  <div className="stats__number">{newStats.nuoviMembri}</div>
                  <div className="stats__label">nuovi membri</div>
                </div>
                <div className="stats__card">
                  <div className="fa fa-group stats__icon stats__icon--members" />
                  <div className="stats__number">{newStats.membriTotali}</div>
                  <div className="stats__label">membri totali</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateStats;
