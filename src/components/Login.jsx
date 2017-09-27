import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import Spinner from './Spinner';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: '',
      error: null,
      submit: false,
    };
  }

  handleInput(e) {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState({
      newState,
    });
  }

  handleLogin(event) {
    event.preventDefault();
    const { email, pass } = this.state;
    const auth = firebase.auth();
    const newState = { ...this.state };
    newState.submit = true;
    this.setState({
      newState,
    }, () => {
      const promise = auth.signInWithEmailAndPassword(email, pass);
      promise.catch((e) => {
        this.setState({
          error: e.message,
        });
      });
    });

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.history.push('/dashboard');
      }
    });
  }

  handleLogout() {
    firebase.auth().signOut();
    this.props.history.push('/');
  }

  render() {
    const formError = this.state.error ? 'error' : 'hidden';
    return (
      <div>
        {this.state.submit ? <Spinner /> :
        <div className="login__container">
          <h2 className="newBlog__banner">Log In</h2>
          <form className="login__form">
            <input className="form__input login__input" type="email" name="email" onChange={e => this.handleInput(e)} placeholder="Email" />
            <input className="form__input login__input" type="password" name="pass" onChange={e => this.handleInput(e)} placeholder="Password" />
            <div className="login__button-wrap">
              <button className="newBlog__submit newBlog__button" onClick={e => this.handleLogin(e)} type="submit">Login</button>
              <button className="newBlog__button" onClick={() => this.handleLogout()}>Logout</button>
            </div>
            <div className="form__input-group">
              <div className={formError}>
                {this.state.error}
              </div>
            </div>
          </form>
        </div>
        }
        {this.state.logout &&
          <div className="container logout">
            <div className="logout__header">goodbye</div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Login);
