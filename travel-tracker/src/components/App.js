import React, { useState } from "react";
import Place from "./Place";

const App = props => {
  const places = props.data.places;
  const favPlace = props.data.favoritePlaceId;

  const [favMatch, setFavMatch] = useState(false);
  const [visited, setVisited] = useState([]);

  const visitClick = e => {
    let clickedID = Number(e.currentTarget.id);

    if (clickedID === favPlace) {
      setFavMatch(true);
    } else {
      setFavMatch(false);
    }

    if (visited.includes(clickedID)) {
      setVisited(prevVisited => [...prevVisited].filter(x => clickedID !== x));
    } else {
      setVisited(prevVisited => [...prevVisited, clickedID]);
    }
  };

  const mappedPlaces = places.map(place => {
    let classStrike;
    if (visited.includes(place.id)) {
      classStrike = "done";
    }

    return (
      <Place
        key={place.id}
        place={place.name}
        id={place.id}
        handleClick={visitClick}
        classNamer={classStrike}
      />
    );
  });

  let beautyDiv;
  if (favMatch) {
    beautyDiv = <div>What a beauty!</div>;
  }

  return (
    <div id="wishlist-div">
      <div className="row">
        <div className="small-12 small-centered columns text-center">
          <h3>Wanderlust Wishlist</h3>
          <ul>{mappedPlaces}</ul>
          {beautyDiv}
        </div>
      </div>
    </div>
  );
};

export default App;
