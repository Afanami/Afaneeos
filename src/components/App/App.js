import React, { Component } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import store from "store";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.resetPlaylist = this.resetPlaylist.bind(this);
  }

  componentWillMount() {
    this.setState({
      playlistTracks: store.get("playlistTracks") || [],
      playlistName: store.get("playlistName") || "New Playlist"
    });
  }

  addTrack(track) {
    if (
      this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)
    ) {
      return;
    } else {
      this.state.playlistTracks.push(track);
      this.setState(
        {
          playlistTracks: this.state.playlistTracks
        },
        () => {
          store.set("playlistTracks", this.state.playlistTracks);
        }
      );
    }
  }

  removeTrack(track) {
    this.setState(
      {
        playlistTracks: this.state.playlistTracks.filter(
          removedTrack => removedTrack.id !== track.id
        )
      },
      () => {
        store.set("playlistTracks", this.state.playlistTracks);
      }
    );
  }

  updatePlaylistName(name) {
    this.setState(
      {
        playlistName: name
      },
      () => {
        store.set("playlistName", this.state.playlistName);
      }
    );
  }

  savePlaylist(playlistName, arrayTrackURIs) {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);

    Spotify.savePlaylist(this.state.playlistName, trackURIs);

    this.setState(
      {
        playlistName: "New Playlist",
        playlistTracks: []
      },
      () => {
        store.set("playlistName", "New Playlist");
        store.set("playlistTracks", []);
      }
    );
  }

  searchSpotify(searchTerm) {
    Spotify.search(searchTerm).then(results => {
      this.setState({
        searchResults: results
      });
    });
  }

  resetPlaylist() {
    this.setState({
      playlistTracks: []
    });
  }

  render() {
    return (
      <div>
        <h1>
          Afan<span className="highlight">eeos</span>
        </h1>
        <div className="App">
          <SearchBar searchSpotify={this.searchSpotify} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              onReset={this.resetPlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
