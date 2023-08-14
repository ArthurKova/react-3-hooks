import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', keyboardListener);

    return () => {
      window.removeEventListener('keydown', keyboardListener);
    };
  }, []);

  const keyboardListener = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  return createPortal(
    <div className="Overlay">
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]).isRequired,
};

export default Modal;
