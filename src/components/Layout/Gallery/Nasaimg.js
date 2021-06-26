import React, { useEffect } from 'react';
import Spinner from '../Spinner';
const Nasaimg = ({ nasaimginfo, getnasaimginfo, match, nasaimginfoload }) => {
  useEffect(() => {
    getnasaimginfo(match.params.imgid);
    // eslint-disable-next-line
  }, []);

  if (nasaimginfoload) {
    return <Spinner />;
  } else {
    return (
      <div className='container card  gallery-item' style={{ padding: '1rem' }}>
        <img
          src={nasaimginfo.imgurl}
          style={{ width: '400px', height: '400px', margin: '10px 50px' }}
          alt='img..'
        ></img>
        <div style={{ width: '100%' }}>
          <h1>{nasaimginfo.title}</h1>
          {nasaimginfo.photographer && (
            <h3>Photographer: {nasaimginfo.photographer}</h3>
          )}
          <p>Date: {nasaimginfo.date}</p>
          <br />
          <p>{nasaimginfo.descr}</p>
        </div>
      </div>
    );
  }
};

export default Nasaimg;
