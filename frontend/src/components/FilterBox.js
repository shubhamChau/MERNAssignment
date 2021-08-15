import React from "react";
import MyFilter from "./MyFilter.js";

const FilterBox = ({
  selectedYear,
  selectedSuccess,
  changeYear,
  changeLaunchStatus,
}) => {
  const years = [];

  for (var i = 2006; i <= 2020; i++) {
    years.push("" + i);
  }

  const success = ["true", "false"];

  return (
    <div id='filterBox'>
      <div>
        {" "}
        <h3> Filters </h3>{" "}
      </div>
      <p style={{ textAlign: "center", marginBottom: "1px" }}> Launch year </p>
      <hr width='50%' />
      <div className='filterGrid'>
        {years.map((year, i) => (
          <MyFilter
            key={i}
            name={year}
            change={changeYear}
            selected={year == selectedYear ? true : false}
          />
        ))}
      </div>
      <p style={{ textAlign: "center", marginBottom: "1px" }}>
        {" "}
        Successful Launch{" "}
      </p>
      <hr width='50%' />
      <div className='filterGrid'>
        {success.map((s, i) => (
          <MyFilter
            key={i}
            name={s}
            selected={s == selectedSuccess ? true : false}
            change={changeLaunchStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterBox;
