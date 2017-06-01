import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/AvisRovigoLogo.svg';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menu: 'closed',
      width: window.innerWidth,
    };
    this.navToggle = this.navToggle.bind(this);
    this.homePage = this.homePage.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth });
    if (this.state.width > 910 && this.state.menu === 'open') {
      this.setState({ menu: 'closed' });
    }
  }

  homePage() {
    if (this.state.menu === 'open') {
      this.setState({ menu: 'closed' });
    }
  }

  navToggle() {
    if (this.state.width < 910) {
      if (this.state.menu === 'closed') {
        this.setState({ menu: 'open' });
      } else {
        this.setState({ menu: 'closing' });
        setTimeout(() => {
          this.setState({ menu: 'closed' });
        }, 300);
      }
    }
  }

  render() {
    const classObj = {
      closed: {
        nav: 'header__nav',
        bar1: 'header__bar header__bar--top',
        bar2: 'header__bar header__bar--mid',
        bar3: 'header__bar header__bar--bot',
        ariaE: false,
      },

      open: {
        nav: 'header__nav header__nav--side',
        bar1: 'header__bar header__bar--top header__bar--top-active',
        bar2: 'header__bar header__bar--mid header__bar--mid-active',
        bar3: 'header__bar header__bar--bot header__bar--bot-active',
        ariaE: true,
      },

      closing: {
        nav: 'header__nav header__nav--side header__nav--hidden',
        bar1: 'header__bar header__bar--top',
        bar2: 'header__bar header__bar--mid',
        bar3: 'header__bar header__bar--bot',
        ariaE: false,
      },
    };


    return (
      <header className="header">
        <NavLink to="/" onClick={this.homePage} role="link" ><img className="header__image" src={logo} alt="Avis Comunale Rovigo" /></NavLink>
        <button className="header__icon" aria-expanded={classObj[this.state.menu].ariaE} aria-controls="nav" onClick={this.navToggle} >
          <span className="sr-only">Toggle navigation</span>
          <div className={classObj[this.state.menu].bar1} />
          <div className={classObj[this.state.menu].bar2} />
          <div className={classObj[this.state.menu].bar3} />
        </button>
        <nav className={classObj[this.state.menu].nav}>
          <ul className="nav">
            <li className="nav__item" ><NavLink to="/associazione" onClick={this.navToggle} className="nav__item-link" activeClassName="nav__item-link--active">L&rsquo;associazione </NavLink></li>
            <li className="nav__item"><NavLink to="/faq" onClick={this.navToggle} className="nav__item-link" activeClassName="nav__item-link--active">FAQ</NavLink></li>
            <li className="nav__item"><NavLink to="/contatti" onClick={this.navToggle} className="nav__item-link" activeClassName="nav__item-link--active">Contatti</NavLink></li>
            <li className="nav__item"><NavLink to="/donazione" onClick={this.navToggle} className="nav__item-link nav__item-link--red" activeClassName="nav__item-link--red-active">Donazione</NavLink></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Navbar;
