import React, { useState, useEffect } from "react";
import { Link, Switch, Route } from "react-router-dom";
import LauncherShow from "./LauncherShow";

const LauncherList = props => {
  const [launchers, setLaunchers] = useState([]);

  const fetchLaunchers = () => {
    fetch("/api/v1/launchers", {
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        setLaunchers(body);
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  useEffect(fetchLaunchers, []);

  const launcherList = launchers.map(launcher => (
    <li key={launcher.id}>
      <Link to={`/launchers/${launcher.id}`}>{launcher.name}</Link>
    </li>
  ));

  return (
    <div className="container">
      <ul>{launcherList}</ul>
    </div>
  );
};

export default LauncherList;
