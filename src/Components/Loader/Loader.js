import React, { Component } from 'react';
import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Oval
      height={200}
      width={200}
      color="#3f51b5"
      secondaryColor="white"
      strokeWidthSecondary={1}
      ariaLabel="loading-indicator"
      strokeWidth={5}
    />
  );
};

export default Loader;
