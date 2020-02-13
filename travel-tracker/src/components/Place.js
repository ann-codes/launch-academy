import React from "react";

const Place = props => {
  return (
    <li className={props.classNamer} onClick={props.handleClick} id={props.id}>
      {props.place}
    </li>
  );
};

export default Place;
