import React, { Component } from 'react';
import shortid from 'shortid';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import bloodBag from '../images/blood-bag.svg';
import handsHeart from '../images/hands-heart.svg';

class UpdateStats extends Component {
  constructor() {
    super();
    this.state = {
      newStats: {},
      stats: [],
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('avis');
    const statsRef = rootRef.child('stats');
    statsRef.on('value', (snap) => {
      this.setState({
        stats: snap.val() || [],
      });
    });
  }

  handleChange(event) {
    const newStats = Object.assign({}, this.state.newStats);
    newStats[event.target.name] = event.target.value;
    newStats.timestamp = firebase.database.ServerValue.TIMESTAMP;
    this.setState({
      newStats
    });
  }

  handleCreate(event) {
    event.preventDefault();
    const stats = Object.assign([], this.state.stats);
    stats.push(this.state.newStats);

    firebase.database().ref('avis').update({
      stats,
    });
  }

  render() {
    const { stats } = this.state;

    let statsArr = [];
    if (stats.length) {
      statsArr = stats.map(entry => (
        <div key={shortid.generate()}>
          <h3>Stats updated: {new Date(entry.timestamp).toString()}</h3>
          <div className="stats">
            <h2 className="stats__banner">Statistiche</h2>
            <div className="stats__link-container">
              <Link to="/donazione" className="stats__link">tutte statistiche 2016 &raquo; </Link>
            </div>
            <div className="stats__card-container">
              <div className="stats__card">
                <img className="stats__icon" src={handsHeart} alt="" />
                <div className="stats__number">{entry.donatori}</div>
                <div className="stats__label">Donatori</div>
              </div>
              <div className="stats__card">
                <img className="stats__icon" src={bloodBag} alt="" />
                <div className="stats__number">{entry.donazTotali}</div>
                <div className="stats__label">Donazioni totali</div>
              </div>
              <div className="stats__card">
                <div className="stats__icon stats__icon--new-member" />
                <div className="stats__number">{entry.nuoviMembri}</div>
                <div className="stats__label">nuovi membri</div>
              </div>
              <div className="stats__card">
                <div className="stats__icon stats__icon--members" />
                <div className="stats__number">{entry.membriTotali}</div>
                <div className="stats__label">membri totali</div>
              </div>
            </div>
          </div>
        </div>
      ));
    }

    return (
      <div>
        <form>
          <input type="number" title="donatori" name="donatori" id="donatori" onChange={e => this.handleChange(e)} placeholder="Donatori" /><br />
          <input type="number" title="donazione totali" name="donazTotali" id="donazTotali" onChange={e => this.handleChange(e)} placeholder="Donazione Totali" /><br />
          <input type="number" title="nuovi membri" name="nuoviMembri" id="nuoviMembri" onChange={e => this.handleChange(e)} placeholder="Nuovi Membri" /><br />
          <input type="number" title="membri totali" name="membriTotali" id="membriTotali" onChange={e => this.handleChange(e)} placeholder="Membri Totali" /><br />
          <button type="submit" onClick={e => this.handleCreate(e)}>Update</button>
        </form>
        { statsArr[statsArr.length - 1] }
      </div>
    );
  }
}

export default UpdateStats;