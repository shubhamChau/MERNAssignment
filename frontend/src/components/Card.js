import React from "react";

const Card = ({ rocket }) => {
  const image = (
    <img
      src={rocket.links.mission_patch}
      className='rocketImage'
      width='90%'
      alt='Image is loading...'
    />
  );

  let { flight_number, mission_name, launch_date_utc, launch_success } = rocket;

  let launch_date = launch_date_utc.substring(0, launch_date_utc.indexOf("T"));

  return (
    <div className='card'>
      <div className='imageHolder'>{image}</div>
      <div className='details'>
        <p style={{ fontWeight: "bold", color: "purple" }}>
          <span>
            {" "}
            {mission_name} #{flight_number}{" "}
          </span>
        </p>

        <p>
          <span> Launch Date: </span> <span> {launch_date} </span>{" "}
        </p>
        <p>
          <span> Launch Success: </span>{" "}
          <span> {launch_success.toString()} </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default Card;
