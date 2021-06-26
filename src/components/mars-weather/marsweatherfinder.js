import React from "react";
import Spinner from "../Layout/Spinner";
import Weathercard from "./weather-card";

const Marsweatherfinder = ({ marsload, weekinfo }) => {
  if (marsload === true) {
    return <Spinner />;
  } else if (weekinfo.length) {
    return (
      <div className='mars-weather-cards'>
        {weekinfo.map((dayinfo) => (
          <Weathercard key={dayinfo.sol} dayinfo={dayinfo} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <h2>Sorry, no data is available for now.. Try later!</h2>
      </div>
    );
  }
};

export default Marsweatherfinder;
