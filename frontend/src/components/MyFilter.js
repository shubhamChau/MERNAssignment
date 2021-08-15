import { props } from "bluebird";
import React from "react";

const MyFilter = ({ name, selected, change }) => {
  return (
    <div
      className={selected ? "filterOption selected" : "filterOption"}
      onClick={() => {
        console.log("clicked" + name);
        change(name);
      }}
    >
      {name}
    </div>
  );
};

export default MyFilter;
