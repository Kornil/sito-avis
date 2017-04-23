import React, { Component } from 'react';
import { connect } from 'react-redux';

import { increment } from '../actions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Hello from React',
    };
  }
  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>Count: {this.props.count}</p>
        <button onClick={() => this.props.increment(1)}>Click me</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  count: state.count,
});

const mapDispatchToProps = dispatch => ({
  increment: value => dispatch(increment(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
