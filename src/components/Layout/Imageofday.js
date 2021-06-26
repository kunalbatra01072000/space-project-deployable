import React, { Fragment } from 'react';
import Spinner from './Spinner';
const Imageofday = ({ getimageofday, loading, imgobj }) => {
  if (loading) {
    return <Spinner />;
  } else if (imgobj.mediaType === 'video') {
    console.log(imgobj);
    return (
      <Fragment>
        <h1 className='text-center' style={{ marginBottom: '1rem' }}>
          Daily Feed...
        </h1>
        <iframe
          width='100%'
          height='400'
          src={imgobj.imgurl}
          title='Video of the day'
          style={{ margin: 'auto', display: 'block', maxWidth: '1000px' }}
        ></iframe>
        <h1 className='my-3 text-center'>{imgobj.imgtitle}</h1>
        <p style={{ marginBottom: '2rem' }}>{imgobj.imgexp}</p>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <h1 className='text-center' style={{ marginBottom: '1rem' }}>
          Daily Feed...
        </h1>
        <img src={imgobj.imgurl} alt='img-of-day' className='img-of-day'></img>
        <h1>{imgobj.imgtitle}</h1>
        <p style={{ marginBottom: '2rem' }}>{imgobj.imgexp}</p>
      </Fragment>
    );
  }
};

export default Imageofday;
