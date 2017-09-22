import React from 'react';

const Spinner = props => (
  <div className={`spinner ${props.cssClass}`}>
    <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
    <span className="sr-only">Loading...</span>
  </div>
);

export default Spinner;
