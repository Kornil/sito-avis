import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../actions';

const ReduxCounter = props => (
  <div>
    <p>Count: {props.count}</p>
    <button onClick={() => props.increment(1)}>Increment</button>
    <button onClick={() => props.decrement(1)}>Decrement</button>
  </div>
  );

const mapStateToProps = state => ({
  count: state.count,
});

const mapDispatchToProps = dispatch => ({
  increment: value => dispatch(increment(value)),
  decrement: value => dispatch(decrement(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxCounter);
