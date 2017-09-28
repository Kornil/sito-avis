import React, { Component } from 'react';
import { connect } from 'react-redux';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import * as firebase from 'firebase';
// import Async from 'react-code-splitting'

import Navbar from './Navbar';
import Footer from './Footer';
// import Spinner from './Spinner';

// public components
import Associazione from './Associazione';
import Home from './Home';
import FAQ from './FAQ';
import Statistiche from './Statistiche';
import Contatti from './Contatti';
import Donazione from './Donazione';
import Login from './Login';
import SinglePostDisplay from './SinglePostDisplay';
import Notizie from './Notizie';
import Gallerie from './Gallerie';
// import SingleGalleryDisplay from './SingleGalleryDisplay';
import ScrollToTop from './ScrollToTop';
import NotFound from './NotFound';

// auth components
// import AdminBreadcrumbs from 'bundle-loader?lazy!./AdminBreadcrumbs';
// import Dashboard from 'bundle-loader?lazy!./Dashboard';
// import CreateBlog from 'bundle-loader?lazy!./CreateBlog';
// import EditContatti from 'bundle-loader?lazy!./EditContatti';
// import UpdateStats from 'bundle-loader?lazy!./UpdateStats';
// import CreatePhotoGallery from 'bundle-loader?lazy!./CreatePhotoGallery';
// import GalleryIndex from 'bundle-loader?lazy!./GalleryIndex';
import AdminBreadcrumbs from './AdminBreadcrumbs';
// import Dashboard from './Dashboard';
// import CreateBlog from './CreateBlog';
// import EditContatti from './EditContatti';
// import UpdateStats from './UpdateStats';
// import CreatePhotoGallery from './CreatePhotoGallery';
// import GalleryIndex from './GalleryIndex';

import { saveAuth } from '../actions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Avis Comunale Rovigo',
    };
  }

  componentDidMount() {
    // check login status
    firebase.auth().onAuthStateChanged((fireBaseUser) => {
      if (fireBaseUser) {
        this.props.saveAuth();
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <div>
            <Navbar />
            {this.props.auth && <AdminBreadcrumbs /> }
            <main className="main" id="main">
              <Switch>
                { /* public components are pre-loaded  */ }
                <Route exact path="/" component={Home} />
                <Route path="/associazione" component={Associazione} />
                <Route path="/faq" component={FAQ} />
                <Route path="/contatti" component={Contatti} />
                <Route path="/donazione" component={Donazione} />
                <Route path="/login" component={Login} />
                <Route path="/statistiche" component={Statistiche} />
                <Route path="/notizie" component={Notizie} />
                <Route path="/gallerie" component={Gallerie} />

                { /* auth components and photo galleries are lazy-loaded  */ }
                {this.props.auth &&
                  <Route
                    path="/createblog"
                    getComponent={(location, callback) => {
                      require.ensure([], (require) => {
                        callback(null, require('./CreateBlog'));
                      }, 'CreateBlog');
                    }}
                  />
                  // <Route path="/createblog" component={CreateBlog} />
                }
                {this.props.auth &&
                  <Route
                    path="/editcontatti"
                    getComponent={(location, callback) => {
                      require.ensure([], (require) => {
                        callback(null, require('./EditContatti'));
                      }, 'EditContatti');
                    }}
                  />
                  // <Route path="/editcontatti" component={EditContatti} />
                }
                {this.props.auth &&
                  <Route
                    path="/createphotogallery"
                    getComponent={(location, callback) => {
                      require.ensure([], (require) => {
                        callback(null, require('./CreatePhotoGallery'));
                      }, 'CreatePhotoGallery');
                    }}
                  />
                  // <Route path="/createphotogallery" component={CreatePhotoGallery} />
                }
                {this.props.auth &&
                  <Route
                    path="/galleryindex"
                    getComponent={(location, callback) => {
                      require.ensure([], (require) => {
                        callback(null, require('./GalleryIndex'));
                      }, 'GalleryIndex');
                    }}
                  />
                  // <Route path="/galleryindex" component={GalleryIndex} />
                }
                {this.props.auth &&
                  <Route
                    path="/updatestats"
                    getComponent={(location, callback) => {
                      require.ensure([], (require) => {
                        callback(null, require('./UpdateStats'));
                      }, 'UpdateStats');
                    }}
                  />
                  // <Route path="/updatestats" component={UpdateStats} />
                }
                {this.props.auth &&
                  <Route
                    path="/dashboard"
                    getComponent={(location, callback) => {
                      require.ensure([], (require) => {
                        callback(null, require('./Dashboard'));
                      }, 'Dashboard');
                    }}
                  />
                  // <Route path="/dashboard" component={Dashboard} />
                }
                {this.props.auth &&
                  <Route
                    path="/edit-gallery/:key"
                    getComponent={(location, callback) => {
                      require.ensure([], (require) => {
                        callback(null, require('./CreatePhotoGallery'));
                      }, 'CreatePhotoGallery');
                    }}
                  />
                  // <Route path="/edit-gallery/:key" component={CreatePhotoGallery} />
                }
                {this.props.auth &&
                  <Route
                    path="/edit/:key"
                    getComponent={(location, callback) => {
                      require.ensure([], (require) => {
                        callback(null, require('./CreateBlog'));
                      }, 'CreateBlog');
                    }}
                  />
                  // <Route path="/edit/:key" component={CreateBlog} />
                }
                <Route path="/blog/:slug" component={SinglePostDisplay} />
                <Route
                  path="/gallery/:slug"
                  getComponent={(location, callback) => {
                    require.ensure([], (require) => {
                      callback(null, require('./SingleGalleryDisplay'));
                    }, 'SingleGalleryDisplay');
                  }}
                />

                <Route path="*" component={NotFound} />
              </Switch>
            </main>
            <Footer />
          </div>
        </ScrollToTop>
      </BrowserRouter>
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
