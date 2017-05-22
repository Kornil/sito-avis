import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/AvisRovigoLogo.svg';

const Navbar = () => (
  <header>
    <nav className="navbar">
      <Link to="/"><img className="navbar__image" src={logo} alt="Avis Comunale Rovigo" /></Link>
      <ul className="navbar__menu">
        <li className="navbar__link"><Link to="/associazione">L&rsquo;associazione</Link></li>
        <li className="navbar__link"><Link to="/faq">FAQ</Link></li>
        <li className="navbar__link"><Link to="/contatti">Contatti</Link></li>
        <li className="navbar__link navbar__link-red"><Link to="/donazione">Donazione</Link></li>
        <li className="navbar__link navbar__link-icon" aria-label="search" />
      </ul>
    </nav>
  </header>
);

export default Navbar;
