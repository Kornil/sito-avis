import React from 'react';

const CheckboxGroup = props => (
  <div>
    <div className="newBlog__subhead newBlog__subhead--sm">{props.title}</div>
    <div className="form__checkbox-group">
      {props.options.map(option => (
        <label key={option} className="form__checkbox-label" htmlFor={props.setName}>
          <input
            className="form__checkbox"
            name={props.setName}
            id={props.setName}
            onChange={props.controlFunc}
            value={option}
            checked={props.selectedOptions.indexOf(option) > -1}
            type={props.type}
          /> {option}
        </label>
        ))}
    </div>
  </div>
);

export default CheckboxGroup;
