import React, { useState, useEffect, useContext } from "react";
import { GlobalContext, token } from "../App";
import axios from "axios";
import FilterBox from "../components/FilterBox.js";
import DisplayBox from "../components/DisplayBox";

const Home = () => {
  const [rockets, setRockets] = useState([]);
  const [query, setQuery] = useState({ year: "2006", skip: "0", limit: "15" });

  const context = useContext(GlobalContext);

  const changeYear = (year) => {
    setQuery({ ...query, year: "" + year, skip: "0", limit: "10" });
  };

  const changeLaunchStatus = (status) => {
    setQuery({ ...query, successful_launch: "" + status });
  };

  useEffect(() => {
    axios
      .get(
        context.baseURL +
          "/getRocketDetails?" +
          `launch_year=${query.year}` +
          (query.successful_launch != undefined
            ? `&successful_launch=${query.successful_launch}`
            : "") +
          `&skip=${query.skip}` +
          `&limit=${query.limit}`,
        {
          headers: {
            Authorisation: localStorage.getItem("Authorisation"),
          },
        }
      )
      .then((res) => setRockets(res.data))
      .catch((e) => alert(e.response.data.msg));
  }, [context.baseURL, query]);

  return (
    <div id='homeDisplay'>
      <FilterBox
        selectedYear={query.year + ""}
        selectedSuccess={
          query.successful_launch != undefined
            ? query.successful_launch + ""
            : null
        }
        changeYear={changeYear}
        changeLaunchStatus={changeLaunchStatus}
      />
      <DisplayBox rockets={rockets} />
    </div>
  );
};

export default Home;
