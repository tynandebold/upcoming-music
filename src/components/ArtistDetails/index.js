import './style.css';
import React from 'react';
import Row from '../Row/';
import Table from '../Table/';

export default ({ data }) => {
  /**
   * if the artist has upcoming shows, show a table of the shows,
   * otherwise, display a message to the user
   */
  let message, table;
  if (data.artistEvents && data.numUpcomingShows !== 0) {
    const rows = data.artistEvents.map(event => <Row key={event.id} {...event} />);
    table = <Table>{rows}</Table>;
  } else {
    message = <p>Sorry, this artist doesn&#39;t have any upcoming shows. Please check back later.</p>;
  }

  return (
    <div>
      <div className="artist-details">
        <img
          className="artist-image"
          src={data.artistInfo.thumb_url}
          alt={data.artistInfo.name}
          />
        <div className="artist-details__top-level">
          <h2>{data.artistInfo.name}</h2>
          {data.artistInfo.facebook_page_url &&
            <a
              href={data.artistInfo.facebook_page_url}
              target="_blank">
              {data.artistInfo.name}&#39;s Facebook page
            </a>
          }
          {message}
        </div>
      </div>
      <div className="table-wrapper">
        {table}
      </div>
    </div>
  )
}
