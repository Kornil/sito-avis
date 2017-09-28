import React from 'react';
import avisWhite from '../images/avis-white.svg';

const Footer = () => (
  <div className="footer">
    <img className="footer__image" src={avisWhite} alt="AVIS" />
    <div className="footer__text"><strong>Municipal Avis Rovigo</strong><br />
Corso del Popolo, 84 | 45100 Rovigo (RO)<br />
Tel. 0425 412925 | <a href="mailto:info@avisrovigo.it" className="footer__link">info@avisrovigo.it</a>
    </div>
    <div className="footer__icon-container">
      <a href="https://www.facebook.com/aviscomunalerovigo/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <div className="fa fa-facebook-official footer__icon" />
      </a>
      <a href="mailto:info@avisrovigo.it" aria-label="Email">
        <div className="fa fa-envelope-o footer__icon" />
      </a>
    </div>
  </div>
);

export default Footer;
