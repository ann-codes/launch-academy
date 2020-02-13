import React, { useState } from "react";
import PlaylistCollection from "./PlaylistCollection";
import SongCollection from "./SongCollection";

const App = props => {
  let playlists = props.data.playlists;

  // getter and setter for closure in the next playlist collection level
  const [playlistID, setPlaylistID] = useState(1);

  // using the playlistID upon when the playlist is selected,
  // filter out the particular playlist, then use map to just map the songs array
  // get back an array inside array so need to flatten
  let pickedSongListIDs = playlists
    .filter(list => list.id === playlistID)
    .map(ids => ids.songs)
    .flat();

  // now with the songs array of the selected playlist,
  // use it to filter via includes to just include the
  // list of songs in the selected playlist array
  let pickedSongList = props.data.songs.filter(song =>
    pickedSongListIDs.includes(song.id)
  );

  let minId = pickedSongList.map(song => song.id)[0];
  const [songNameID, setSongNameID] = useState(null);

  // feed the pickedSongList into the SongCollection prop (instead of the
  // typical props.data.songs) b/c we want the specific filtered list
  return (
    <div className="app row callout">
      <h2 className="title">React Music Player</h2>
      <PlaylistCollection
        playlists={playlists}
        setPlaylistID={setPlaylistID}
        playlistID={playlistID}
        setSongNameID={setSongNameID}
        minId={minId}
      />
      <SongCollection
        songs={pickedSongList}
        songNameID={songNameID}
        setSongNameID={setSongNameID}
      />
    </div>
  );
};

export default App;
