import React, { Component } from 'react';
import { connect } from 'react-redux';

import { increment, decrement } from '../actions';

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
        <button onClick={() => this.props.increment(1)}>Increment</button>
        <button onClick={() => this.props.decrement(1)}>Decrement</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  count: state.count,
});

const mapDispatchToProps = dispatch => ({
  increment: value => dispatch(increment(value)),
  decrement: value => dispatch(decrement(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
