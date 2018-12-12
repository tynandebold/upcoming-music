import React from 'react';
import moment from 'moment';

export default ({ datetime, url, venue }) => (
  <tr key={datetime}>
    <td><a href={url} rel="noopener noreferrer" target="_blank">{venue.name}</a></td>
    <td>{venue.city}</td>
    <td>{venue.country}</td>
    <td>{moment(datetime).format("DD MMM 'YY")}</td>
  </tr>
);
