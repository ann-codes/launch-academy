import React, { useState, useEffect } from "react";

import CerealInformation from "./CerealInformation";

const CerealShowContainer = props => {
  const [cereal, setCereal] = useState({});

  useEffect(() => {
    let cerealId = props.match.params.id;

    fetch(`/api/v1/cereals/${cerealId}`)
      .then(response => response.json())
      .then(fetchedCereal => {
        setCereal(fetchedCereal);
      });
  }, []);

  console.log(cereal)

  return <CerealInformation cereal={cereal} />;
};

export default CerealShowContainer;
