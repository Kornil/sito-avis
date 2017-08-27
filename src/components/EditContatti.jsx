import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { contattiRef } from '../utils/';
import Loading from './Loading';

class EditContatti extends Component {
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
      const key = '-Kr6evnjugl529678chul';
      contattiRef.child(key).once('value', (snapshot) => {
        const contatti = snapshot.val();
        console.log(`49`, contatti);
        this.setState({
          contatti,
        });
      });
  }

  handleChange(e) {
    const contatti = { ...this.state.contatti };
    contatti[e.target.name] = e.target.value;
    this.setState({ ...this.state, contatti });
  }

  handleSubmit(e) {
    e.preventDefault();
    const key = '-Kr6evnjugl529678chul';
    contattiRef.orderByChild('key').equalTo(key).once('value', (snapshot) => {
      snapshot.ref.child(key).update(this.state.contatti).then(() => {
        this.props.history.push('/contatti');
      });
      return null;
    });
  }

  render() {
    const { address, tel, email, codice, orari } = this.state.contatti;
    return (
      <div id="contatti">
        <h2 className="newBlog__banner">Edit Contatti</h2>
        {!address ? <Loading /> :
        <div className="newBlog__container">
          <form className="newBlog__form">
            <h3 className="newBlog__subhead">Input</h3>
            <input
              type="text"
              className="form__input"
              onChange={this.handleChange}
              placeholder="Address"
              value={address}
              name="address"
            />
            <br />
            <input
              type="text"
              className="form__input"
              onChange={this.handleChange}
              placeholder="Tel"
              value={tel}
              name="tel"
            />
            <br />
            <input
              type="text"
              className="form__input"
              onChange={this.handleChange}
              placeholder="Email"
              value={email}
              name="email"
            />
            <br />
            <input
              type="text"
              className="form__input"
              onChange={this.handleChange}
              placeholder="Codice"
              value={codice}
              name="codice"
            />
            <br />
            <input
              type="text"
              className="form__input"
              onChange={this.handleChange}
              placeholder="Orari"
              value={orari}
              name="orari"
            />
            <br />
            <button
              className="newBlog__submit newBlog__button"
              type="submit"
              onClick={e => this.handleSubmit(e)}
            >Update Contatti</button>
            <Link
              to="/dashboard"
              className="newBlog__cancel newBlog__button"
            >Cancel</Link>
          </form>
          <div className="newBlog__preview">
            <h3 className="newBlog__subhead">Preview</h3>
            <div className="newBlog__wrapper">
              <div className="contatti__info">
                <div className="contatti__info-text-container">
                  <p className="contatti__info-text">La nostra sede</p>
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
              </div>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

export default EditContatti;
