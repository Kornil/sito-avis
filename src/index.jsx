import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from 'firebase';

import './styles/main.scss';

import store from './store';
import App from './components/App';

const config = {
  apiKey: 'AIzaSyDorzqQG5pgETcGGmQ58DrQhQUHYnVERHU',
  authDomain: 'avis-website-dac6e.firebaseapp.com',
  databaseURL: 'https://avis-website-dac6e.firebaseio.com',
  projectId: 'avis-website-dac6e',
  storageBucket: 'avis-website-dac6e.appspot.com',
  messagingSenderId: '115042660818',
};
firebase.initializeApp(config);

render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
