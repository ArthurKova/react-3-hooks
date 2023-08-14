import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { toast } from 'react-toastify';
import propTypes from 'prop-types';
import './Searchbar.css';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const userRequest = e => {
    setValue(e.target.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();

    if (value.trim() === '') {
      toast('Enter your request!');
      return;
    }
    onSubmit(value);
    setValue('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmitForm}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
        <DebounceInput
          className="SearchForm-input"
          debounceTimeout={100}
          type="text"
          autoComplete="off"
          autoFocus
          name="request"
          placeholder="Search images and photos"
          value={value}
          onChange={userRequest}
        />
        ;
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: propTypes.func,
};

export default Searchbar;
