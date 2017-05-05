import React, { Component } from 'react';
import * as firebase from 'firebase';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: '',
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((fireBaseUser) => {
      if (fireBaseUser) {
        console.log(fireBaseUser);
      } else {
        console.log('not logged in');
      }
    });
  }

  handleEmailInput(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handlePassInput(event) {
    this.setState({
      pass: event.target.value,
    });
  }

  handleLogin(event) {
    event.preventDefault();
    console.log(`${this.state.email} ${this.state.pass}`);
    const email = this.state.email;
    const pass = this.state.pass;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  }

  render() {
    return (
      <div>
        <h2>Log In</h2>
        <form>
          <input onChange={e => this.handleEmailInput(e)} placeholder="Email" />
          <input onChange={e => this.handlePassInput(e)} placeholder="Password" />
          <button onClick={e => this.handleLogin(e)} type="submit">Login</button>
          <button onClick={() => firebase.auth().signOut()} type="submit">Logout</button>
        </form>
      </div>
    );
  }
}

export default Login;
