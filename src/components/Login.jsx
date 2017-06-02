import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

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

  handleLogin(event) {
    event.preventDefault();
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
          <button onClick={() => firebase.auth().signOut()}>Logout</button>
        </form>
        { this.props.auth && <Link to="/createblog">Create Blog</Link> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Login);
