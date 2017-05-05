import React, { Component } from 'react';
// import * as firebase from 'firebase';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: '',
    };
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

  handleSubmit(event) {
    event.preventDefault();
    console.log(`${this.state.email} ${this.state.pass}`);
  }

  render() {
    return (
      <div>
        <h2>Log In</h2>
        <form>
          <input onChange={e => this.handleEmailInput(e)} placeholder="Email" />
          <input onChange={e => this.handlePassInput(e)} placeholder="Password" />
          <button onClick={e => this.handleSubmit(e)} type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
