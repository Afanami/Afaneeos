import React, { Component } from "react";
import "./UserPlaylists.css";

class UserPlaylists extends Component {
  constructor(props) {
    super(props);

    this.renderPlaylists = this.renderPlaylists.bind(this);
  }

  renderPlaylists() {
    if (this.props.userPlaylists.length !== 0) {
      return (
        <a>
          <h3>{this.props.userPlaylists.name}</h3>
          <p>
            {this.props.userPlaylists.tracks}
            {this.props.userPlaylists.numOfTracks}
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
        <h2>Your Current Playlists</h2>
        <div className="Playlists-information">{this.renderPlaylists()}</div>
        <a className="Get-user-playlists" onClick={this.props.getPlaylists}>
          SHOW MY PLAYLISTS
        </a>
      </div>
    );
  }
}

export default UserPlaylists;
