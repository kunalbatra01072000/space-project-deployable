import React from 'react';
import { Link } from 'react-router-dom';

const Galleryitem = ({ imginfo }) => {
  return (
    <div className='card text-center'>
      <img
        src={imginfo.imgurl}
        alt='search_img'
        style={{ maxHeight: '300px' }}
      ></img>

      <strong>{imginfo.imgtitle}</strong>
      <div>
        <Link
          to={`/space-project/gallery/${imginfo.imgid}`}
          className='btn btn-dark my-1 btn-sm'
        >
          More Info
        </Link>
      </div>
    </div>
  );
};

export default Galleryitem;
