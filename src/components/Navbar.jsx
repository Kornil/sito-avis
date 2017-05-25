import React from 'react';
import { Link } from 'react-router-dom';
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
  }

  homePage() {
    if (this.state.menu === 'open') {
      this.navToggle();
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
    } else {
      this.setState({ menu: 'closed' });
    }
  }

  render() {
    const classObj = {
      closed: {
        nav: 'header__nav',
        bar1: 'header__icon__bar header__icon__bar-1',
        bar2: 'header__icon__bar header__icon__bar-2',
        bar3: 'header__icon__bar header__icon__bar-3',
      },

      open: {
        nav: 'header__nav header__nav-side',
        bar1: 'header__icon__bar header__icon__bar-1 header__icon__bar-1-active',
        bar2: 'header__icon__bar header__icon__bar-2 header__icon__bar-2-active',
        bar3: 'header__icon__bar header__icon__bar-3 header__icon__bar-3-active',
      },

      closing: {
        nav: 'header__nav header__nav-hidden',
        bar1: 'header__icon__bar header__icon__bar-1',
        bar2: 'header__icon__bar header__icon__bar-2',
        bar3: 'header__icon__bar header__icon__bar-3',
      },
    };


    return (
      <header className="header">
        <Link to="/" onClick={this.homePage} role="link" ><img className="header__image" src={logo} alt="Avis Comunale Rovigo" /></Link>
        <button className="header__icon" aria-expanded="false" aria-controls="navbar" onClick={this.navToggle} >
          <span className="sr-only">Toggle navigation</span>
          <div className={classObj[this.state.menu].bar1} />
          <div className={classObj[this.state.menu].bar2} />
          <div className={classObj[this.state.menu].bar3} />
        </button>
        <nav className={classObj[this.state.menu].nav}>
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
