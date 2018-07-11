import React from 'react';

export default ({ children }) => (
  <table>
    <thead>
      <tr>
        <th>Venue</th>
        <th>City</th>
        <th>Country</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {children}
    </tbody>
  </table>
);