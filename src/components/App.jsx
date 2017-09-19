import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import * as firebase from 'firebase';

import Navbar from './Navbar';
import AdminBreadcrumbs from './AdminBreadcrumbs';
import Footer from './Footer';

import Home from './Home';
import Associazione from './Associazione';
import FAQ from './FAQ';
import Statistiche from './Statistiche';
import Contatti from './Contatti';
import EditContatti from './EditContatti';
import Donazione from './Donazione';
import Login from './Login';
import CreateBlog from './CreateBlog';
import UpdateStats from './UpdateStats';
import SinglePostDisplay from './SinglePostDisplay';
import Notizie from './Notizie';
import Gallerie from './Gallerie';
import Dashboard from './Dashboard';
import CreatePhotoGallery from './CreatePhotoGallery';
import GalleryIndex from './GalleryIndex';
import SingleGalleryDisplay from './SingleGalleryDisplay';

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
        this.props.saveAuth();
      }
    });
  }

  render() {
    return (
      <div className="app-container">
        <Navbar />
        {this.props.auth &&
          <AdminBreadcrumbs />
        }
        <main className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/associazione" component={Associazione} />
            <Route path="/faq" component={FAQ} />
            <Route path="/contatti" component={Contatti} />
            <Route path="/donazione" component={Donazione} />
            <Route path="/login" component={Login} />
            <Route path="/statistiche" component={Statistiche} />
            <Route path="/notizie" component={Notizie} />
            <Route path="/gallerie" component={Gallerie} />

            {this.props.auth && <Route path="/createblog" component={CreateBlog} />}
            {this.props.auth && <Route path="/editcontatti" component={EditContatti} />}
            {this.props.auth && <Route path="/createphotogallery" component={CreatePhotoGallery} />}
            {this.props.auth && <Route path="/galleryindex" component={GalleryIndex} />}
            {this.props.auth && <Route path="/updatestats" component={UpdateStats} />}
            {this.props.auth && <Route path="/dashboard" component={Dashboard} />}
            {this.props.auth && <Route path="/edit-gallery/:key" component={CreatePhotoGallery} />}
            {this.props.auth && <Route path="/edit/:key" component={CreateBlog} />}

            <Route path="/blog/:slug" component={SinglePostDisplay} />
            <Route path="/gallery/:slug" component={SingleGalleryDisplay} />
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
  saveAuth: () => dispatch(saveAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
