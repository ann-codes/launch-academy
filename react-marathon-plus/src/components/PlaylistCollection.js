import React from "react";
import Playlist from "./Playlist";

const PlaylistCollection = props => {
  const playlistSelector = e => {
    props.setSongNameID(props.minId);

    let targetID = Number(e.currentTarget.id);
    props.setPlaylistID(targetID);
  };

  let mappedPlaylist = props.playlists.map(list => {
    let selected;
    if (props.playlistID === list.id) {
      selected = "selected";
    }
    return (
      <Playlist
        key={list.id}
        id={list.id}
        list={list.name}
        setPlaylistID={props.setPlaylistID}
        handleClick={playlistSelector}
        classNamer={selected}
      />
    );
  });

  return (
    <div className="columns small-6">
      <h4>Playlist</h4>
      {mappedPlaylist}
    </div>
  );
};

export default PlaylistCollection;
