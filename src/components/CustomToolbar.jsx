import React from 'react';

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header">
      <option value="3" />
      <option value="4" />
      <option selected />
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-strike" />
    <button className="ql-blockquote" />
    <select className="ql-color">
      <option value="#007DC5" />
      <option value="#13a9ff" />
      <option value="#ED1C24" />
      <option value="#f36368" />
      <option value="#7a7a7a" />
      <option selected />
    </select>
    <button className="ql-list" value="ordered" />
    <button className="ql-list" value="bullet" />
    <button className="ql-indent" value="+1" />
    <button className="ql-indent" value="-1" />
    <button className="ql-link" />
    <button className="ql-image" />
    <button className="ql-clean" />
  </div>
);

export default CustomToolbar;
