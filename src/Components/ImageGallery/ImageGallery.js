import React, { useState, useEffect } from 'react';
import './ImageGallery.css';
import ImageGalleryItem from 'Components/ImageGalleryItem/';
import Button from 'Components/Button/';
import Modal from 'Components/Modal/Modal';
import Loader from 'Components/Loader/Loader';
import { toast } from 'react-toastify';
import galleryFetch from 'Components/api/fetch';
import propTypes from 'prop-types';

const initialState = { modal: {}, status: 'empty', error: '' };

const ImageGallery = ({ request }) => {
  const [gallery, setGallery] = useState([]);
  const [modal, setModal] = useState({ status: false });
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (request === '') {
      return;
    }

    initialState.status = 'loading';
    setPage(1);
    setTimeout(() => {
      galleryFetch(request, page)
        .then(response => {
          setGallery(response.hits);
        })
        .catch(error => (initialState.error = error))
        .finally((initialState.status = 'recieve'));
    }, 1000);
  }, [request]);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    galleryFetch(request, page).then(response => {
      setGallery(prevState => [...prevState, ...response.hits]);
    });
  }, [page]);

  useEffect(() => {
    if (modal) {
      window.addEventListener('click', galleryPageKeyboardClose);
    }

    return () => {
      window.removeEventListener('click', galleryPageKeyboardClose);
    };
  }, [modal]);

  // load more page logic
  const onLoadMoreClick = num => {
    setPage(prevState => prevState + num);
  };

  //  modal logic
  const galleryPageKeyboardClose = e => {
    if (e.target.tagName !== 'IMG') {
      toggleModal();
    }
  };

  const onImageModalOpen = ({ target }) => {
    const {
      alt,
      dataset: { img },
    } = target;
    initialState.modal = { alt, img };
    toggleModal();
  };

  const toggleModal = () => setModal(!modal);

  // markup

  if (initialState.error !== '') {
    toast.warn(initialState.error);
    initialState.error = '';
  }

  if (initialState.status === 'recieve') {
    return (
      <>
        <ul className="ImageGallery" onClick={onImageModalOpen}>
          {<ImageGalleryItem data={gallery} />}
        </ul>
        <Button onLoadMoreClick={onLoadMoreClick} />
        {modal && (
          <Modal closeModal={toggleModal}>
            <img src={initialState.modal.img} alt={initialState.modal.alt} />
          </Modal>
        )}
      </>
    );
  }

  if (initialState.status === 'loading') {
    return (
      <div className="ImageGallery__loader">
        <Loader />
      </div>
    );
  }
};

ImageGallery.propTypes = {
  gallery: propTypes.array,
  modalData: propTypes.oneOfType([propTypes.string, propTypes.number]),
};

export default ImageGallery;
