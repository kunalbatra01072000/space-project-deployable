import React from "react";

const Alert = ({ alerttext }) => {
  if (alerttext.length !== 0) {
    return <div className="alert">{alerttext}</div>;
  } else {
    return null;
  }
};

export default Alert;
