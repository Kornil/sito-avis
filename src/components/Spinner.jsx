import React from 'react';

// displays while client is waiting for data from server

const Spinner = props => (
  <div className={`spinner ${props.cssClass}`}>
    <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
    <span className="sr-only">Loading...</span>
  </div>
);

export default Spinner;
