import React, { useState } from 'react';
import axios from 'axios';
import Weatherui from './weatherui';

const Weatherfinder = () => {
  const [Weat, setWeat] = useState({});
  const [loadweather, setloadweather] = useState(false);
  const [error, seterror] = useState('');
  const [showui, setshowui] = useState(false);
  const onClick = (e) => {
    if (showui === false) {
      getlocation();
      setshowui(true);
    } else {
      setWeat({});
      setshowui(false);
      seterror('');
      setloadweather(false);
    }
  };

  const getlocation = async () => {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(getweather, showerror);
    } else {
      seterror('Problem encountered');
    }
  };

  const getweather = async (pos) => {
    setloadweather(true);
    const lon = pos.coords.longitude;
    const lat = pos.coords.latitude;
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=66aec471ccd8d0cd8b17afc9e9c01be2`
    );
    console.log(res.data);
    setWeat({
      mintemp: res.data.main.temp_min,
      maxtemp: res.data.main.temp_max,
      humidity: res.data.main.humidity,
      pressure: res.data.main.pressure,
      icon: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
      weather: res.data.weather[0].main,
      temp: res.data.main.temp,
      windspeed: res.data.wind.speed,
      winddir: res.data.wind.deg,
      city: res.data.name,
    });

    setloadweather(false);
  };

  const showerror = (error) => {
    setloadweather(false);
    seterror(error.message);
    // console.log(error);
  };

  return (
    <div style={{ borderTop: '3px solid #333' }}>
      <button
        type='submit'
        className='btn btn-dark btn-block my-3'
        onClick={onClick}
      >
        {showui === true ? 'Clear' : 'Get the weather updates'}
      </button>
      {showui && (
        <Weatherui
          Weat={Weat}
          loadweather={loadweather}
          getlocation={getlocation}
          error={error}
        />
      )}
    </div>
  );
};

export default Weatherfinder;
