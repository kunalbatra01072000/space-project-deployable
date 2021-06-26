import React, { Fragment, useState, useEffect } from 'react';
import Eventcard from './Eventcard';
import Spinner from '../Layout/Spinner';
import axios from 'axios';
import earthquakeImg from './img/earthquake.png';
import volcano from './img/volcano.png';
import fire from './img/fire.png';
import flood from './img/flood.png';
import storm from './img/lightning-bolt.png';
import Map2 from '../Map/Map2';

const Naturaleventfinder = () => {
  const [events, setevents] = useState([]);
  const [eventload, seteventload] = useState(false);
  const [logo, setlogo] = useState('');
  const [eventName, seteventName] = useState('wildfires');
  const [showMap, setshowMap] = useState(false);

  const logodecider = (ename) => {
    switch (ename) {
      case 'volcanoes':
        return volcano;
      case 'wildfires':
        return fire;
      case 'earthquakes':
        return earthquakeImg;
      case 'severeStorms':
        return storm;
      case 'floods':
        return flood;
      default:
        return '';
    }
  };

  const eventfinder = async (ename = 'wildfires') => {
    seteventload(true);
    seteventName(ename);

    try {
      const res = await axios.get(
        `https://eonet.sci.gsfc.nasa.gov/api/v3/categories/${ename}`
      );

      const enames = res.data.events
        .filter(
          (info) =>
            !isNaN(info.geometry[0].coordinates[0]) &&
            !isNaN(info.geometry[0].coordinates[1])
        )
        .map((info) => {
          return {
            title: info.title,
            category: info.categories[0].title,
            id: info.id,
            date: new Date(info.geometry[0].date).toDateString(),
            magnunit: info.geometry[0].magnitudeUnit,
            magnval: info.geometry[0].magnitudeValue,
            closed: info.closed,
            lat: info.geometry[0].coordinates[1],
            lng: info.geometry[0].coordinates[0],
          };
        });
        console.log(enames)
      setevents(enames);

      setlogo(logodecider(ename));
      seteventload(false);
    } catch (err) {
      setevents([]);
      seteventload(false);
      console.log(err);
    }
  };

  useEffect(() => {
    eventfinder();
    // eslint-disable-next-line
  }, []);

  const onClick = (e) => {
    setshowMap((show) => !show);
  };

  const eventBtns = (
    <div className='event-selector'>
      <button
        className='event-btn btn btn-dark'
        onClick={(e) => eventfinder(e.target.name)}
        name='wildfires'
      >
        Wildfires
      </button>
      <button
        className='event-btn btn btn-dark'
        name='volcanoes'
        onClick={(e) => eventfinder(e.target.name)}
      >
        Volcanoes
      </button>
      <button
        className='event-btn btn btn-dark'
        name='severeStorms'
        onClick={(e) => eventfinder(e.target.name)}
      >
        Storms
      </button>
      <button
        className='event-btn  btn btn-dark'
        name='earthquakes'
        onClick={(e) => eventfinder(e.target.name)}
      >
        Earthquakes
      </button>

      <button
        className='event-btn btn btn-dark'
        name='floods'
        onClick={(e) => eventfinder(e.target.name)}
      >
        Floods
      </button>
      <button
        className='event-btn btn btn-dark'
        name='dustHaze'
        onClick={(e) => eventfinder(e.target.name)}
      >
        Dust Haze
      </button>
    </div>
  );

  return (
    <Fragment>
      {showMap ? (
        <Fragment>
          <button
            className='btn btn-block btn-light my-1'
            onClick={(e) => onClick(e)}
          >
            {' '}
            Go back
          </button>

          <Map2 eventName={eventName} logo={logo} eventData={events} />
        </Fragment>
      ) : (
        <Fragment>
          {eventBtns}
          {eventload ? (
            <Spinner />
          ) : (
            <Fragment>
              {events.length > 0 && (
                <button
                  className='btn btn-block btn-success my-3'
                  onClick={(e) => onClick(e)}
                >
                  Show on Map
                </button>
              )}

              {events.length === 0 && (
                <button className='btn btn-block btn-light my-3' disabled>
                  No such events found!
                </button>
              )}

              <div className='Events-block'>
                {events.map((event) => (
                  <Eventcard key={event.id} event={event} logo={logo} />
                ))}
              </div>
            </Fragment>
          )}{' '}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Naturaleventfinder;
