import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from 'firebase';

import store from './store';
import App from './components/App';

const config = {
  apiKey: 'AIzaSyDdJNiz5dZrKqsDmIgi87Caf9QuiRSH4fc',
  authDomain: 'avis-29772.firebaseapp.com',
  databaseURL: 'https://avis-29772.firebaseio.com',
  projectId: 'avis-29772',
  storageBucket: 'avis-29772.appspot.com',
  messagingSenderId: '692861695276',
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
