import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

const Map2 = ({ logo, eventData }) => {
  const pointerIcon = new Icon({
    iconUrl: logo,
    iconSize: [25, 25],
  });

  const center = [42.3265, -122.8756];
  if (eventData.length > 0) {
    center[0] = eventData[0].lat;
    center[1] = eventData[0].lng;
  }

  const markers = eventData.map((ev) => (
    <Marker position={[ev.lat, ev.lng]} key={ev.id} icon={pointerIcon}>
      <Popup>
        <div className=''>
          <h2>{ev.title}</h2>
          <h4>{ev.category}</h4>
          <p>
            Date Started: {ev.date} <br />
          </p>
          {ev.magnunit && (
            <p>
              {' '}
              Magnitude :{ev.magnval} {ev.magnunit}
            </p>
          )}
          {ev.closed && <p> Ended on : {ev.closed}</p>}
          {!ev.closed && <p className='danger'>Active</p>}
        </div>
      </Popup>
    </Marker>
  ));

  return (
    <div className='map'>
      <MapContainer center={center} zoom={3} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {markers}
      </MapContainer>
    </div>
  );
};

export default Map2;
