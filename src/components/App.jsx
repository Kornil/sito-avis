import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import About from './About';
import Welcome from './Welcome';
import ReduxCounter from './ReduxCounter';
import Firebase from './Firebase';
import Login from './Login';

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
        <h1 className="temptitle">{this.state.title}</h1>
        <ul className="tempnav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/welcome">Welcome</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/reduxcounter">ReduxCounter</Link></li>
          <li><Link to="/firebase">Firebase</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        <hr />
        <Route path="/welcome" component={Welcome} />
        <Route path="/about" component={About} />
        <Route path="/reduxcounter" component={ReduxCounter} />
        <Route path="/firebase" component={Firebase} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}

export default App;
