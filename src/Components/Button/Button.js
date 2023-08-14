import React from 'react';
import propTypes from 'prop-types';

import './Button.css';

const Button = ({ onLoadMoreClick }) => {
  const onClick = () => {
    return onLoadMoreClick(1);
  };

  return (
    <div className="Button__box">
      <button type="button" className="Button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMoreClick: propTypes.func.isRequired,
};

export default Button;
