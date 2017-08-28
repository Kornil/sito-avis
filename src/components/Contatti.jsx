import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveAuth } from '../actions';
import { contattiRef } from '../utils/';

class Contatti extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contatti: {
        address: '',
        tel: '',
        email: '',
        codice: '',
        orari: '',
      },
    };
  }

  componentDidMount() {
    const key = '-Kr6evnjugl529678chul';
    contattiRef.child(key).once('value', (snapshot) => {
      const contatti = snapshot.val();
      console.log('49', contatti);
      this.setState({
        contatti,
      });
    });
  }
  render() {
    return (
      <div className="contatti">
        {/* contatti info section */}
        <div className="contatti__info">
          <div className="contatti__info-text-container">
            <p className="contatti__info-text">La nostra sede
            {this.props.auth &&
              <span className="contatti__edit-wrap">
                <Link to="/editcontatti">
                  <span className="contatti__edit" />
                </Link>
              </span> }
            </p>
            <p className="contatti__info-address">{this.state.contatti.address}</p>
            <div className="contatti__info-contact">
              <ul>
                <li><strong>Tel.: </strong>{this.state.contatti.tel}</li>
                <li><strong>Email: </strong><a href={`mailto:${this.state.contatti.email}`}>{this.state.contatti.email}</a></li>
                <li><strong>Codice fiscale: </strong>{this.state.contatti.codice}</li>
                <li><strong>Orari dufficio: </strong>{this.state.contatti.orari}</li>
              </ul>
            </div>
          </div>
          <div className="contatti__info-map">
            <iframe src="https://www.google.com/maps/embed/v1/place?q=Corso%20del%20Popolo%2C%2084%2045100%20Rovigo%20(RO)&key=AIzaSyA_a1Ri7HFM1UxGYg6McMXiOoLR3Gh8qJo&zoom=19">iframe</iframe>
          </div>
        </div>
        <div className="contatti__space-creator" />
        {/* cards section */}
        <div className="contatti__cards-container">
          {/* 1st Card */}
          <div className="contatti__card">
            <p className="contatti__card-heading">
              Avis Sede <br className="break-desktop-only" />Nazionale
            </p>
            <p className="contatti__card-address">
              Via E. Forlanini, 23
              <span className="split-address-tablet-mode" > | </span>
              20134 Milano (MI)
            </p>
            <ul className="contatti__card-info">
              <li className="first-child"><strong>Tel. linea 1: </strong>02 70006795</li>
              <li><strong>Tel. linea 2: </strong>02 70006786</li>
              <div className="visible-tablet-mode" />
              <li className="third-child"><strong>Email: </strong><a href="mailto:avis.nazionale@avis.it">avis.nazionale@avis.it</a></li>
              <li><strong>Codice fiscale: </strong>80099690150</li>
              <div className="visible-tablet-mode" />
              <li>
                <strong>Orari Segreteria: </strong>
                Lunedi - Venerdi: 9.00-13.30 e 14.00-17.30
              </li>
              <div className="visible-tablet-mode" />
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
          {/* 2nd Card */}
          <div className="contatti__card">
            <div className="contatti__card-heading">
              Avis Regionale <br className="break-desktop-only" />Veneto
            </div>
            <div className="contatti__card-address">
              Via dell Ospedale, 1
              <span className="split-address-tablet-mode" > | </span>
              31100 Treviso (TV)
            </div>
            <ul className="contatti__card-info">
              <li className="first-child"><strong>Tel.: </strong>0422 405088</li>
              <li><strong>Email: </strong><a href="mailto:info@avisveneto.it">info@avisveneto.it</a></li>
              <div className="visible-tablet-mode" />
              <li><strong>Codice fiscale: </strong>94019690265</li>
              <div className="visible-tablet-mode" />
              <li>
                <strong>Orari Segreteria: </strong>
                Lunedi - Venerdi: 9.00-13.30 e 15.00-18.00
              </li>
              <div className="visible-tablet-mode" />
              <li className="contatti__card-icon-container">
                <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <div className="contatti__card-icon contatti__card-icon-fb" />
                </a>
                <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                  <div className="contatti__card-icon contatti__card-icon-yt" />
                </a>
              </li>
            </ul>
          </div>
          {/* 3rd card */}
          <div className="contatti__card">
            <div className="contatti__card-heading">
              Avis Provinciale <br className="break-desktop-only" />Rovigo
            </div>
            <div className="contatti__card-address">
              Via F. Maffei, 5
              <span className="split-address-tablet-mode" > | </span>
              45100 Rovigo (RO)
            </div>
            <ul className="contatti__card-info">
              <li className="first-child"><strong>Tel.: </strong>0425 35860</li>
              <li><strong>Email: </strong><a href="mailto:sede@avisprovincialerovigo.it">sede@avisprovincialerovigo.it</a></li>
              <div className="visible-tablet-mode" />
              <li><strong>Codice fiscale: </strong>93003660292</li>
              <div className="visible-tablet-mode" />
              <li>
                <strong>Orari Segreteria: </strong>
                Lunedi - Venerdi: 9.30-12.30 e 16.00-18.00
              </li>
              <div className="visible-tablet-mode" />
              <li className="contatti__card-icon-container">
                <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <div className="contatti__card-icon contatti__card-icon-fb" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="contatti__space-creator" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  saveAuth: () => dispatch(saveAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contatti);
