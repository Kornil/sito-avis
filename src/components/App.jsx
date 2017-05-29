import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import Navbar from './Navbar';
import Main from './Main';
import Footer from './Footer';

import { saveAuth } from '../actions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Avis Comunale Rovigo',
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((fireBaseUser) => {
      if (fireBaseUser) {
        console.log(fireBaseUser);
        this.props.saveAuth();
      } else {
        console.log('not logged in');
      }
    });
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

const mapDispatchToProps = dispatch => ({
  saveAuth: () => (dispatch(saveAuth())),
});

export default connect(null, mapDispatchToProps)(App);
