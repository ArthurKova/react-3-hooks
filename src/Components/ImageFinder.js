import React, { useState } from 'react';
import './ImageFinder.css';
import Searchbar from './Searchbar/';
import ImageGallery from './ImageGallery/';
// import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import propTypes from 'prop-types';

const ImageFinder = () => {
  const [value, setValue] = useState('');

  const onSubmit = props => {
    setValue(props);
  };

  return (
    <div>
      <ToastContainer autoClose={2000} />
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery request={value} />
    </div>
  );
};

ImageFinder.propTypes = {
  props: propTypes.oneOfType([propTypes.string, propTypes.number]),
};

export default ImageFinder;
