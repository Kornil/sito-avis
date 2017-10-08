import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import * as firebase from 'firebase';
import { saveAuth } from '../actions';

// homepage
import Navbar from './Navbar';
import Home from './Home';
import Footer from './Footer';

// static public views
import Associazione from './Associazione';
import Donazione from './Donazione';
import FAQ from './FAQ';
import Contatti from './Contatti';

// dynamic public views, should also be lazy loaded...
import Notizie from './Notizie';
import SinglePostDisplay from './SinglePostDisplay';
import Gallerie from './Gallerie';
import SingleGalleryDisplay from './SingleGalleryDisplay';

// misc
import AdminBreadcrumbs from './AdminBreadcrumbs';
import ScrollToTop from './ScrollToTop';
import NotFound from './NotFound';

// admin views (lazy load)
import asyncComponent from './asyncComponent';

const Login = asyncComponent(() => import('./Login')
  .then(module => module.default), { name: 'Login' });
const CreateBlog = asyncComponent(() => import('./CreateBlog')
  .then(module => module.default), { name: 'CreateBlog' });
const UpdateStats = asyncComponent(() => import('./UpdateStats')
  .then(module => module.default), { name: 'UpdateStats' });
const Dashboard = asyncComponent(() => import('./Dashboard')
  .then(module => module.default), { name: 'Dashboard' });
const CreatePhotoGallery = asyncComponent(() => import('./CreatePhotoGallery')
  .then(module => module.default), { name: 'CreatePhotoGallery' });
const GalleryIndex = asyncComponent(() => import('./GalleryIndex')
  .then(module => module.default), { name: 'GalleryIndex' });
const EditContatti = asyncComponent(() => import('./EditContatti')
  .then(module => module.default), { name: 'EditContatti' });


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
            {this.props.auth &&
              <AdminBreadcrumbs />
            }
            <main className="main" id="main">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/associazione" component={Associazione} />
                <Route path="/faq" component={FAQ} />
                <Route path="/contatti" component={Contatti} />
                <Route path="/donazione" component={Donazione} />
                <Route path="/login" component={Login} />
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
