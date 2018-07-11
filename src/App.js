import './App.css';
import React from 'react';
import fetch from 'isomorphic-fetch';

import Row from './components/Row/';
import Table from './components/Table/';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      artistEvents: null,
      artistInfo: null,
      foundArtist: null,
      numUpcomingShows: null,
      searchTerm: '',
    }
  }

  handleChange = (e) => {
    this.setState({searchTerm: e.target.value});
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.state.searchTerm.length === 0) {
      return;
    }

    const res = await fetch(`https://rest.bandsintown.com/artists/${this.state.searchTerm}?app_id=asdf`);
    const json = await res.json();

    if (Object.keys(json).length !== 0) {
      const eventRes = await fetch(`https://rest.bandsintown.com/artists/${this.state.searchTerm}/events/?app_id=asdf`);
      const eventJson = await eventRes.json();      

      this.setState({
        artistEvents: eventJson,
        artistInfo: json,
        foundArtist: true,
        numUpcomingShows: eventJson.length,
      });
    } else {
      this.setState({foundArtist: false});
    }
  }

  render() {
    let rows, table;
    if (this.state.artistEvents && this.state.numUpcomingShows !== 0) {
      rows = this.state.artistEvents.map(event => <Row key={event.id} {...event} />);
      table = <Table>{rows}</Table>;
    }    
    
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search for an artist:
            <input type="text" value={this.state.searchTerm} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.foundArtist &&
          <div>
            <div>{this.state.artistInfo.name}</div>
            <img src={this.state.artistInfo.thumb_url} alt={this.state.artistInfo.name} />
            {this.state.artistInfo.facebook_page_url &&
              <a href={this.state.artistInfo.facebook_page_url} target="_blank">Facebook page</a>
            }
            {table}
          </div>
        }
        {(this.state.foundArtist === false) &&
          <div>Sorry, we couldn't find anyone by that name. Please search for someone else.</div>
        }
      </div>
    );
  }
}

export default App;
