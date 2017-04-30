import React, { Component } from 'react';
import * as firebase from 'firebase';

class Firebase extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('react');
    const speedRef = rootRef.child('data');
    speedRef.on('value', (snap) => {
      this.setState({
        data: snap.val(),
      });
    });
  }

  render() {
    return (
      <h2>Data from Firebase: {this.state.data}</h2>
    );
  }
}

export default Firebase;
