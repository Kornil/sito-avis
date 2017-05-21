import React from 'react';
import mail from '../images/mail.svg';
import fb from '../images/fb.svg';
import avisWhite from '../images/avis-white.svg';

const Footer = () => (
  <div className="footer">
    <img className="footer__image" src={avisWhite} alt="AVIS" />
    <div className="footer__text"><strong>Municipal Avis Rovigo</strong><br />
Corso del Popolo, 84 | 45100 Rovigo (RO)<br />
Tel. 0425 412925 | <a href="mailto:info@avisrovigo.it" className="footer__link">info@avisrovigo.it</a>
    </div>
    <div className="footer__icon-container">
      <a href="https://www.facebook.com/aviscomunalerovigo/" target="_blank" rel="noopener noreferrer"><img className="footer__icon" src={fb} alt="facebook" /></a>
      <a href="mailto:info@avisrovigo.it"><img className="footer__icon footer__icon-env" src={mail} alt="email" /></a>
    </div>
  </div>
);

export default Footer;
