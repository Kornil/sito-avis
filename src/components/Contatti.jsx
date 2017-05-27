import React from 'react';

const Contatti = () => (
  <div className="contatti">
    {/* contatti info section */}
    <div className="contatti__info">
      <p className="contatti__info-text">La nostra sede</p>
      <p className="contatti__info-address">Corso del Popolo, 84 <br />45100 Rovigo (RO)</p>
      <div className="contatti__info-contact">
        <ul>
          <li><strong>Tel.: </strong>0425 412925</li>
          <li><strong>Email: </strong><a href="mailto:info@avisrovigo.it">info@avisrovigo.it</a></li>
          <li><strong>Codice fiscale: </strong> 80006450292</li>
          <li><strong>Orari dufficio: </strong> Lunedi - Venerdi</li>
          <li>9.00-12.00 e 14.00-17.00</li>
          <li>Sabato: 9.00-12.00</li>
        </ul>
      </div>
    </div>
    <div className="contatti__info-map">
      <iframe src="https://www.google.com/maps/embed/v1/place?q=Corso%20del%20Popolo%2C%2084%2045100%20Rovigo%20(RO)&key=AIzaSyA_a1Ri7HFM1UxGYg6McMXiOoLR3Gh8qJo&zoom=19">iframe</iframe>
    </div>


    {/* cards section*/}
    <div className="contatti__cards-container">
      {/* 1st Card*/}
      <div className="contatti__card">
        <p className="contatti__card-heading">
          Avis Sede Nazionale
        </p>
        <p className="contatti__card-address">
          Via E. Forlanini, 23 <br />
          20134 Milano (MI)
        </p>
        <ul className="contatti__card-info">
          <li><strong>Tel. linea 1: </strong>02 70006795</li>
          <li><strong>Tel. linea 2: </strong>02 70006786</li>
          <li><strong>Email: </strong><a href="mailto:avis.nazionale@avis.it">avis.nazionale@avis.it</a></li>
          <li><strong>Codice fiscale: </strong>80099690150</li>
          <li><strong>Orari Segreteria: </strong></li>
          <li>Lunedi - Venerdi: </li>
          <li>9.00-13.30 e 14.00-17.30</li>
          <li className="contatti__card-icon-container">
            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <div className="contatti__card-icon contatti__card-icon-fb" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
              <div className="contatti__card-icon contatti__card-icon-yt" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <div className="contatti__card-icon contatti__card-icon-tw" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <div className="contatti__card-icon contatti__card-icon-it" />
            </a>
          </li>
        </ul>
      </div>
      {/* 2nd Card*/}
      <div className="contatti__card">
        <div className="contatti__card-heading">
          Avis Regionale Veneto
        </div>
        <div className="contatti__card-address">
          Via dell Ospedale, 1 <br />
          31100 Treviso (TV)
        </div>
        <ul className="contatti__card-info">
          <li><strong>Tel.: </strong>0422 405088</li>
          <li><strong>Email: </strong><a href="mailto:info@avisveneto.it">info@avisveneto.it</a></li>
          <li><strong>Codice fiscale: </strong>94019690265</li>
          <li><strong>Orari Segreteria: </strong></li>
          <li>Lunedi - Venerdi: </li>
          <li>9.00-13.30 e 15.00-18.00</li>
          <li className="contatti__card-icon-container">
            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <div className="contatti__card-icon contatti__card-icon-fb" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
              <div className="contatti__card-icon contatti__card-icon-yt" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <div className="contatti__card-icon contatti__card-icon-tw" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <div className="contatti__card-icon contatti__card-icon-it" />
            </a>
          </li>
        </ul>
      </div>
      {/* 3rd card*/}
      <div className="contatti__card">
        <div className="contatti__card-heading">
          Avis Provinciale Rovigo
        </div>
        <div className="contatti__card-address">
          Via F. Maffei, 5 <br />
          45100 Rovigo (RO)
        </div>
        <ul className="contatti__card-info">
          <li><strong>Tel.: </strong>0425 35860</li>
          <li><strong>Email: </strong><a href="mailto:sede@avisprovincialerovigo.it">sede@avisprovincialerovigo.it</a></li>
          <li><strong>Codice fiscale: </strong>93003660292</li>
          <li><strong>Orari Segreteria: </strong></li>
          <li>Lunedi - Venerdi: </li>
          <li>9.30-12.30 e 16.00-18.00</li>
          <li className="contatti__card-icon-container">
            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <div className="contatti__card-icon contatti__card-icon-fb" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
              <div className="contatti__card-icon contatti__card-icon-yt" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <div className="contatti__card-icon contatti__card-icon-tw" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <div className="contatti__card-icon contatti__card-icon-it" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div >
);

export default Contatti;
