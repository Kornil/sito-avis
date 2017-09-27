import React, { Component } from 'react';
import ErrorMessages from './ErrorMessages';

class FormInput extends Component {

  constructor(props) {
    super(props);
    this.shouldDisplayError = this.shouldDisplayError.bind(this);
  }

  shouldDisplayError() {
    // determine whether field should display error message
    return this.props.showError && this.props.errorText &&
(this.props.touched || this.props.submit);
  }

  render() {
    return (
      <div className="form__field-group">
        <label className="sr-only" htmlFor={this.props.name}>{this.props.placeholder}</label>
        <input
          className={this.shouldDisplayError() ? 'form__input form__input--error' : 'form__input'}
          type={this.props.type || 'text'}
          placeholder={this.props.placeholder}
          value={this.props.text}
          onChange={this.props.handleChange}
          onBlur={this.props.handleBlur}
          onFocus={this.props.handleFocus}
          name={this.props.name}
          id={this.props.name}
        />
        <ErrorMessages display={this.shouldDisplayError()}>
          <div className="form__error-wrap">
            <span className="form__error-content">{this.props.errorText}</span>
          </div>
        </ErrorMessages>
      </div>
    );
  }
}

export default FormInput;
