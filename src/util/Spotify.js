let accessToken = "";
const client_ID = "c87453a7ae5849bf895c40829c06315a";
const redirect_uri = "http://localhost:3000/";

let Spotify = {
  getAccessToken() {
    let tokenFound = window.location.href.match(/access_token=([^&]*)/);
    let expireFound = window.location.href.match(/expires_in=([^&]*)/);
    if (accessToken !== "") {
      return accessToken;
    } else if (tokenFound && expireFound) {
      accessToken = tokenFound[1];
      let expiresIn = expireFound[1];
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
    }
  },

  search(searchTerm) {
    accessToken = this.getAccessToken();
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.tracks) {
          return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }));
        } else {
          return [];
        }
      });
  },

  savePlaylist(playlistName, trackURIs) {
    accessToken = this.getAccessToken();
    let getHeaders = { Authorization: `Bearer ${accessToken}` };
    let postHeaders = {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json"
    };
    let user_id = "";
    let playlist_id = "";

    if (playlistName === "" || trackURIs.length === 0) {
      return;
    }
    fetch("https://api.spotify.com/v1/me", { headers: getHeaders })
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.id) {
          user_id = jsonResponse.id;
          return fetch(
            `https://api.spotify.com/v1/users/${user_id}/playlists`,
            {
              method: "POST",
              headers: postHeaders,
              body: JSON.stringify({ name: playlistName })
            }
          )
            .then(response => response.json())
            .then(jsonResponse => {
              if (jsonResponse.id) {
                playlist_id = jsonResponse.id;
                return fetch(
                  `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`,
                  {
                    method: "POST",
                    headers: postHeaders,
                    body: JSON.stringify({ uris: trackURIs })
                  }
                )
                  .then(response => response.json())
                  .then(jsonResponse => {
                    if (jsonResponse.snapshot_id) {
                      playlist_id = jsonResponse.snapshot_id;
                      return playlist_id;
                    }
                  });
              }
            });
        }
      });
  }
};

export default Spotify;
