import React from "react";
import Card from "./Card.js";

const DisplayBox = ({ rockets }) => {
  console.log(rockets.length);
  return (
    <div id='displayBox'>
      {rockets.length == 0 ? <h2> No Items to show</h2> : null}
      {rockets.map((r, i) => (
        <Card rocket={r} key={i} />
      ))}
    </div>
  );
};

export default DisplayBox;
