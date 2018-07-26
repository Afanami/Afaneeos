import React, { Component } from "react";
import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

// Component to handle playlist rendering
class Playlist extends Component {
  // Inherit methods and bind any methods to prevent infinite loop
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  // Check when user enters a value into the playlist name
  // Call method from parent component and update
  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
    event.preventDefault();
  }

  // Render playlist component
  render() {
    return (
      <div className="Playlist">
        <input
          value={this.props.playlistName}
          onChange={this.handleNameChange}
        />
        <TrackList
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        />
        <a className="Playlist-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </a>
        <a className="Reset-playlist" onClick={this.props.onReset}>
          RESET
        </a>
      </div>
    );
  }
}

export default Playlist;
