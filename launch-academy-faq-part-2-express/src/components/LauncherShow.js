import React, { useState, useEffect } from "react";

const LauncherShow = props => {
  const [launcher, setLauncher] = useState({});

  useEffect(() => {
    let launcherId = props.match.params.id;
    fetch(`/api/v1/launchers/${launcherId}`)
      .then(response => response.json())
      .then(fetchedLauncer => {
        setLauncher(fetchedLauncer);
      });
  }, []);

  console.log(launcher);

  return (
    <div className="container">
      <h2>{launcher.name}</h2>
      <p>{launcher.bio}</p>
    </div>
  );
};

export default LauncherShow;
