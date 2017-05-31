import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import * as firebase from 'firebase';

import Navbar from './Navbar';
import Footer from './Footer';

import Home from './Home';
import Associazione from './Associazione';
import FAQ from './FAQ';
import Statistiche from './Statistiche';
import Contatti from './Contatti';
import Donazione from './Donazione';
import Login from './Login';
import CreateBlog from './CreateBlog';

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
        console.log('logged in');
        this.props.saveAuth();
      } else {
        console.log('not logged in');
      }
    });
  }

  render() {
    console.log(this.props.auth);
    return (
      <div>
        <Navbar />
        <main className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/associazione" component={Associazione} />
            <Route path="/faq" component={FAQ} />
            <Route path="/contatti" component={Contatti} />
            <Route path="/donazione" component={Donazione} />
            <Route path="/login" component={Login} />
<<<<<<< HEAD
            <Route path="/statistiche" component={Statistiche} />
=======
>>>>>>> 7e952b172e3c5fb3d35d8e9a07983823afc3a8c0
            {this.props.auth && <Route path="/createblog" component={CreateBlog} />}
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  saveAuth: () => (dispatch(saveAuth())),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
