import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/AvisRovigoLogo.svg';

class Navbar extends React.Component {

constructor(props) {
    super(props);
    this.navToggle = this.navToggle.bind(this);
    this.navClose = this.navClose.bind(this);
    }

navToggle() {
    this.bar1 = document.querySelector('.header__icon__bar-1');
    this.bar2 = document.querySelector('.header__icon__bar-2');
    this.bar3 = document.querySelector('.header__icon__bar-3');
    this.nav = document.querySelector('.header__nav');
    console.log(this.nav);
    if (window.innerWidth < 910) {
      this.bar1.classList.toggle('header__icon__bar-1-active');
      this.bar2.classList.toggle('header__icon__bar-2-active');
      this.bar3.classList.toggle('header__icon__bar-3-active');
      if (!this.nav.classList.contains('header__nav-side')) {
        this.nav.classList.add('header__nav-side');
      } else {
        this.nav.classList.add('header__nav-hidden');
        setTimeout(() => {
          this.nav.classList.remove('header__nav-hidden');
        }, 300);
        this.nav.classList.remove('header__nav-side');
      }
    }
  }

navClose() {
    this.bar1 = document.querySelector('.header__icon__bar-1');
    this.bar2 = document.querySelector('.header__icon__bar-2');
    this.bar3 = document.querySelector('.header__icon__bar-3');
    this.nav = document.querySelector('.nav');
    if (window.innerWidth < 910) {
      if (this.bar1.classList.contains('header__icon__bar-1-active')) {
        this.bar1.classList.remove('header__icon__bar-1-active');
        this.bar2.classList.remove('header__icon__bar-2-active');
        this.bar3.classList.remove('header__icon__bar-3-active');
      }
      this.nav.classList.add('header__nav-hidden');
      setTimeout(() => {
        this.nav.classList.remove('header__nav-hidden');
      }, 300);
      this.nav.classList.remove('header__nav-side');
    }
  }

render() {
    return (

      <header className="header">
        <Link to="/" onClick={this.navClose} role="link" ><img className="header__image" src={logo} alt="Avis Comunale Rovigo" /></Link>
        <button className="header__icon" aria-expanded="false" aria-controls="navbar" onClick={this.navToggle} >
          <span className="sr-only">Toggle navigation</span>
          <div className="header__icon__bar header__icon__bar-1" />
          <div className="header__icon__bar header__icon__bar-2" />
          <div className="header__icon__bar header__icon__bar-3" />
        </button>
        <nav className="header__nav">
          <ul className="header__nav__list">
            <li className="header__nav__item" ><Link to="/associazione" onClick={this.navToggle} role="link">L&rsquo;associazione </Link></li>
            <li className="header__nav__item"><Link to="/faq" onClick={this.navToggle} role="link">FAQ</Link></li>
            <li className="header__nav__item"><Link to="/contatti" onClick={this.navToggle} role="link">Contatti</Link></li>
            <li className="header__nav__item header__nav__item-red"><Link to="/donazione" onClick={this.navToggle} role="link">Donazione</Link></li>
          </ul>

        </nav>
      </header>
    );
  }


}

export default Navbar;
