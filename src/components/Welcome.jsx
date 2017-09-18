import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => (
  <div className="welcome">
    <div className="welcome__image" />
    <h1 className="welcome__text">Diventa donatore</h1>
    <Link to="/faq">
      <button className="welcome__button">Scopri Come</button>
    </Link>
  </div>
);

export default Welcome;
