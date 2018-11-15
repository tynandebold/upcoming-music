import './index.css';
import React from 'react';
import fetch from 'isomorphic-fetch';

import Form from './components/Form/';
import ArtistDetails from './components/ArtistDetails/';

class App extends React.Component {
  constructor() {
    super();

    const prevSearchTerm = window.localStorage.getItem('searchTerm');

    this.state = {
      artistEvents: null,
      artistInfo: null,
      foundArtist: null,
      numUpcomingShows: null,
      searchTerm: prevSearchTerm,
    }
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.searchTerm.length === 0) {
      return;
    }

    this.fetchResult();
  }

  async fetchResult() {
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

      window.localStorage.setItem('searchTerm', this.state.searchTerm);
    } else {
      this.setState({ foundArtist: false });
    }
  }

  componentDidMount() {
    if (this.state.searchTerm) {
      this.fetchResult();
    }
  }

  render() {
    let message;
    if (this.state.foundArtist === false) {
      message = <p>Sorry, we couldn't find anyone by that name. Please search for someone else.</p>;
    }

    return (
      <React.Fragment>
        <h1>Upcoming Music</h1>
        <Form
          submitForm={this.handleSubmit}
          searchTerm={this.state.searchTerm}
          updateInput={this.handleChange} />
        {this.state.foundArtist && <ArtistDetails data={this.state} />}
        {message}
      </React.Fragment>
    )
  }
}

export default App;
