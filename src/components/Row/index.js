import React from 'react';

export default ({ datetime, venue }) => (
  <tr key={datetime}>
    <td>{venue.name}</td>
    <td>{venue.city}</td>
    <td>{venue.country}</td>
    <td>{datetime}</td>
  </tr>
);