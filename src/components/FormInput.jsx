import React, { Component } from 'react';
import ErrorMessages from './ErrorMessages';

class FormInput extends Component {

  constructor(props) {
    super(props);
    this.shouldDisplayError = this.shouldDisplayError.bind(this);
  }

  shouldDisplayError() {
    return this.props.showError && this.props.errorText &&
(this.props.touched || this.props.submit);
  }

  render() {
    return (
      <div className="form__field-group">
        <input
          className={this.shouldDisplayError() ? 'form__input form__input--error' : 'form__input'}
          type={this.props.type || 'text'}
          placeholder={this.props.placeholder}
          value={this.props.text}
          onChange={this.props.handleChange}
          onBlur={this.props.handleBlur}
          onFocus={this.props.handleFocus}
          name={this.props.name}
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
