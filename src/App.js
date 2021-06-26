import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Imageofday from "./components/Layout/Imageofday";
import Weatherfinder from "./components/Weather/weatherfinder";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Marsweatherfinder from "./components/mars-weather/marsweatherfinder";
import Naturaleventfinder from "./components/Naturalevents/Naturaleventfinder";

import Nasaimg from "./components/Layout/Gallery/Nasaimg";
import Galleryhome from "./components/Layout/Gallery/Galleryhome";
import About from "./components/About/About";

function App() {
  const [loading, setloading] = useState(false);
  const [imgobj, setimgobj] = useState({});
  const [alerttext, setalerttext] = useState("");
  const [imggallery, setimggallery] = useState([]);
  const [defaultimg, setdefaultimg] = useState(true);

  const [nasaimginfo, setnasaimginfo] = useState({});
  const [nasaimginfoload, setnasaimginfoload] = useState(false);
  const [imgGalleryload, setimgGalleryload] = useState(false);
  useEffect(() => {
    getimageofday();

    getmarsweather();
    //eslint - disable - next - line;
  }, []);
  const [marsload, setmarsload] = useState(false);

  const [weekinfo, setweekinfo] = useState([]);

  const getmarsweather = async () => {
    setmarsload(true);

    try {
      const res = await axios.get(
        `https://api.nasa.gov/insight_weather/?api_key=xRA5gFNAPdDB04reIimmetg6Of4zJXoCm9ycjoVZ&feedtype=json&ver=1.0`
      );
      const { sol_keys } = res.data;

      const arr = sol_keys.map((sk) => {
        const { Season } = res.data[sk];
        const PRE = res.data[sk].PRE;
        const AT = res.data[sk].AT;
        let Pavg, Pmin, Pmax, Tavg, Tmin, Tmax;
        if (!PRE) {
          Pavg = Pmin = Pmax = undefined;
        } else {
          Pavg = PRE.av;
          Pmin = PRE.mn;
          Pmax = PRE.mx;
        }
        if (!AT) {
          Tavg = Tmin = Tmax = undefined;
        } else {
          Tavg = AT.av;
          Tmin = AT.mn;
          Tmax = AT.mx;
        }
        return {
          season: Season,
          sol: sk,
          Pavg,
          Pmin,
          Pmax,
          Tmin,
          Tavg,
          Tmax,
        };
      });
      setweekinfo(arr);

      setmarsload(false);
    } catch (err) {
      setweekinfo([]);
      setmarsload(false);
    }

    // setweekinfo(
    //   Object.entries(soldata).map(([sol, data]) => {
    //     return {
    //       sol: sol,
    //       maxtemp: ((data.AT.mx - 32) * (5 / 9)).toFixed(2),
    //       mintemp: ((data.AT.mn - 32) * (5 / 9)).toFixed(2),
    //       windspeed: data.HWS.av,
    //       earthdate: new Date(data.First_UTC).toDateString(),
    //       pressure: data.PRE.av,
    //     };
    //   })
    // );
  };
  //kimrT0XXGPjDplMQ0bUIxe4zDzbz9m5DgOVru0Zy
  const Setalert = (text) => {
    setalerttext(text);
    setTimeout(() => setalerttext(""), 3000);
  };
  const getimageofday = async () => {
    setloading(true);
    await axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=xRA5gFNAPdDB04reIimmetg6Of4zJXoCm9ycjoVZ`
      )
      .then((res) => {
        setimgobj({
          imgurl: res.data.url,
          imgexp: res.data.explanation,
          imgtitle: res.data.title,
          mediaType: res.data.media_type,
        });
      })
      .catch((err) => {
        setimgobj({
          imgexp:
            "This fantastic skyscape lies near the edge of NGC 2174 a star forming region about 6,400 light-years away in the nebula-rich constellation of Orion. It follows mountainous clouds of gas and dust carved by winds and radiation from the region's newborn stars, now found scattered in open star clusters embedded around the center of NGC 2174, off the top of the frame. Though star formation continues within these dusty cosmic clouds they will likely be dispersed by the energetic newborn stars within a few million years. Recorded at infrared wavelengths by the Hubble Space Telescope in 2014, the interstellar scene spans about 6 light-years. Scheduled for launch in 2021, the James Webb Space Telescope is optimized for exploring the Universe at infrared wavelengths.",
          imgtitle: `The Mountains of NGC 2174`,
          mediaType: "image",
          imgurl: `https://apod.nasa.gov/apod/image/2101/hs-2014-18_n2174rotate1024.jpg`,
        });
        console.log(err);
      });

    setloading(false);
  };

  const Searchnasaimg = async (text) => {
    setimgGalleryload(true);
    const res = await axios.get(
      `https://images-api.nasa.gov/search?q=${text}&media_type=image`
    );
    console.log(res.data.collection.items[0]);
    const final = res.data.collection.items.map((img) => {
      return {
        imgurl: img.links[0].href,
        imgtitle: img.data[0].title.substr(0, 100),
        imgid: img.data[0].nasa_id,
        mediaType: img.data[0].media_type,
      };
    });

    setimggallery(final);
    setdefaultimg(false);
    setimgGalleryload(false);
  };

  const getnasaimginfo = async (nasa_id) => {
    setnasaimginfoload(true);
    const res = await axios
      .get(`https://images-api.nasa.gov/search?nasa_id=${nasa_id}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        return {
          photographer: data.collection.items[0].data[0].photographer,
          title: data.collection.items[0].data[0].title,
          descr: data.collection.items[0].data[0].description,
          date: new Date(
            data.collection.items[0].data[0].date_created
          ).toDateString(),
          imgurl: data.collection.items[0].links[0].href,
        };
      });
    // console.log(res);
    setnasaimginfo(res);
    setnasaimginfoload(false);
  };

  return (
    <Router>
      <div className='App'>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route
                exact
                path='/space-project'
                render={(props) => (
                  <Fragment>
                    <Imageofday
                      getimageofday={getimageofday}
                      loading={loading}
                      imgobj={imgobj}
                    />

                    <Weatherfinder />
                  </Fragment>
                )}
              ></Route>
              <Route
                exact
                path='/space-project/mars-weather'
                render={(props) => (
                  <Marsweatherfinder
                    marsload={marsload}
                    weekinfo={weekinfo}
                    {...props}
                  />
                )}
              ></Route>
              <Route
                exact
                path='/space-project/natural-event'
                component={Naturaleventfinder}
              ></Route>
              <Route
                exact
                path='/space-project/gallery/:imgid'
                render={(props) => (
                  <Nasaimg
                    {...props}
                    getnasaimginfo={getnasaimginfo}
                    nasaimginfo={nasaimginfo}
                    nasaimginfoload={nasaimginfoload}
                  />
                )}
              ></Route>
              <Route
                exact
                path='/space-project/gallery'
                render={(props) => {
                  return (
                    <Galleryhome
                      Setalert={Setalert}
                      Searchnasaimg={Searchnasaimg}
                      alerttext={alerttext}
                      imggallery={imggallery}
                      defaultimg={defaultimg}
                      imgGalleryload={imgGalleryload}
                    />
                  );
                }}
              ></Route>
              <Route exact path='/space-project/about' component={About} />
            </Switch>
          </div>
        </Fragment>
      </div>
    </Router>
  );
}

export default App;
