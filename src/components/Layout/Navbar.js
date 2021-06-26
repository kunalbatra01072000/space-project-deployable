import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import Menuicon from "./Menuicon.png";
const Navbar = () => {
  const [showdrop, setshowdrop] = useState(false);
  const onClick = (e) => {
    setshowdrop(!showdrop);
  };
  const hidenav = () => setshowdrop(false);
  const dropdown = (
    <div className='text-center dropdown '>
      <ul>
        <li>
          <Link to='/' onClick={hidenav}>
            Home
          </Link>
        </li>
        <li>
          {" "}
          <Link to='/mars-weather' onClick={hidenav}>
            Mars weather
          </Link>
        </li>
        <li>
          {" "}
          <Link to='/natural-event' onClick={hidenav}>
            Recent Disasters
          </Link>
        </li>
        <li>
          <Link to='/gallery' onClick={hidenav}>
            Gallery
          </Link>
        </li>
        <li>
          <Link to='/about' onClick={hidenav}>
            About
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <Fragment>
      <nav className='navbar bg-dark '>
        <img
          src={logo}
          alt=''
          style={{ width: "100px", marginRight: "1rem" }}
        />
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/mars-weather'>Mars weather</Link>
          </li>

          <li>
            <Link to='/natural-event'>Recent Disasters</Link>
          </li>
          <li>
            <Link to='/gallery'>Gallery</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </nav>
      <div className='menu-icon '>
        <div className='mobile-nav' style={{ position: "relative" }}>
          <img
            src={Menuicon}
            alt='Menu'
            className='menu-img-icon'
            onClick={onClick}
            style={{
              display: "block",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
          />
          <img
            src={logo}
            alt=''
            style={{
              width: "50px",
              display: "block",
              position: "absolute",
              top: "7%",
              left: "45%",
            }}
            className=''
          />
        </div>
        {showdrop && dropdown}
      </div>
    </Fragment>
  );
};

export default Navbar;
