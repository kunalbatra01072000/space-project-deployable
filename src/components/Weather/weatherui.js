import React, { Fragment } from "react";
import Spinner from "../Layout/Spinner";
import Stop from "./forbidden.png";
const Weatherui = ({ Weat, loadweather, error }) => {
  if (loadweather) {
    return <Spinner />;
  } else if (error !== "") {
    return (
      <Fragment>
        <div className="Error-Block">
          <img
            src={Stop}
            alt=""
            style={{
              width: "64px",
              margin: "auto",
              display: "block",
              marginBottom: "1rem",
            }}
          ></img>
          <h4 className="text-center">{error}</h4>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div
          className="container text-center card"
          style={{ marginBottom: "2rem" }}
        >
          <img src={Weat.icon} alt={Weat.weather} style={weatherimgstyle}></img>
          <h3>{Weat.city}</h3>
          <h4>Temperature: {Weat.temp} &#8451; </h4>
          <h4>Min Temperature: {Weat.mintemp} &#8451;</h4>
          <h4>Max Temperature: {Weat.maxtemp} &#8451;</h4>
          <h4>Pressure: {Weat.pressure} hPa</h4>
          <h4>Humidity: {Weat.humidity}%</h4>
          <h4>
            Wind : {Weat.windspeed} m/s {Weat.winddir} &#176;
          </h4>
        </div>
      </Fragment>
    );
  }
};
const weatherimgstyle = {
  width: "80px",
  height: "80px",
};
export default Weatherui;
