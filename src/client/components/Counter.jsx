import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../actions';

class Counter extends Component {
  render() {
    return (
      <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
