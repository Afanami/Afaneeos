import React, { Component } from "react";
import "./UserPlaylists.css";

class UserPlaylists extends Component {
  constructor(props) {
    super(props);

    this.renderPlaylists = this.renderPlaylists.bind(this);
  }

  renderPlaylists() {
    if (this.props.userPlaylist.length !== 0) {
      return (
        <a>
          <h3>{this.props.userPlaylist.name}</h3>
          <p>
            {this.props.userPlaylist.tracks}
            {this.props.userPlaylist.numOfTracks}
          </p>
        </a>
      );
    } else {
      return;
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="UserPlaylists">
        <div className="Playlists-information">{this.renderPlaylists()}</div>
        {/* <a className="Get-user-playlists" onClick={this.props.getPlaylist}>
          SHOW MY PLAYLISTS
        </a> */}
      </div>
    );
  }
}

export default UserPlaylists;
