import React, { Component } from 'react';
import * as firebase from 'firebase';
import bloodBag from '../images/blood-bag.svg';
import handsHeart from '../images/hands-heart.svg';

class Stats extends Component {
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
    const rootRef = firebase.database().ref().child('avis');
    const statsRef = rootRef.child('stats');
    statsRef.on('value', (snap) => {
      this.setState({
        newStats: snap.val()[snap.val().length - 1] || {},
      });
    });
  }

  render() {
    const { newStats } = this.state;
    return (
      <div>
        <div className="stats__container">
          <div>
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
                  <div className="stats__icon stats__icon--new-member" />
                  <div className="stats__number">{newStats.nuoviMembri}</div>
                  <div className="stats__label">nuovi membri</div>
                </div>
                <div className="stats__card">
                  <div className="stats__icon stats__icon--members" />
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

export default Stats;
