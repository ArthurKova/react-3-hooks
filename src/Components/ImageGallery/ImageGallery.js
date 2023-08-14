import React, { useState, useEffect } from 'react';
import './ImageGallery.css';
import ImageGalleryItem from 'Components/ImageGalleryItem/';
import Button from 'Components/Button/';
import Modal from 'Components/Modal/Modal';
import Loader from 'Components/Loader/Loader';
import { toast } from 'react-toastify';
import galleryFetch from 'Components/api/fetch';
import propTypes from 'prop-types';

const initialState = {page:1,gallery:[]} //etc

const ImageGallery = ({ request }) => {
  const [gallery, setGallery] = useState([]);
  const [modalData, setModalData] = useState({});
  const [modalState, setModalState] = useState(false);
  const [status, setStatus] = useState('empty');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    if (request === '') {
      return;
    }
    setStatus('loading');
    setPage(1);
    setGallery([]);
    setTimeout(() => {
      galleryFetch(request, page)
        .then(response => {
          const gallery = response.hits;
          setGallery([...gallery]);
        })
        .catch(error => setError(error))
        .finally(setStatus('recieve'));
    }, 1000);
  }, [request]);

  useEffect(() => {
    if (page === 1) { return}
      galleryFetch(request, page).then(response => {
        const newGallery = response.hits;
        setGallery(prevState => [...prevState, ...newGallery]);
      });
    
  }, [page]);

  useEffect(() => {
    window.addEventListener('click', galleryPageKeyboardClose);

    return () => {
      window.removeEventListener('click', galleryPageKeyboardClose);
    };
  }, [modalState]);

  // load more page logic
  const onLoadMoreClick = num => {
    setPage(prevState => prevState + num);
  };

  //  modal logic
  const galleryPageKeyboardClose = e => {
    if (e.target.tagName !== 'IMG') {
      closeModal();
    }
  };

  const onImageModalOpen = e => {
    const alt = e.target.alt;
    const link = e.target.dataset.img;

    setModalData({ link, alt });
    openModal();
  };

  // const openModal = () => {
  //   setModalState(true);
  // };

  // const closeModal = () => {
  //   setModalState(false);
  // };
const modalToggle = () =>setModalState(!modalState)
  // markup

  if (error !== '') {
    toast.warn(error);
    setError({ error: '' });
  }

  if (status === 'recieve') {
    return (
      <>
        <ul className="ImageGallery" onClick={onImageModalOpen}>
          {<ImageGalleryItem data={gallery} />}
        </ul>
        <Button onLoadMoreClick={onLoadMoreClick} />
        {modalState && (
          <Modal closeModal={closeModal}>
            <img src={modalData.link} alt={modalData.alt} />
          </Modal>
        )}
      </>
    );
  }

  if (status === 'loading') {
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
