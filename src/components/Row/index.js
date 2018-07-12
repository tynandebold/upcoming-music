import React from 'react';
import moment from 'moment';

export default ({ datetime, venue }) => (
  <tr key={datetime}>
    <td>{venue.name}</td>
    <td>{venue.city}</td>
    <td>{venue.country}</td>
    <td>{moment(datetime).format("DD MMM YYYY")}</td>
  </tr>
);
