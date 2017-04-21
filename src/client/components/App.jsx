import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      header: 'Hello from React',
    };
  }
  render() {
    return (
      <h1>{this.state.header}</h1>
    );
  }
}

export default App;
