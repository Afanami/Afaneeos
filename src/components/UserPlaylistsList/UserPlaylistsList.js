import React, { Component } from "react";
import UserPlaylists from "../UserPlaylists/UserPlaylists";
import "./UserPlaylistsList.css";

class UserPlaylistsList extends Component {
  render() {
    return (
      <div className="UserPlaylistsList">
        {this.props.playlists &&
          this.props.playlists.map(userPlaylist => {
            return (
              <UserPlaylists
                key={userPlaylist.id}
                userPlaylist={userPlaylist}
                // onAdd={this.props.onAdd}
                // onRemove={this.props.onRemove}
                // isRemoval={this.props.isRemoval}
              />
            );
          })}
      </div>
    );
  }
}

export default UserPlaylistsList;
