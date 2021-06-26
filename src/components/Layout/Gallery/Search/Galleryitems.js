import React from "react";
import Galleryitem from "./galleryitem";
import Alert from "./Alert";

const Galleryitems = ({ imggallery, defaultimg, Setalert }) => {
  if (imggallery.length === 0 && defaultimg === false) {
    return <Alert alerttext={`No search results...`} />;
  } else if (defaultimg === true) {
    return null;
  } else {
    return (
      <div style={Gallerystyle}>
        {imggallery.map((imginfo) => (
          <Galleryitem key={imginfo.imgid} imginfo={imginfo} />
        ))}
      </div>
    );
  }
};

const Gallerystyle = {
  display: "grid",
  gridTemplateColumns: "repeat( auto-fit, minmax(250px, 1fr) )",
  gridGap: "1rem",
};
export default Galleryitems;
