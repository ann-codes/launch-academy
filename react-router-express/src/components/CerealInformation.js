import React from "react";

const CerealInformation = props => {
  let data = props.cereal;

  return (
    <div>
      <h2 className="cereal-name">{data.name}</h2>
      <p>{data.description}</p>
      <h3>Sugar Content: {data.sugar_content}</h3>
      <h3>Deliciousness: {data.deliciousness}</h3>
    </div>
  );
};

export default CerealInformation;
