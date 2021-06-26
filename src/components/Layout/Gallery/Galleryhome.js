import React from "react";
import Search from "./Search/search";
import Alert from "./Search/Alert";
import Galleryitems from "./Search/Galleryitems";
import Spinner from "../Spinner";
const Galleryhome = ({
  Setalert,
  Searchnasaimg,
  alerttext,
  defaultimg,
  imggallery,
  imgGalleryload,
}) => {
  if (imgGalleryload) {
    return <Spinner />;
  } else {
    return (
      <div>
        <Search Setalert={Setalert} Searchnasaimg={Searchnasaimg} />
        <Alert alerttext={alerttext} />
        <Galleryitems
          imggallery={imggallery}
          defaultimg={defaultimg}
          Setalert={Setalert}
        />
      </div>
    );
  }
};

export default Galleryhome;
