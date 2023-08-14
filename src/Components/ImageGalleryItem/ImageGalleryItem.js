import React from 'react';
import propTypes from 'prop-types';
import './ImageGalleryItem.css';

const ImageGalleryItem = ({ data }) => {
  if (data) {
    return data.map(el => {
      const { id, largeImageURL, webformatURL, tags } = el;

      return (
        <li className="ImageGalleryItem" key={tags + id}>
          <img
            src={webformatURL}
            alt={tags}
            className="ImageGalleryItem-image"
            data-img={largeImageURL}
          />
        </li>
      );
    });
  }
};

ImageGalleryItem.propTypes = {
  data: propTypes.array,
};

export default ImageGalleryItem;
