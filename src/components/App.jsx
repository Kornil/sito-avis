import React, { Component } from 'react';

import Navbar from './Navbar';
import Main from './Main';
import Footer from './Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Avis Comunale Rovigo',
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
