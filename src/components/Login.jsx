import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: '',
      error: null,
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
    promise.catch((e) => {
      this.setState({
        error: e.message,
      });
    });
  }

  render() {
    const formError = this.state.error ? 'error' : 'hidden';
    return (
      <div className="login__container">
        <h2 className="newBlog__banner">Log In</h2>
        <form className="login__form">
          <input className="form__input login__input" onChange={e => this.handleEmailInput(e)} placeholder="Email" />
          <input className="form__input login__input" onChange={e => this.handlePassInput(e)} placeholder="Password" />
          <div className="login__button-wrap">
            <button className="newBlog__submit newBlog__button" onClick={e => this.handleLogin(e)} type="submit">Login</button>
            <button className="newBlog__button" onClick={() => firebase.auth().signOut()}>Logout</button>
          </div>
          <div className="form__input-group">
            <div className={formError}>
              {this.state.error}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Login);
