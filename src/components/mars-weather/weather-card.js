import React from 'react';
import { Fragment } from 'react';

const Weathercard = ({ dayinfo }) => {
  return (
    <div className='card' style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
      <h4>Martian Day: {dayinfo.sol}</h4>
      {dayinfo.Tavg && (
        <Fragment>
          <p>Max Temprature: {dayinfo.Tmax} &#8457;</p>
          <p>Min Temprature: {dayinfo.Tmin} &#8457;</p>
          <p>Avg Temprature: {dayinfo.Tavg} &#8457;</p>
        </Fragment>
      )}
      {dayinfo.Pavg && (
        <Fragment>
          <p>Max Pressure: {dayinfo.Pmax} Pa</p>
          <p>Min Pressure: {dayinfo.Pmin} Pa</p>
          <p>Avg Pressure: {dayinfo.Pavg} Pa</p>
        </Fragment>
      )}

      <p>Season : {dayinfo.season}</p>
    </div>
  );
};

export default Weathercard;
