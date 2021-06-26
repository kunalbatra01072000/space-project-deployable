import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import axios from 'axios';
import logo from './ISSlogo.svg';
const About = () => {
  const [coord, setcoord] = useState({
    lat: 0,
    lan: 0,
  });
  const pointerIcon = new Icon({
    iconUrl: logo,
    iconSize: [50, 50],
  });
  const issfinder = async () => {
    const res = await axios.get(
      `https://api.wheretheiss.at/v1/satellites/25544`
    );
    setcoord({
      lat: res.data.latitude,
      lan: res.data.longitude,
    });
  };

  const marker = (
    <Marker position={[coord.lat, coord.lan]} icon={pointerIcon}>
      <Popup>
        <div className=''>
          <h2>International Space Station</h2>
        </div>
      </Popup>
    </Marker>
  );

  useEffect(() => {
    const isstimer = setInterval(issfinder, 4000);
    return () => clearInterval(isstimer);
  }, []);
  return (
    <div>
      <h2>Version 1.0.0</h2>
      <p> Web application built on NASA API and openweather API .</p>
      <br />
      <h3> Track International Space Station in the map below</h3>
      <div className='map'>
        <MapContainer
          center={[coord.lat, coord.lan]}
          zoom={3}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {marker}
        </MapContainer>
      </div>
    </div>
  );
};

export default About;
