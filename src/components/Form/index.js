import './style.css';
import React from 'react';

export default ({searchTerm, submitForm, updateInput}) => (
  <form onSubmit={submitForm}>
    <label>Search for an artist</label>
    <div className="input-wrapper">
      <input
        className="searchbox"
        onChange={updateInput}
        type="text"
        value={searchTerm} />
      <input className="submit-btn" type="submit" value="Submit" />
    </div>
  </form>
);
