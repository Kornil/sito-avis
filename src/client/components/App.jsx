import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as firebase from 'firebase';

import About from './About';
import ReduxCounter from './ReduxCounter';
import Firebase from './Firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Hello from React',
      speed: null,
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('react');
    const speedRef = rootRef.child('speed');
    speedRef.on('value', (snap) => {
      this.setState({
        speed: snap.val(),
      });
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/reduxcounter">ReduxCounter</Link></li>
          <li><Link to="/firebase">Firebase</Link></li>
        </ul>
        <hr />
        <Route path="/about" component={About} />
        <Route path="/reduxcounter" component={ReduxCounter} />
        <Route path="/firebase" component={Firebase} />
      </div>
    );
  }
}

export default App;
