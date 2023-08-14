import propTypes from 'prop-types';

const KEY = '38777949-9fd3a86c95b2ce83099656e1b';

const galleryFetch = (currentRequest, page) => {
  return fetch(
    `https://pixabay.com/api/?key=${KEY}&q=${currentRequest}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Bad request ${currentRequest}`));
  });
};

galleryFetch.propTypes = {
  currentRequest: propTypes.oneOfType([propTypes.string, propTypes.number]),
  page: propTypes.number.isRequired,
};

export default galleryFetch;
