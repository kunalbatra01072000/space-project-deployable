import React from "react";

const Eventcard = ({ event, logo }) => {
  return (
    <div className="card" style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
      <div className="event-info">
        <h3>{event.title}</h3>
        <p>Category: {event.category}</p>
        <p>
          Date Started: {event.date} <br />
        </p>
        {event.magnunit && (
          <p>
            {" "}
            Magnitude :{event.magnval} {event.magnunit}
          </p>
        )}
        {event.closed && <p> Ended on : {event.closed}</p>}
        {!event.closed && <p className="danger">Active</p>}
      </div>
      <div className="img-logo">
        <img
          src={logo}
          alt=""
          style={{ width: "70px", marginLeft: "auto", display: "block" }}
        />
      </div>
    </div>
  );
};

export default Eventcard;
