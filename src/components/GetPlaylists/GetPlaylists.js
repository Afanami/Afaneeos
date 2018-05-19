import React, { Component } from "react";
import UserPlaylistsList from "../UserPlaylistsList/UserPlaylistsList";
import "./GetPlaylists.css";

// Component to retrieve a list of user's playlists
class GetPlaylists extends Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Users Playlists</h2>
        <UserPlaylistsList
          playlists={this.props.userPlaylist}
          //   onAdd={this.props.onAdd}
          //   isRemoval={false}
        />
      </div>
    );
  }
}

export default GetPlaylists;
