import React, { useState } from "react";
import Song from "./Song";

const SongCollection = props => {
  // let minId = props.songs.map(song => song.id)[0]


  const setSongNameIDClosure = e => {
    let targetID = Number(e.currentTarget.id);
    props.setSongNameID(targetID);
  };

  let mappedSongs = props.songs.map(song => {
    let selected;
    if (props.songNameID === song.id ) {
      selected = "selected";
    }

    return (
      <Song
        key={song.id}
        id={song.id}
        songs={song.name}
        artist={song.artist}
        handleClick={setSongNameIDClosure}
        classNamer={selected}
      />
    );
  });

  return (
    <div className="columns small-6">
      <h4>Songlist</h4>
      {mappedSongs}
    </div>
  );
};

export default SongCollection;
