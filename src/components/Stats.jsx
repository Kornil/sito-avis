import React from 'react';
import { Link } from 'react-router-dom';
import bloodBag from '../images/blood-bag.svg';
import handsHeart from '../images/hands-heart.svg';

const Stats = () => (
  <div className="stats">
    <h2 className="stats__banner">Statistiche</h2>
    <div className="stats__link-container">
      <Link to="/donazione" className="stats__link">tutte statistiche 2016 &raquo; </Link>
    </div>
    <div className="stats__card-container">
      <div className="stats__card">
        <img className="stats__icon" src={handsHeart} alt="" />
        <div className="stats__number">1661</div>
        <div className="stats__label">Donatori</div>
      </div>
      <div className="stats__card">
        <img className="stats__icon" src={bloodBag} alt="" />
        <div className="stats__number">3061</div>
        <div className="stats__label">Donazioni totali</div>
      </div>
      <div className="stats__card">
        <div className="stats__icon stats__icon--new-member" />
        <div className="stats__number">149</div>
        <div className="stats__label">nuovi membri</div>
      </div>
      <div className="stats__card">
        <div className="stats__icon stats__icon--members" />
        <div className="stats__number">1664</div>
        <div className="stats__label">membri totali</div>
      </div>
    </div>
  </div>
);

export default Stats;
